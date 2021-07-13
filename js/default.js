function player(args) {
    var player = {
        design: {
            playername: $('.txtPlayerName'),
            playerfirstname: $('.txtPlayerFirstName'),
            playerlastname: $('.txtPlayerLastName'),
            playerbirth: $('.txtPlayerBirth'),
            playerage: $('.txtPlayerAge'),
            playernationality: $('.txtPlayerNationality'),
            playerheight: $('.txtPlayerHeight'),
            playerweight: $('.txtPlayerWeight'),
            playerfoot: $('select.ddlPlayerFoot'),
            playerposition: $('select.ddlPlayerPosition'),
            playervalue: $('.txtPlayerValue'),
            playerpassport: $('.txtPlayerPassport'),
            playerpassportval: $('.txtPlayerPassportVal'),
            playerclub: $('.ddlPlayerClub'),
            saveplayer: $('.btnSavePlayer'),
            ctrfiles: $('.ctrFiles'), //anexos
            ctruploader: $('.ctrUploader') //anexos
        },
        datasource: {
            base: undefined,
            id: ifUndefinedOrNull(args.data.player_id, 0),
            player: undefined,
            clubs: new Array(),
            attachments: new Array(), //anexos
            selectedattachments: new Array() //anexos
        },
        methods: {
            base: undefined,
            getplayer: function (after) {
                var me = this.base;

                //[ GET PLAYER ]
                if (ifUndefinedOrNull(me.datasource.id, 0) > 0) {
                    controls.ajax({
                        functionname: 'player',
                        data: {
                            player_id: ifUndefinedOrNull(me.datasource.id, 0)
                        }
                    }, function (data) {
                        //[ SET list_player LIST ]
                        me.datasource.player = data.player;
                        me.datasource.attachments = data.attachments; //anexos

                        if (!isUndefinedOrNull(after)) { after(); };
                    }, function () {
                        //[ ERROR ]
                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                    }, function () {
                        //[ ERROR ]
                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                    });
                } else {
                    me.datasource.player = args.player;

                    if (!isUndefinedOrNull(after)) { after(); };
                };
            },
            getclubs: function (after) {
                var me = this.base;

                controls.ajax({
                    functionname: 'clubs_list',
                }, function (data) {
                    //[ SET list_player LIST ]
                    me.datasource.clubs = data.clubs;

                    if (!isUndefinedOrNull(after)) { after(); };
                }, function () {
                    //[ ERROR ]
                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                }, function () {
                    //[ ERROR ]
                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                });
            },
            downloadattachment: function (attachment) {
                if (!isStringVoid(attachment.file)) {
                    const downloadLink = document.createElement("a");

                    with (downloadLink) {
                        href = attachment.file;
                        download = attachment.file_name;
                        click();
                    };
                };
            },
            deleteattachment: function (id, after) {
                var me = this.base;

                //[ DELETE ATTACHMENT ]
                if (ifUndefinedOrNull(me.datasource.id, 0) > 0) {
                    controls.message.bind({
                        type: 'question',
                        message: 'Pretende remover o documento selecionado?',
                        afteryes: function () {
                            controls.ajax({
                                functionname: 'delete_attachment',
                                data: {
                                    id: id
                                }
                            }, function (data) {
                                if (ifUndefinedOrNull(data.success, false)) {
                                    controls.message.bind({
                                        type: 'success',
                                        message: 'O documento foi removido com sucesso.',
                                        afterok: function () {
                                            if (!isUndefinedOrNull(after)) { after(data); };
                                        }
                                    });
                                } else {
                                    controls.message.bind({ type: 'error', message: 'Ocorreu um erro ao remover o anexo, por favor tente novamente.' });
                                };
                            }, function () {
                                controls.feedback.bind({ type: 'error', message: 'Ocorreu um erro ao remover o anexo, por favor tente novamente.' });
                            }, function () {
                                controls.feedback.bind({ type: 'error', message: 'Ocorreu um erro ao remover o anexo, por favor tente novamente.' });
                            });
                        }
                    });
                };
            },
        },
        load: function() {
            var me = this,
                ds = me.design;            

            me.methods.getclubs(function(){
                me.methods.getplayer(function(){
                    var player = me.datasource.player,
                        clubs = me.datasource.clubs;
                    
                    $.each(clubs.SingleFieldDistinct('country'), function (index, country) {
                        var group = $('<optgroup label="{0}"></optgroup>'.format(country)),
                            countryclubs = clubs.filter(function(c){ return (c.country == country); });

                        $.each(countryclubs, function (index, club) {
                            group.append('<option value="{0}">{1}</option>'.format(club.id, club.name_club));
                        });

                        ds.playerclub.append(group);
                    });

                    //anexos
                    ds.uploader = new FileDropzone({
                        target: ds.ctruploader.find('#box'),
                        clickable: true,
                        multiple: true,
                        forceReplace: false,
                        paramName: 'my-file',
                        accept: '.jpeg, .jpg, .gif, .bmp, .tiff, .png, .pdf, .docx, .doc, .xlsx, .xls, .csv',
                        onChange: function () {
                            var files = new Array(),
                                elem = this.element.find('.files');

                            elem.empty();

                            $.each(ifUndefinedOrNull(this.getFiles(), new Array()), function (index, file) {
                                var isnewfile = ifUndefinedOrNull(files, new Array()).filter(function (a) { return (a.name.toLowerCase() == file.name.toLowerCase()); }).length == 0,
                                    idvalidsize = (file.size <= 10485760); //[ MAX: 10 MB ]

                                if (isnewfile && idvalidsize) {
                                    files.push(file);
                                };
                            });

                            ds.uploader.clickable = false;

                            $.each(ifUndefinedOrNull(files, new Array()), function (index, item) {
                                var reader = new FileReader(),
                                    element = $('<div class="file-name"><div class="row"><div class="remove" style="padding-right: 10px;" data="{1}"><i class="grid-action fa fa-trash" style="color:#3282b8"></i></div>{0}</div></div>'.format(item.name, index));

                                reader.addEventListener('load', function (e) {
                                    var isnewfile = ifUndefinedOrNull(me.datasource.selectedattachments, new Array()).filter(function (a) { return (a.AttachmentName.toLowerCase() == item.name.toLowerCase()); }).length == 0;

                                    if (isnewfile) {
                                        var messageattachment = {
                                                Attachment: null,
                                                AttachmentName: null,
                                                ID: 0,
                                                PlayerID: 0
                                            },
                                            url;

                                        messageattachment.index = index;

                                        if (item.type.split('/')[0] === 'image') {
                                            var image = new Image();

                                            //[ RESIZE IMAGE ]
                                            image.onload = function () {
                                                var canvas = document.createElement("canvas"),
                                                    context = canvas.getContext("2d");

                                                canvas.width = image.width / 4;
                                                canvas.height = image.height / 4;
                                                context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);

                                                with (messageattachment) {
                                                    Attachment = canvas.toDataURL();
                                                    AttachmentName = item.name;
                                                };

                                                me.datasource.selectedattachments.push(messageattachment);
                                            };

                                            image.src = e.target.result;
                                        } else {
                                            with (messageattachment) {
                                                Attachment = reader.result;
                                                AttachmentName = item.name;
                                            };

                                            me.datasource.selectedattachments.push(messageattachment);
                                        };
                                    };
                                }, false);

                                if (!isUndefinedOrNull(item)) { reader.readAsDataURL(item); };

                                //[ REMOVE ]
                                element.find('.remove[data={0}]'.format(index)).on('click', function (e) {
                                    var id = $(this).attr('data');

                                    me.datasource.selectedattachments.removeField('index', id);
                                    $(this).parent().remove();

                                    if (me.datasource.selectedattachments.length == 0) {
                                        ds.uploader.clearAll();

                                        elem.html(controls.resources.attachment_upload_info);

                                        setTimeout(function () {
                                            ds.uploader.clickable = true;
                                        }, 1000);
                                    };

                                    e.preventDefault();
                                });

                                elem.append(element);
                            });

                            if (ifUndefinedOrNull(files, new Array()).length == 0) {
                                with (ds.uploader.element.find('.files')) {
                                    empty();
                                    addClass('dz-default dz-message');
                                };
                            } else {
                                with (ds.uploader.element.find('.files')) {
                                    removeClass('dz-default dz-message');
                                };
                            };
                        }
                    });

                    if (player.id > 0) {
                        ds.playername.val(player.name);
                        ds.playerfirstname.val(player.firstname);
                        ds.playerlastname.val(player.lastname);
                        ds.playerbirth.val(player.birth);
                        ds.playernationality.val(player.nationality);
                        ds.playerheight.val(player.height);
                        ds.playerweight.val(player.weight);
                        ds.playervalue.val(player.value);
                        ds.playerpassport.val(player.passport);
                        ds.playerpassportval.val(player.passportval);
                        ds.playerclub.val(player.club);
                        ds.playerclub.trigger('change');

                        $.each(ds.playerfoot.find('option'), function (index, element) {
                            if ($(element).html() == player.foot) {
                                $(element).attr('selected', 'selected');

                                ds.playerfoot.prev().find('li[data-value="{0}"]'.format(ds.playerfoot.val())).addClass('cs-selected');

                                return false;
                            }
                        });

                        ds.playerfoot.prev().find('li[data-value="{0}"]'.format(ds.playerfoot.val())).trigger('click');
                        ds.playerfoot.prev().prev().trigger('click');

                        $.each(ds.playerposition.find('option'), function (index, element) {
                            if ($(element).html() == player.position) {
                                $(element).attr('selected', 'selected');

                                ds.playerposition.prev().find('li[data-value="{0}"]'.format(ds.playerposition.val())).addClass('cs-selected');

                                return false;
                            }
                        });

                        ds.playerposition.prev().find('li[data-value="{0}"]'.format(ds.playerposition.val())).trigger('click');
                        ds.playerposition.prev().prev().trigger('click');

                        $('.titlePlayer').html('EDITAR JOGADOR');

                        //anexos
                        if (ifUndefinedOrNull(me.datasource.attachments, new Array()).length > 0) {
                            $.each(me.datasource.attachments, function (index, attachment) {
                                var filename = attachment.file_name,
                                    lastindex = filename.lastIndexOf('.'),
                                    html = $('<div class="file-name" data="{0}"><div class="row"><div class="actions" style="padding-right: 10px;"><div class="row"><div class="delete" style="padding-right: 10px;" data="{0}"><i class="grid-action fa fa-trash" style="color:#3282b8"> </i></div><div class="download" data="{0}"><i class="grid-action fa fa-download" style="color:#3282b8"></i></div></div></div>{1}</div></div>'.format(attachment.id, attachment.file_name, filename.substring(lastindex, filename.length)));
                                        
                                        
                                with (html) {
                                    //[ DELETE FILE ]
                                    find('.delete').on('click', function (e) {
                                        var element = $(this),
                                            id = parseInt($(this).attr('data')),
                                            parent = $(this).parents('.file-name');

                                        me.methods.deleteattachment(id, function () {
                                            //[ REMOVE ATTACHMENT FROM ARRAY ]
                                            me.datasource.attachments.removeField('id', id);

                                            //[ REMOVE ATTACHMENT HTML ]
                                            parent.remove();

                                            if (ifUndefinedOrNull(me.datasource.attachments, new Array()).length == 0){
                                                ds.ctrfiles.remove();
                                            }
                                        });
                                        e.preventDefault();
                                    });

                                    //[ DOWNLOAD FILE ]
                                    find('.download').on('click', function (e) {
                                        var id = parseInt($(this).attr('data')),
                                            selectedfile = me.datasource.attachments.filter(function (a) { return (a.id == id); })[0];

                                        me.methods.downloadattachment(selectedfile);
                                        e.preventDefault();
                                    });
                                };

                                ds.ctrfiles.find('.files').append(html);
                            });
                        } else {
                            ds.ctrfiles.remove();
                        };

                        //EDITAR JOGADOR
                        ds.saveplayer.on('click', function(){
                            var player = me.datasource.player;                   

                            with(player) {
                                age = ds.playerage.val();
                                birth = ds.playerbirth.val();
                                club = ds.playerclub.find('option:selected').val();
                                firstname = ds.playerfirstname.val();
                                foot = ds.playerfoot.prev().find('.cs-selected span').html();
                                height = ds.playerheight.val();
                                lastname = ds.playerlastname.val();
                                name = ds.playername.val();
                                nationality = ds.playernationality.val();
                                passport = ds.playerpassport.val();
                                passportval = ds.playerpassportval.val();
                                position = ds.playerposition.prev().find('.cs-selected span').html();
                                value = ds.playervalue.val();
                                weight = ds.playerweight.val();
                            };

                            //anexos
                            if (ifUndefinedOrNull(me.datasource.selectedattachments, new Array()).length > 0) {
                                $.each(me.datasource.selectedattachments, function (index, attachment) {
                                    attachment.PlayerID = player.id;
                                });
                            };
        
                            controls.ajax({
                                functionname: 'update_player',
                                data: {
                                    player: player,
                                    attachments: me.datasource.selectedattachments//anexos
                                }
                            }, function (data) {
                                if (ifUndefinedOrNull(data.success, false)) {
                                    controls.feedback.bind({ type: 'success', message: 'login com sucesso' });
                                    window.open('players_list.php', '_self');
                                } else {
                                    controls.message.bind({ type: 'error', message: 'O utilizador não existe.' });
                                };
                            }, function () {
                                controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                            }, function () {
                                controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                            });
                        });
                    }else{
                        ds.ctrfiles.remove(); //anexos

                        ds.saveplayer.on('click', function(){
                            var player = me.datasource.player;                   
        
                            with(player) {
                                age = ds.playerage.val();
                                birth = ds.playerbirth.val();
                                club = ds.playerclub.val();
                                firstname = ds.playerfirstname.val();
                                foot = ds.playerfoot.prev().find('.cs-selected span').html();
                                height = ds.playerheight.val();
                                lastname = ds.playerlastname.val();
                                name = ds.playername.val();
                                nationality = ds.playernationality.val();
                                passport = ds.playerpassport.val();
                                passportval = ds.playerpassportval.val();
                                position = ds.playerposition.prev().find('.cs-selected span').html();
                                value = (!isStringVoid(ds.playervalue.val())) ? ds.playervalue.val() : 0;
                                weight = ds.playerweight.val();
                            };
        
                            controls.ajax({
                                functionname: 'insert_player',
                                data: {
                                    player: player,
                                    attachments: me.datasource.selectedattachments//anexos
                                }
                            }, function (data) {
                                if (ifUndefinedOrNull(data.success, false)) {
                                    window.open('players_list.php', '_self');
                                    controls.feedback.bind({ type: 'success', message: 'Dados do jogador atualizados com sucesso' });
                                } else {
                                    controls.message.bind({ type: 'error', message: 'O jogador não foi criado com sucesso.' });
                                };
                            }, function () {
                                controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                            }, function () {
                                controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                            });
                        });
                    };
                });
            });
        },
        init: function() {
            var me = this;
            me.datasource.base = this;
            me.methods.base = this;
            me.load();
        }
    };
    player.init();
};

function coach(args) {
    var coach = {
        design: {
            coachname: $('.txtCoachName'),
            coachfirstname: $('.txtCoachFirstName'),
            coachlastname: $('.txtCoachLastName'),
            coachbirth: $('.txtCoachBirth'),
            coachage: $('.txtCoachAge'),
            coachnationality: $('.txtCoachNationality'),
            coachheight: $('.txtCoachHeight'),
            coachweight: $('.txtCoachWeight'),
            coachformation: $('select.ddlCoachFormation'),
            coachclub: $('.ddlCoachClub'),
            coachvalue: $('.txtCoachValue'),
            coachpassport: $('.txtCoachPassaport'),
            coachpassportval: $('.txtCoachPassaportVal'),
            savecoach: $('.btnSaveCoach'),
            ctrfiles: $('.ctrFiles'), //anexos
            ctruploader: $('.ctrUploader') //anexos
        },
        datasource: {
            base: undefined,
            id: ifUndefinedOrNull(args.data.coach_id, 0),
            coach: undefined,
            clubs: new Array(),
            attachments: new Array(), //anexos
            selectedattachments: new Array() //anexos
        },
        methods: {
            base: undefined,
            getcoach: function (after) {
                var me = this.base;

                //[ GET coach ]
                if (ifUndefinedOrNull(me.datasource.id, 0) > 0) {
                    controls.ajax({
                        functionname: 'coach',
                        data: {
                            coach_id: ifUndefinedOrNull(me.datasource.id, 0)
                        }
                    }, function (data) {
                        //[ SET list_coach LIST ]
                        me.datasource.coach = data.coach;
                        me.datasource.attachments = data.attachments; //anexos

                        if (!isUndefinedOrNull(after)) { after(); };
                    }, function () {
                        //[ ERROR ]
                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                    }, function () {
                        //[ ERROR ]
                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                    });
                } else {
                    me.datasource.coach = args.coach;
                    if (!isUndefinedOrNull(after)) { after(); };
                };
            },
            getclubs: function (after) {
                var me = this.base;

                controls.ajax({
                    functionname: 'clubs_list',
                }, function (data) {
                    //[ SET list_coach LIST ]
                    me.datasource.clubs = data.clubs;

                    if (!isUndefinedOrNull(after)) { after(); };
                }, function () {
                    //[ ERROR ]
                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                }, function () {
                    //[ ERROR ]
                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                });
            },
            downloadattachment: function (attachment) {
                if (!isStringVoid(attachment.file)) {
                    const downloadLink = document.createElement("a");

                    with (downloadLink) {
                        href = attachment.file;
                        download = attachment.file_name;
                        click();
                    };
                };
            },
            deleteattachment: function (id, after) {
                var me = this.base;

                //[ DELETE ATTACHMENT ]
                if (ifUndefinedOrNull(me.datasource.id, 0) > 0) {
                    controls.message.bind({
                        type: 'question',
                        message: 'Pretende remover o documento selecionado?',
                        afteryes: function () {
                            controls.ajax({
                                functionname: 'delete_attachment_coach',
                                data: {
                                    id: id
                                }
                            }, function (data) {
                                if (ifUndefinedOrNull(data.success, false)) {
                                    controls.message.bind({
                                        type: 'success',
                                        message: 'O documento foi removido com sucesso.',
                                        afterok: function () {
                                            if (!isUndefinedOrNull(after)) { after(data); };
                                        }
                                    });
                                } else {
                                    controls.message.bind({ type: 'error', message: 'Ocorreu um erro ao remover o anexo, por favor tente novamente.' });
                                };
                            }, function () {
                                controls.feedback.bind({ type: 'error', message: 'Ocorreu um erro ao remover o anexo, por favor tente novamente.' });
                            }, function () {
                                controls.feedback.bind({ type: 'error', message: 'Ocorreu um erro ao remover o anexo, por favor tente novamente.' });
                            });
                        }
                    });
                };
            },
        },
        load: function() {
            var me = this,
                ds = me.design;  
            me.methods.getclubs(function(){
                me.methods.getcoach(function(){
                    var coach = me.datasource.coach,
                    clubs = me.datasource.clubs;

                    $.each(clubs.SingleFieldDistinct('country'), function (index, country) {
                        var group = $('<optgroup label="{0}"></optgroup>'.format(country)),
                            countryclubs = clubs.filter(function(c){ return (c.country == country); });

                        $.each(countryclubs, function (index, club) {
                            group.append('<option value="{0}">{1}</option>'.format(club.id, club.name_club));
                        });

                        ds.coachclub.append(group);
                    });

                    //anexos
                    ds.uploader = new FileDropzone({
                        target: ds.ctruploader.find('#box'),
                        clickable: true,
                        multiple: true,
                        forceReplace: false,
                        paramName: 'my-file',
                        accept: '.jpeg, .jpg, .gif, .bmp, .tiff, .png, .pdf, .docx, .doc, .xlsx, .xls, .csv',
                        onChange: function () {
                            var files = new Array(),
                                elem = this.element.find('.files');

                            elem.empty();

                            $.each(ifUndefinedOrNull(this.getFiles(), new Array()), function (index, file) {
                                var isnewfile = ifUndefinedOrNull(files, new Array()).filter(function (a) { return (a.name.toLowerCase() == file.name.toLowerCase()); }).length == 0,
                                    idvalidsize = (file.size <= 10485760); //[ MAX: 10 MB ]

                                if (isnewfile && idvalidsize) {
                                    files.push(file);
                                };
                            });

                            ds.uploader.clickable = false;

                            $.each(ifUndefinedOrNull(files, new Array()), function (index, item) {
                                var reader = new FileReader(),
                                    element = $('<div class="file-name"><div class="row"><div class="remove" style="padding-right: 10px;" data="{1}"><i class="grid-action fa fa-trash" style="color:#3282b8"></i></div>{0}</div></div>'.format(item.name, index));

                                reader.addEventListener('load', function (e) {
                                    var isnewfile = ifUndefinedOrNull(me.datasource.selectedattachments, new Array()).filter(function (a) { return (a.AttachmentName.toLowerCase() == item.name.toLowerCase()); }).length == 0;

                                    if (isnewfile) {
                                        var messageattachment = {
                                                Attachment: null,
                                                AttachmentName: null,
                                                ID: 0,
                                                CoachID: 0
                                            },
                                            url;

                                        messageattachment.index = index;

                                        if (item.type.split('/')[0] === 'image') {
                                            var image = new Image();

                                            //[ RESIZE IMAGE ]
                                            image.onload = function () {
                                                var canvas = document.createElement("canvas"),
                                                    context = canvas.getContext("2d");

                                                canvas.width = image.width / 4;
                                                canvas.height = image.height / 4;
                                                context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);

                                                with (messageattachment) {
                                                    Attachment = canvas.toDataURL();
                                                    AttachmentName = item.name;
                                                };

                                                me.datasource.selectedattachments.push(messageattachment);
                                            };

                                            image.src = e.target.result;
                                        } else {
                                            with (messageattachment) {
                                                Attachment = reader.result;
                                                AttachmentName = item.name;
                                            };

                                            me.datasource.selectedattachments.push(messageattachment);
                                        };
                                    };
                                }, false);

                                if (!isUndefinedOrNull(item)) { reader.readAsDataURL(item); };

                                //[ REMOVE ]
                                element.find('.remove[data={0}]'.format(index)).on('click', function (e) {
                                    var id = $(this).attr('data');

                                    me.datasource.selectedattachments.removeField('index', id);
                                    $(this).parent().remove();

                                    if (me.datasource.selectedattachments.length == 0) {
                                        ds.uploader.clearAll();

                                        elem.html(controls.resources.attachment_upload_info);

                                        setTimeout(function () {
                                            ds.uploader.clickable = true;
                                        }, 1000);
                                    };

                                    e.preventDefault();
                                });

                                elem.append(element);
                            });

                            if (ifUndefinedOrNull(files, new Array()).length == 0) {
                                with (ds.uploader.element.find('.files')) {
                                    empty();
                                    addClass('dz-default dz-message');
                                };
                            } else {
                                with (ds.uploader.element.find('.files')) {
                                    removeClass('dz-default dz-message');
                                };
                            };
                        }
                    });

                    if (coach.id > 0) {
                        ds.coachname.val(coach.name);
                        ds.coachfirstname.val(coach.firstname);
                        ds.coachlastname.val(coach.lastname);
                        ds.coachbirth.val(coach.birth);
                        ds.coachnationality.val(coach.nationality);
                        ds.coachheight.val(coach.height);
                        ds.coachweight.val(coach.weight);
                        ds.coachvalue.val(coach.value);
                        ds.coachpassport.val(coach.passport);
                        ds.coachpassportval.val(coach.passportval);
                        ds.coachclub.val(coach.club);
                        ds.coachclub.trigger('change');
                        $('.titleCoach').html('EDITAR TREINADOR');

                        $.each(ds.coachformation.find('option'), function (index, element) {
                            if ($(element).html() == coach.formation) {
                                $(element).attr('selected', 'selected');

                                ds.coachformation.prev().find('li[data-value="{0}"]'.format(ds.coachformation.val())).addClass('cs-selected');

                                return false;
                            }
                        });

                        ds.coachformation.prev().find('li[data-value="{0}"]'.format(ds.coachformation.val())).trigger('click');
                        ds.coachformation.prev().prev().trigger('click');

                        //anexos
                        if (ifUndefinedOrNull(me.datasource.attachments, new Array()).length > 0) {
                            $.each(me.datasource.attachments, function (index, attachment) {
                                var filename = attachment.file_name,
                                    lastindex = filename.lastIndexOf('.'),
                                    html = $('<div class="file-name" data="{0}"><div class="row"><div class="actions" style="padding-right: 10px;"><div class="row"><div class="delete" style="padding-right: 10px;" data="{0}"><i class="grid-action fa fa-trash" style="color:#3282b8"> </i></div><div class="download" data="{0}"><i class="grid-action fa fa-download" style="color:#3282b8"></i></div></div></div>{1}</div></div>'.format(attachment.id, attachment.file_name, filename.substring(lastindex, filename.length)));
                                        
                                        
                                with (html) {
                                    //[ DELETE FILE ]
                                    find('.delete').on('click', function (e) {
                                        var element = $(this),
                                            id = parseInt($(this).attr('data')),
                                            parent = $(this).parents('.file-name');

                                        me.methods.deleteattachment(id, function () {
                                            //[ REMOVE ATTACHMENT FROM ARRAY ]
                                            me.datasource.attachments.removeField('id', id);

                                            //[ REMOVE ATTACHMENT HTML ]
                                            parent.remove();

                                            if (ifUndefinedOrNull(me.datasource.attachments, new Array()).length == 0){
                                                ds.ctrfiles.remove();
                                            }
                                        });
                                        e.preventDefault();
                                    });

                                    //[ DOWNLOAD FILE ]
                                    find('.download').on('click', function (e) {
                                        var id = parseInt($(this).attr('data')),
                                            selectedfile = me.datasource.attachments.filter(function (a) { return (a.id == id); })[0];

                                        me.methods.downloadattachment(selectedfile);
                                        e.preventDefault();
                                    });
                                };

                                ds.ctrfiles.find('.files').append(html);
                            });
                        } else {
                            ds.ctrfiles.remove();
                        };

                        ds.savecoach.on('click', function(){
                            var coach = me.datasource.coach;                   

                            with(coach) {
                                age = ds.coachage.val();
                                birth = ds.coachbirth.val();
                                club = ds.coachclub.find('option:selected').val();
                                firstname = ds.coachfirstname.val();
                                formation = ds.coachformation.prev().find('.cs-selected span').html();
                                height = ds.coachheight.val();
                                lastname = ds.coachlastname.val();
                                name = ds.coachname.val();
                                nationality = ds.coachnationality.val();
                                passport = ds.coachpassport.val();
                                passportval = ds.coachpassportval.val();
                                value = ds.coachvalue.val();
                                weight = ds.coachweight.val();
                            };

                            //anexos
                            if (ifUndefinedOrNull(me.datasource.selectedattachments, new Array()).length > 0) {
                                $.each(me.datasource.selectedattachments, function (index, attachment) {
                                    attachment.CoachID = coach.id;
                                });
                            };
            
                            controls.ajax({
                                functionname: 'update_coach',
                                data: {
                                    coach: coach,
                                    attachments: me.datasource.selectedattachments//anexos
                                }
                            }, function (data) {
                                if (ifUndefinedOrNull(data.success, false)) {
                                    controls.feedback.bind({ type: 'success', message: 'login com sucesso' });
                                    window.open('coaches_list.php', '_self');
                                } else {
                                    controls.message.bind({ type: 'error', message: 'O utilizador não existe.' });
                                };
                            }, function () {
                                controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                            }, function () {
                                controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                            });
                        });
                    } else {
                        ds.ctrfiles.remove(); //anexos

                        ds.savecoach.on('click', function(){
                            var coach = me.datasource.coach;                   
        
                            with(coach) {
                                age = ds.coachage.val();
                                birth = ds.coachbirth.val();
                                club = ds.coachclub.find('option:selected').val();
                                firstname = ds.coachfirstname.val();
                                formation = ds.coachformation.prev().find('.cs-selected span').html();
                                height = ds.coachheight.val();
                                lastname = ds.coachlastname.val();
                                name = ds.coachname.val();
                                nationality = ds.coachnationality.val();
                                passport = ds.coachpassport.val();
                                passportval = ds.coachpassportval.val();
                                value = ds.coachvalue.val();
                                weight = ds.coachweight.val();
                            };
            
                            controls.ajax({
                                functionname: 'insert_coach',
                                data: {
                                    coach: coach,
                                    attachments: me.datasource.selectedattachments//anexos
                                }
                            }, function (data) {
                                if (ifUndefinedOrNull(data.success, false)) {
                                    controls.feedback.bind({ type: 'success', message: 'Dados do treinador inseridos com sucesso' });
                                    window.open('coaches_list.php', '_self');
                                } else {
                                    controls.message.bind({ type: 'error', message: 'O treinador não foi criado com sucesso.' });
                                };
                            }, function () {
                                controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                            }, function () {
                                controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                            });
                        });

                    }
                });
            });
        },
        init: function() {
            var me = this;
            me.datasource.base = this;
            me.methods.base = this;
            me.load();
        }
    };
    coach.init();
};

function agent(args) {
    var agent = {
        design: {
            agentname: $('.txtAgentName'),
            agentclub: $('.ddlAgentClub'),
            agentcountry: $('.txtAgentCountry'),
            agentfirstname: $('.txtAgentFirstName'),
            agentlastname: $('.txtAgentLastName'),
            agentbirth: $('.txtAgentBirth'),
            agentnationality: $('.txtAgentNationality'),
            agentdocuments: $('.txtAgentDocuments'),
            agentdocumentsval: $('.txtAgentDocumentsVal'),
            agentcompany: $('.txtAgentCompany'),
            agentcontacts: $('.txtAgentContacts'),
            agentobs: $('.txtAgentObs'),
            saveagent: $('.btnSaveAgent'),
            ctrclubslist: $('.ctrClubsList'),
            btnaddclub: $('.btnAddClub'),
            btndeleteclub: $('.btnDeleteClub'),
            ctrfiles: $('.ctrFiles'), //anexos
            ctruploader: $('.ctrUploader') //anexos
        },
        datasource: {
            base: undefined,
            id: ifUndefinedOrNull(args.data.agent_id, 0),
            agent: undefined,
            clubs: new Array(),
            agent_clubs: new Array(),
            attachments: new Array(), //anexos
            selectedattachments: new Array() //anexos
        },
        methods: {
            base: undefined,
            getagent: function (after) {
                var me = this.base;

                //[ GET agent ]
                if (ifUndefinedOrNull(me.datasource.id, 0) > 0) {
                    controls.ajax({
                        functionname: 'agent',
                        data: {
                            agent_id: ifUndefinedOrNull(me.datasource.id, 0)
                        }
                    }, function (data) {
                        //[ SET list_agent LIST ]
                        me.datasource.agent = data.agent;
                        me.datasource.agent_clubs = data.agent_clubs;
                        me.datasource.attachments = data.attachments; //anexos

                        if (!isUndefinedOrNull(after)) { after(); };
                    }, function () {
                        //[ ERROR ]
                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                    }, function () {
                        //[ ERROR ]
                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                    });
                } else {
                    me.datasource.agent = args.agent;
                    if (!isUndefinedOrNull(after)) { after(); };
                };
            },
            getclubs: function (after) {
                var me = this.base;

                controls.ajax({
                    functionname: 'clubs_list',
                }, function (data) {
                    //[ SET list_player LIST ]
                    me.datasource.clubs = data.clubs;

                    if (!isUndefinedOrNull(after)) { after(); };
                }, function () {
                    //[ ERROR ]
                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                }, function () {
                    //[ ERROR ]
                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                });
            },
            downloadattachment: function (attachment) {
                if (!isStringVoid(attachment.file)) {
                    const downloadLink = document.createElement("a");

                    with (downloadLink) {
                        href = attachment.file;
                        download = attachment.file_name;
                        click();
                    };
                };
            },
            deleteattachment: function (id, after) {
                var me = this.base;

                //[ DELETE ATTACHMENT ]
                if (ifUndefinedOrNull(me.datasource.id, 0) > 0) {
                    controls.message.bind({
                        type: 'question',
                        message: 'Pretende remover o documento selecionado?',
                        afteryes: function () {
                            controls.ajax({
                                functionname: 'delete_attachment_agent',
                                data: {
                                    id: id
                                }
                            }, function (data) {
                                if (ifUndefinedOrNull(data.success, false)) {
                                    controls.message.bind({
                                        type: 'success',
                                        message: 'O documento foi removido com sucesso.',
                                        afterok: function () {
                                            if (!isUndefinedOrNull(after)) { after(data); };
                                        }
                                    });
                                } else {
                                    controls.message.bind({ type: 'error', message: 'Ocorreu um erro ao remover o anexo, por favor tente novamente.' });
                                };
                            }, function () {
                                controls.feedback.bind({ type: 'error', message: 'Ocorreu um erro ao remover o anexo, por favor tente novamente.' });
                            }, function () {
                                controls.feedback.bind({ type: 'error', message: 'Ocorreu um erro ao remover o anexo, por favor tente novamente.' });
                            });
                        }
                    });
                };
            },
        },
        load: function() {
            var me = this,
                ds = me.design;

            me.methods.getclubs(function(){
                me.methods.getagent(function(){
                    var agent = me.datasource.agent,
                        clubs = me.datasource.clubs;

                    ds.agentclub.append('<option value="0">Selecionar</option>');
                    $.each(clubs.SingleFieldDistinct('country'), function (index, country) {
                        var group = $('<optgroup label="{0}"></optgroup>'.format(country)),
                            countryclubs = clubs.filter(function(c){ return (c.country == country); });

                        

                        $.each(countryclubs, function (index, club) {
                            group.append('<option value="{0}">{1}</option>'.format(club.id, club.name_club));
                        });

                        ds.agentclub.append(group);
                    });

                    if (ds.ctrclubslist.find('.form-group').length == 1) {
                        ds.btndeleteclub.hide();
                    };

                    ds.btnaddclub.on('click', function(){
                        var element = $('<div class="form-group "><select class="full-width ddlAgentClub" style="z-index: auto;" style="z-index: auto;" data-init-plugin="select2"></select></div>');

                        element.find('select').append('<option value="0">Selecionar</option>');

                        $.each(clubs.SingleFieldDistinct('country'), function (index, country) {
                            var group = $('<optgroup label="{0}"></optgroup>'.format(country)),
                                countryclubs = clubs.filter(function(c){ return (c.country == country); });
    
                            $.each(countryclubs, function (index, club) {
                                group.append('<option value="{0}">{1}</option>'.format(club.id, club.name_club));
                            });
    
                            element.find('select').append(group);
                        });

                        element.find('select').select2();

                        ds.ctrclubslist.append(element);

                        if (ds.ctrclubslist.find('.form-group').length > 1) {
                            ds.btndeleteclub.show();
                        }
                    });
    
                    ds.btndeleteclub.on('click', function() {
                        ds.ctrclubslist.find('.form-group').last().remove();

                        if (ds.ctrclubslist.find('.form-group').length == 1) {
                            $(this).hide();
                        }
                    });

                    //anexos
                    ds.uploader = new FileDropzone({
                        target: ds.ctruploader.find('#box'),
                        clickable: true,
                        multiple: true,
                        forceReplace: false,
                        paramName: 'my-file',
                        accept: '.jpeg, .jpg, .gif, .bmp, .tiff, .png, .pdf, .docx, .doc, .xlsx, .xls, .csv',
                        onChange: function () {
                            var files = new Array(),
                                elem = this.element.find('.files');

                            elem.empty();

                            $.each(ifUndefinedOrNull(this.getFiles(), new Array()), function (index, file) {
                                var isnewfile = ifUndefinedOrNull(files, new Array()).filter(function (a) { return (a.name.toLowerCase() == file.name.toLowerCase()); }).length == 0,
                                    idvalidsize = (file.size <= 10485760); //[ MAX: 10 MB ]

                                if (isnewfile && idvalidsize) {
                                    files.push(file);
                                };
                            });

                            ds.uploader.clickable = false;

                            $.each(ifUndefinedOrNull(files, new Array()), function (index, item) {
                                var reader = new FileReader(),
                                    element = $('<div class="file-name"><div class="row"><div class="remove" style="padding-right: 10px;" data="{1}"><i class="grid-action fa fa-trash" style="color:#3282b8"></i></div>{0}</div></div>'.format(item.name, index));

                                reader.addEventListener('load', function (e) {
                                    var isnewfile = ifUndefinedOrNull(me.datasource.selectedattachments, new Array()).filter(function (a) { return (a.AttachmentName.toLowerCase() == item.name.toLowerCase()); }).length == 0;

                                    if (isnewfile) {
                                        var messageattachment = {
                                                Attachment: null,
                                                AttachmentName: null,
                                                ID: 0,
                                                AgentID: 0
                                            },
                                            url;

                                        messageattachment.index = index;

                                        if (item.type.split('/')[0] === 'image') {
                                            var image = new Image();

                                            //[ RESIZE IMAGE ]
                                            image.onload = function () {
                                                var canvas = document.createElement("canvas"),
                                                    context = canvas.getContext("2d");

                                                canvas.width = image.width / 4;
                                                canvas.height = image.height / 4;
                                                context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);

                                                with (messageattachment) {
                                                    Attachment = canvas.toDataURL();
                                                    AttachmentName = item.name;
                                                };

                                                me.datasource.selectedattachments.push(messageattachment);
                                            };

                                            image.src = e.target.result;
                                        } else {
                                            with (messageattachment) {
                                                Attachment = reader.result;
                                                AttachmentName = item.name;
                                            };

                                            me.datasource.selectedattachments.push(messageattachment);
                                        };
                                    };
                                }, false);

                                if (!isUndefinedOrNull(item)) { reader.readAsDataURL(item); };

                                //[ REMOVE ]
                                element.find('.remove[data={0}]'.format(index)).on('click', function (e) {
                                    var id = $(this).attr('data');

                                    me.datasource.selectedattachments.removeField('index', id);
                                    $(this).parent().remove();

                                    if (me.datasource.selectedattachments.length == 0) {
                                        ds.uploader.clearAll();

                                        elem.html(controls.resources.attachment_upload_info);

                                        setTimeout(function () {
                                            ds.uploader.clickable = true;
                                        }, 1000);
                                    };

                                    e.preventDefault();
                                });

                                elem.append(element);
                            });

                            if (ifUndefinedOrNull(files, new Array()).length == 0) {
                                with (ds.uploader.element.find('.files')) {
                                    empty();
                                    addClass('dz-default dz-message');
                                };
                            } else {
                                with (ds.uploader.element.find('.files')) {
                                    removeClass('dz-default dz-message');
                                };
                            };
                        }
                    });

                    if (agent.id > 0) {
                        ds.agentname.val(agent.name);
                        ds.agentclub.val(agent.club);
                        ds.agentclub.trigger('change');
                        ds.agentfirstname.val(agent.firstname);
                        ds.agentlastname.val(agent.lastname);
                        ds.agentbirth.val(agent.birth);
                        ds.agentnationality.val(agent.nationality);
                        ds.agentdocuments.val(agent.passport);
                        ds.agentdocumentsval.val(agent.passportval);
                        ds.agentcompany.val(agent.agentcompany);
                        ds.agentcontacts.val(agent.contacts);
                        ds.agentobs.val(agent.obs);
                        $('.titleAgent').html('EDITAR AGENTE');

                        if (ifUndefinedOrNull(me.datasource.agent_clubs, new Array()).length > 0) {
                            $.each(me.datasource.agent_clubs, function (index, club) {
                                if (index > 0) {
                                    var element = $('<div class="form-group "><select class="full-width ddlAgentClub" style="z-index: auto;" data-init-plugin="select2"></select></div>');
    
                                    element.find('select').append('<option value="0">Selecionar</option>');
    
                                    $.each(clubs.SingleFieldDistinct('country'), function (index, country) {
                                        var group = $('<optgroup label="{0}"></optgroup>'.format(country)),
                                            countryclubs = clubs.filter(function(c){ return (c.country == country); });
                
                                            

                                        $.each(countryclubs, function (index, club) {
                                            group.append('<option value="{0}">{1}</option>'.format(club.id, club.name_club));
                                        });
                
                                        element.find('select').append(group);
                                    });
    
                                    element.find('select').select2();

                                    element.find('select').val(club.id_club);
                                    element.find('select').trigger('change');
    
                                    ds.ctrclubslist.append(element);

                                    if (ds.ctrclubslist.find('.form-group').length > 1) {
                                        ds.btndeleteclub.show();
                                    }
                                }
                            });
                        };

                        //anexos
                        if (ifUndefinedOrNull(me.datasource.attachments, new Array()).length > 0) {
                            $.each(me.datasource.attachments, function (index, attachment) {
                                var filename = attachment.file_name,
                                    lastindex = filename.lastIndexOf('.'),
                                    html = $('<div class="file-name" data="{0}"><div class="row"><div class="actions" style="padding-right: 10px;"><div class="row"><div class="delete" style="padding-right: 10px;" data="{0}"><i class="grid-action fa fa-trash" style="color:#3282b8"> </i></div><div class="download" data="{0}"><i class="grid-action fa fa-download" style="color:#3282b8"></i></div></div></div>{1}</div></div>'.format(attachment.id, attachment.file_name, filename.substring(lastindex, filename.length)));
                                        
                                        
                                with (html) {
                                    //[ DELETE FILE ]
                                    find('.delete').on('click', function (e) {
                                        var element = $(this),
                                            id = parseInt($(this).attr('data')),
                                            parent = $(this).parents('.file-name');

                                        me.methods.deleteattachment(id, function () {
                                            //[ REMOVE ATTACHMENT FROM ARRAY ]
                                            me.datasource.attachments.removeField('id', id);

                                            //[ REMOVE ATTACHMENT HTML ]
                                            parent.remove();

                                            if (ifUndefinedOrNull(me.datasource.attachments, new Array()).length == 0){
                                                ds.ctrfiles.remove();
                                            }
                                        });
                                        e.preventDefault();
                                    });

                                    //[ DOWNLOAD FILE ]
                                    find('.download').on('click', function (e) {
                                        var id = parseInt($(this).attr('data')),
                                            selectedfile = me.datasource.attachments.filter(function (a) { return (a.id == id); })[0];

                                        me.methods.downloadattachment(selectedfile);
                                        e.preventDefault();
                                    });
                                };

                                ds.ctrfiles.find('.files').append(html);
                            });
                        } else {
                            ds.ctrfiles.remove();
                        };

                        //EDITAR AGENTE
                        ds.saveagent.on('click', function(){
                            var agent = me.datasource.agent,
                                clubs = new Array();                   

                            with(agent) {
                                name = ds.agentname.val();
                                club = ds.agentclub.find('option:selected').val();
                                firstname = ds.agentfirstname.val();
                                lastname = ds.agentlastname.val();
                                birth = ds.agentbirth.val();
                                nationality = ds.agentnationality.val();
                                passport = ds.agentdocuments.val();
                                passportval = ds.agentdocumentsval.val();
                                agentcompany = ds.agentcompany.val();
                                contacts = ds.agentcontacts.val();
                                obs = ds.agentobs.val();
                            };

                            $.each(ds.ctrclubslist.find('.ddlAgentClub'), function (index, element) {
                               var value = $(element).find('option:selected').val();
                               
                               if (parseInt(value) > 0) {
                                   clubs.push(parseInt(value));
                               }
                            });

                            //anexos
                            if (ifUndefinedOrNull(me.datasource.selectedattachments, new Array()).length > 0) {
                                $.each(me.datasource.selectedattachments, function (index, attachment) {
                                    attachment.AgentID = agent.id;
                                });
                            };

                            controls.ajax({
                                functionname: 'update_agent',
                                data: {
                                    agent: agent,
                                    clubs: clubs,
                                    attachments: me.datasource.selectedattachments//anexos
                                }
                            }, function (data) {
                                if (ifUndefinedOrNull(data.success, false)) {
                                    controls.feedback.bind({ type: 'success', message: 'login com sucesso' });
                                    window.open('agents_list.php', '_self');
                                } else {
                                    controls.message.bind({ type: 'error', message: 'O utilizador não existe.' });
                                };
                            }, function () {
                                controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                            }, function () {
                                controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                            });
                        });
                    } else {
                        ds.ctrfiles.remove(); //anexos

                        //NOVO AGENTE
                        ds.saveagent.on('click', function(){
                            var agent = me.datasource.agent;                   

                            with(agent) {
                                name = ds.agentname.val();
                                club = ds.agentclub.find('option:selected').val();
                                firstname = ds.agentfirstname.val();
                                lastname = ds.agentlastname.val();
                                birth = ds.agentbirth.val();
                                nationality = ds.agentnationality.val();
                                passport = ds.agentdocuments.val();
                                passportval = ds.agentdocumentsval.val();
                                agentcompany = ds.agentcompany.val();
                                contacts = ds.agentcontacts.val();
                                obs = ds.agentobs.val();
                            };

                            controls.ajax({
                                functionname: 'insert_agent',
                                data: {
                                    agent: agent,
                                    attachments: me.datasource.selectedattachments//anexos
                                }
                            }, function (data) {
                                if (ifUndefinedOrNull(data.success, false)) {
                                    controls.feedback.bind({ type: 'success', message: 'login com sucesso' });
                                    window.open('agents_list.php', '_self');
                                } else {
                                    controls.message.bind({ type: 'error', message: 'O utilizador não existe.' });
                                };
                            }, function () {
                                controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                            }, function () {
                                controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                            });
                        });
                    }
                });
            });
        },
        init: function() {
            var me = this;
            me.datasource.base = this;
            me.methods.base = this;
            me.load();
        }
    };
    agent.init();
};

function representation(args) {
    var representation = {
        design: {
            //DADOS DO JOGADOR
            representationplayer: $('select.ddlRepresentationPlayer'),
            representationcoach: $('select.ddlRepresentationCoach'),
            representationplayername: $('.txtPlayerName'),
            representationplayerfirstname: $('.txtPlayerFirstName'),
            representationplayerlastname: $('.txtPlayerLastName'),
            representationplayerbirth: $('.txtPlayerBirth'),
            representationplayernationality: $('.txtPlayerNationality'),
            representationplayerheight: $('.txtPlayerHeight'),
            representationplayerweight: $('.txtPlayerWeight'),
            representationplayerclub: $('.txtPlayerClub'),
            representationplayervalue: $('.txtPLayerValue'),
            representationplayerpassport: $('.txtPlayerPassport'),
            representationplayerpassportval: $('.txtPlayerPassportVal'),
            child: $('.ckChild'),

            //NOVO JOGADOR
            representationplayerclubnew: $('.txtPlayerClubNew'),
            representationplayernamenew: $('.txtPlayerNameNew'),
            representationplayerfirstnamenew: $('.txtPlayerFirstNameNew'),
            representationplayerlastnamenew: $('.txtPlayerLastNameNew'),
            representationplayerbirthnew: $('.txtPlayerBirthNew'),
            representationplayernationalitynew: $('.txtPlayerNationalityNew'),
            representationplayerheightnew: $('.txtPlayerHeightNew'),
            representationplayerweightnew: $('.txtPlayerWeightNew'),
            representationplayerpositionnew: $('select.ddlPlayerPositionNew'),
            representationplayerfootnew: $('select.ddlPlayerFootNew'),
            representationplayervaluenew: $('.txtPlayerValueNew'),
            representationplayerclubnew: $('.ddlPlayerClubNew'),
            representationplayerpassportnew: $('.txtPlayerPassportNew'),
            representationplayerpassportvalnew: $('.txtPlayerPassportValNew'),
            ctrfilesnew: $('.ctrFilesNew'), //anexos
            ctruploadernew: $('.ctrUploaderNew'), //anexos

            //EDITAR JOGADOR
            representationplayernameedit: $('.txtPlayerNameEdit'),
            representationplayerfirstnameedit: $('.txtPlayerFirstNameEdit'),
            representationplayerlastnameedit: $('.txtPlayerLastNameEdit'),
            representationplayerbirthedit: $('.txtPlayerBirthEdit'),
            representationplayernationalityedit: $('.txtPlayerNationalityEdit'),
            representationplayerheightedit: $('.txtPlayerHeightEdit'),
            representationplayerweightedit: $('.txtPlayerWeightEdit'),
            representationplayerpositionedit: $('select.ddlPlayerPositionEdit'),
            representationplayerfootedit: $('select.ddlPlayerFootEdit'),
            representationplayerclubedit: $('.ddlPlayerClubEdit'),
            representationplayervalueedit: $('.txtPlayerValueEdit'),
            representationplayerpassportedit: $('.txtPlayerPassportEdit'),
            representationplayerpassportvaledit: $('.txtPlayerPassportValEdit'),
            ctrfilesedit: $('.ctrFilesEdit'), //anexos
            ctruploaderedit: $('.ctrUploaderEdit'), //anexos

            //NOVO CONTRATO DE REPRESENTAÇÃO
            representationfather: $('.txtRepresentationFather'),
            representationmother: $('.txtRepresentationMother'),
            representationdatestart: $('.txtRepresentationDateStart'),
            representationdateend: $('.txtRepresentationDateEnd'),
            representationcommission: $('.txtRepresentationCommission'),
            ctrfiles: $('.ctrFiles'), //anexos
            ctruploader: $('.ctrUploader'), //anexos

            //BOTÕES
            saverepresentation: $('.btnSaveRepresentation'),
            saverepresentationcoach: $('.btnSaveRepresentationCoach'),
            saveeditplayer: $('.btnSavePlayerEdit'),
            savenewplayer: $('.btnSavePlayerNew'),
            addnewplayer: $('.addNewPlayer'),
            editplayer: $('.editPlayer')
        },
        datasource: {
            base: undefined,
            id: ifUndefinedOrNull(args.data.representation_id, 0),
            representation: undefined,
            clubs: new Array(),
            attachments: new Array(), //anexos
            selectedattachments: new Array() //anexos
        },
        methods: {
            base: undefined,
            getrepresentation: function (after) {
                var me = this.base;

                //[ GET representation ]
                if (ifUndefinedOrNull(me.datasource.id, 0) > 0) {
                    controls.ajax({
                        functionname: 'representation',
                        data: {
                            representation_id: ifUndefinedOrNull(me.datasource.id, 0)
                        }
                    }, function (data) {
                        //[ SET list_representation LIST ]
                        me.datasource.representation = data.representation;
                        me.datasource.attachments = data.attachments; //anexos

                        if (!isUndefinedOrNull(after)) { after(); };
                    }, function () {
                        //[ ERROR ]
                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                    }, function () {
                        //[ ERROR ]
                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                    });
                } else {
                    me.datasource.representation = args.representation;
                    if (!isUndefinedOrNull(after)) { after(); };
                };
            },
            getclubs: function (after) {
                var me = this.base;

                controls.ajax({
                    functionname: 'clubs_list',
                }, function (data) {
                    //[ SET list_player LIST ]
                    me.datasource.clubs = data.clubs;

                    if (!isUndefinedOrNull(after)) { after(); };
                }, function () {
                    //[ ERROR ]
                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                }, function () {
                    //[ ERROR ]
                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                });
            },
            getplayers: function (after) {
                var me = this.base;

                controls.ajax({
                    functionname: 'players',
                }, function (data) {
                    //[ SET list_player LIST ]
                    me.datasource.players = data.players;

                    if (!isUndefinedOrNull(after)) { after(); };
                }, function () {
                    //[ ERROR ]
                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                }, function () {
                    //[ ERROR ]
                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                });
            },
            getcoach: function (after) {
                var me = this.base;

                controls.ajax({
                    functionname: 'coaches',
                }, function (data) {
                    //[ SET list_player LIST ]
                    me.datasource.coaches = data.coaches;

                    if (!isUndefinedOrNull(after)) { after(); };
                }, function () {
                    //[ ERROR ]
                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                }, function () {
                    //[ ERROR ]
                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                });
            },
            downloadattachment: function (attachment) {
                if (!isStringVoid(attachment.file)) {
                    const downloadLink = document.createElement("a");

                    with (downloadLink) {
                        href = attachment.file;
                        download = attachment.file_name;
                        click();
                    };
                };
            },
            deleteattachment: function (id, after) {
                var me = this.base;

                //[ DELETE ATTACHMENT ]
                if (ifUndefinedOrNull(me.datasource.id, 0) > 0) {
                    controls.message.bind({
                        type: 'question',
                        message: 'Pretende remover o documento selecionado?',
                        afteryes: function () {
                            controls.ajax({
                                functionname: 'delete_attachment_representation',
                                data: {
                                    id: id
                                }
                            }, function (data) {
                                if (ifUndefinedOrNull(data.success, false)) {
                                    controls.message.bind({
                                        type: 'success',
                                        message: 'O documento foi removido com sucesso.',
                                        afterok: function () {
                                            if (!isUndefinedOrNull(after)) { after(data); };
                                        }
                                    });
                                } else {
                                    controls.message.bind({ type: 'error', message: 'Ocorreu um erro ao remover o anexo, por favor tente novamente.' });
                                };
                            }, function () {
                                controls.feedback.bind({ type: 'error', message: 'Ocorreu um erro ao remover o anexo, por favor tente novamente.' });
                            }, function () {
                                controls.feedback.bind({ type: 'error', message: 'Ocorreu um erro ao remover o anexo, por favor tente novamente.' });
                            });
                        }
                    });
                };
            },
            downloadattachmentplayer: function (attachment) {
                if (!isStringVoid(attachment.file)) {
                    const downloadLink = document.createElement("a");

                    with (downloadLink) {
                        href = attachment.file;
                        download = attachment.file_name;
                        click();
                    };
                };
            },
            deleteattachmentplayer: function (id, after) {
                var me = this.base;

                //[ DELETE ATTACHMENT ]
                if (ifUndefinedOrNull(me.datasource.id, 0) > 0) {
                    controls.message.bind({
                        type: 'question',
                        message: 'Pretende remover o documento selecionado?',
                        afteryes: function () {
                            controls.ajax({
                                functionname: 'delete_attachment',
                                data: {
                                    id: id
                                }
                            }, function (data) {
                                if (ifUndefinedOrNull(data.success, false)) {
                                    controls.message.bind({
                                        type: 'success',
                                        message: 'O documento foi removido com sucesso.',
                                        afterok: function () {
                                            if (!isUndefinedOrNull(after)) { after(data); };
                                        }
                                    });
                                } else {
                                    controls.message.bind({ type: 'error', message: 'Ocorreu um erro ao remover o anexo, por favor tente novamente.' });
                                };
                            }, function () {
                                controls.feedback.bind({ type: 'error', message: 'Ocorreu um erro ao remover o anexo, por favor tente novamente.' });
                            }, function () {
                                controls.feedback.bind({ type: 'error', message: 'Ocorreu um erro ao remover o anexo, por favor tente novamente.' });
                            });
                        }
                    });
                };
            },
            downloadattachmentplayeredit: function (attachment) {
                if (!isStringVoid(attachment.file)) {
                    const downloadLink = document.createElement("a");

                    with (downloadLink) {
                        href = attachment.file;
                        download = attachment.file_name;
                        click();
                    };
                };
            },
            deleteattachmentplayeredit: function (id, after) {
                var me = this.base;

                //[ DELETE ATTACHMENT ]
                if (ifUndefinedOrNull(me.datasource.id, 0) > 0) {
                    controls.message.bind({
                        type: 'question',
                        message: 'Pretende remover o documento selecionado?',
                        afteryes: function () {
                            controls.ajax({
                                functionname: 'delete_attachment',
                                data: {
                                    id: id
                                }
                            }, function (data) {
                                if (ifUndefinedOrNull(data.success, false)) {
                                    controls.message.bind({
                                        type: 'success',
                                        message: 'O documento foi removido com sucesso.',
                                        afterok: function () {
                                            if (!isUndefinedOrNull(after)) { after(data); };
                                        }
                                    });
                                } else {
                                    controls.message.bind({ type: 'error', message: 'Ocorreu um erro ao remover o anexo, por favor tente novamente.' });
                                };
                            }, function () {
                                controls.feedback.bind({ type: 'error', message: 'Ocorreu um erro ao remover o anexo, por favor tente novamente.' });
                            }, function () {
                                controls.feedback.bind({ type: 'error', message: 'Ocorreu um erro ao remover o anexo, por favor tente novamente.' });
                            });
                        }
                    });
                };
            },
        },
        load: function() {
            var me = this,
                ds = me.design;

            me.methods.getclubs(function(){
                me.methods.getplayers(function(){
                    me.methods.getcoach(function(){
                        me.methods.getrepresentation(function(){
                            var representation = me.datasource.representation,
                                clubs = me.datasource.clubs;

                            ds.representationplayer.append('<option value="0">Selecionar</option>');
                            $.each(me.datasource.players, function (index, player) {
                                ds.representationplayer.append('<option value="{0}">{1} {2}</option>'.format(player.id, player.firstname, player.lastname));
                            });


                            ds.representationcoach.append('<option value="0">Selecionar</option>');
                            $.each(me.datasource.coaches, function (index, coach) {
                                ds.representationcoach.append('<option value="{0}">{1} {2}</option>'.format(coach.id, coach.firstname, coach.lastname));
                            });

                            $.each(clubs.SingleFieldDistinct('country'), function (index, country) {
                                var group = $('<optgroup label="{0}"></optgroup>'.format(country)),
                                    countryclubs = clubs.filter(function(c){ return (c.country == country); });

                                $.each(countryclubs, function (index, club) {
                                    group.append('<option value="{0}">{1}</option>'.format(club.id, club.name_club));
                                });

                                ds.representationplayerclubedit.append(group);
                            });

                            //anexos
                            ds.uploader = new FileDropzone({
                                target: ds.ctruploader.find('#box'),
                                clickable: true,
                                multiple: true,
                                forceReplace: false,
                                paramName: 'my-file',
                                accept: '.jpeg, .jpg, .gif, .bmp, .tiff, .png, .pdf, .docx, .doc, .xlsx, .xls, .csv',
                                onChange: function () {
                                    var files = new Array(),
                                        elem = this.element.find('.files');
        
                                    elem.empty();
        
                                    $.each(ifUndefinedOrNull(this.getFiles(), new Array()), function (index, file) {
                                        var isnewfile = ifUndefinedOrNull(files, new Array()).filter(function (a) { return (a.name.toLowerCase() == file.name.toLowerCase()); }).length == 0,
                                            idvalidsize = (file.size <= 10485760); //[ MAX: 10 MB ]
        
                                        if (isnewfile && idvalidsize) {
                                            files.push(file);
                                        };
                                    });
        
                                    ds.uploader.clickable = false;
        
                                    $.each(ifUndefinedOrNull(files, new Array()), function (index, item) {
                                        var reader = new FileReader(),
                                            element = $('<div class="file-name"><div class="row"><div class="remove" style="padding-right: 10px;" data="{1}"><i class="grid-action fa fa-trash" style="color:#3282b8"></i></div>{0}</div></div>'.format(item.name, index));
        
                                        reader.addEventListener('load', function (e) {
                                            var isnewfile = ifUndefinedOrNull(me.datasource.selectedattachments, new Array()).filter(function (a) { return (a.AttachmentName.toLowerCase() == item.name.toLowerCase()); }).length == 0;
        
                                            if (isnewfile) {
                                                var messageattachment = {
                                                        Attachment: null,
                                                        AttachmentName: null,
                                                        ID: 0,
                                                        RepresentationID: 0
                                                    },
                                                    url;
        
                                                messageattachment.index = index;
        
                                                if (item.type.split('/')[0] === 'image') {
                                                    var image = new Image();
        
                                                    //[ RESIZE IMAGE ]
                                                    image.onload = function () {
                                                        var canvas = document.createElement("canvas"),
                                                            context = canvas.getContext("2d");
        
                                                        canvas.width = image.width / 4;
                                                        canvas.height = image.height / 4;
                                                        context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
        
                                                        with (messageattachment) {
                                                            Attachment = canvas.toDataURL();
                                                            AttachmentName = item.name;
                                                        };
        
                                                        me.datasource.selectedattachments.push(messageattachment);
                                                    };
        
                                                    image.src = e.target.result;
                                                } else {
                                                    with (messageattachment) {
                                                        Attachment = reader.result;
                                                        AttachmentName = item.name;
                                                    };
        
                                                    me.datasource.selectedattachments.push(messageattachment);
                                                };
                                            };
                                        }, false);
        
                                        if (!isUndefinedOrNull(item)) { reader.readAsDataURL(item); };
        
                                        //[ REMOVE ]
                                        element.find('.remove[data={0}]'.format(index)).on('click', function (e) {
                                            var id = $(this).attr('data');
        
                                            me.datasource.selectedattachments.removeField('index', id);
                                            $(this).parent().remove();
        
                                            if (me.datasource.selectedattachments.length == 0) {
                                                ds.uploader.clearAll();
        
                                                elem.html(controls.resources.attachment_upload_info);
        
                                                setTimeout(function () {
                                                    ds.uploader.clickable = true;
                                                }, 1000);
                                            };
        
                                            e.preventDefault();
                                        });
        
                                        elem.append(element);
                                    });
        
                                    if (ifUndefinedOrNull(files, new Array()).length == 0) {
                                        with (ds.uploader.element.find('.files')) {
                                            empty();
                                            addClass('dz-default dz-message');
                                        };
                                    } else {
                                        with (ds.uploader.element.find('.files')) {
                                            removeClass('dz-default dz-message');
                                        };
                                    };
                                }
                            });

                            //DADOS DO CONTRATO E JOGADOR
                            if (representation.id > 0) {
                                ds.representationplayer.val(representation.player);
                                ds.representationplayer.trigger('change');
                                ds.representationplayername.val(representation.name);
                                ds.representationplayerfirstname.val(representation.firstname);
                                ds.representationplayerlastname.val(representation.lastname);
                                ds.representationplayerbirth.val(representation.birth);
                                ds.representationplayernationality.val(representation.nationality);
                                ds.representationplayerheight.val(representation.height);
                                ds.representationplayerweight.val(representation.weight);
                                ds.representationplayerclub.val(representation.clubname);
                                ds.representationplayervalue.val(representation.value);
                                ds.representationplayerpassport.val(representation.passport);
                                ds.representationplayerpassportval.val(representation.passportval);
                                
                                ds.representationfather.val(representation.father);
                                ds.representationmother.val(representation.mother);
                                ds.representationdatestart.val(representation.datestart);
                                ds.representationdateend.val(representation.dateend);
                                ds.representationcommission.val(representation.commission);
                                $('.titleRepresentation').html('EDITAR CONTRATO DE REPRESENTAÇÃO');

                                //anexos
                                if (ifUndefinedOrNull(me.datasource.attachments, new Array()).length > 0) {
                                    $.each(me.datasource.attachments, function (index, attachment) {
                                        var filename = attachment.file_name,
                                            lastindex = filename.lastIndexOf('.'),
                                            html = $('<div class="file-name" data="{0}"><div class="row"><div class="actions" style="padding-right: 10px;"><div class="row"><div class="delete" style="padding-right: 10px;" data="{0}"><i class="grid-action fa fa-trash" style="color:#3282b8"> </i></div><div class="download" data="{0}"><i class="grid-action fa fa-download" style="color:#3282b8"></i></div></div></div>{1}</div></div>'.format(attachment.id, attachment.file_name, filename.substring(lastindex, filename.length)));
                                                
                                                
                                        with (html) {
                                            //[ DELETE FILE ]
                                            find('.delete').on('click', function (e) {
                                                var element = $(this),
                                                    id = parseInt($(this).attr('data')),
                                                    parent = $(this).parents('.file-name');

                                                me.methods.deleteattachment(id, function () {
                                                    //[ REMOVE ATTACHMENT FROM ARRAY ]
                                                    me.datasource.attachments.removeField('id', id);

                                                    //[ REMOVE ATTACHMENT HTML ]
                                                    parent.remove();

                                                    if (ifUndefinedOrNull(me.datasource.attachments, new Array()).length == 0){
                                                        ds.ctrfiles.remove();
                                                    }
                                                });
                                                e.preventDefault();
                                            });

                                            //[ DOWNLOAD FILE ]
                                            find('.download').on('click', function (e) {
                                                var id = parseInt($(this).attr('data')),
                                                    selectedfile = me.datasource.attachments.filter(function (a) { return (a.id == id); })[0];

                                                me.methods.downloadattachment(selectedfile);
                                                e.preventDefault();
                                            });
                                        };

                                        ds.ctrfiles.find('.files').append(html);
                                    });
                                } else {
                                    ds.ctrfiles.remove();
                                };

                                if (representation.child == 1){
                                    ds.child.trigger('click')    
                                }

                                //EDITAR CONTRATO
                                ds.saverepresentation.on('click', function(){
                                    var representation = me.datasource.representation;

                                    with(representation) {
                                        id = representation.id;
                                        player = ds.representationplayer.find('option:selected').val();
                                        father = ds.representationfather.val();
                                        mother = ds.representationmother.val();
                                        datestart = ds.representationdatestart.val();
                                        dateend = ds.representationdateend.val();
                                        commission = ds.representationcommission.val();
                                        child = ds.child.is(':checked') ? 1 : 0;
                                    };

                                    //anexos
                                    if (ifUndefinedOrNull(me.datasource.selectedattachments, new Array()).length > 0) {
                                        $.each(me.datasource.selectedattachments, function (index, attachment) {
                                            attachment.RepresentationID = representation.id;
                                        });
                                    };

                                    controls.ajax({
                                        functionname: 'update_representation',
                                        data: {
                                            representation: representation,
                                            attachments: me.datasource.selectedattachments//anexos
                                        }
                                    }, function (data) {
                                        if (ifUndefinedOrNull(data.success, false)) {
                                            controls.feedback.bind({ type: 'success', message: 'Contrato editado com sucesso' });
                                            window.open('representation_list.php', '_self');
                                        } else {
                                            controls.message.bind({ type: 'error', message: 'Não foi possível editar o contrato.' });
                                        };
                                    }, function () {
                                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                    }, function () {
                                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                    });
                                });

                                ds.addnewplayer.remove();
                            } else {
                                ds.ctrfiles.remove(); //anexos

                                //INSERIR NOVO CONTRATO JOGADOR
                                ds.saverepresentation.on('click', function(){
                                    var representation = me.datasource.representation;   

                                    with(representation) {
                                        player = ds.representationplayer.find('option:selected').val();
                                        coach = ds.representationcoach.find('option:selected').val();
                                        father = ds.representationfather.val();
                                        mother = ds.representationmother.val();
                                        child = ds.child.is(':checked') ? 1 : 0;
                                        datestart = ds.representationdatestart.val();
                                        dateend = ds.representationdateend.val();
                                        dateend = ds.representationdateend.val();
                                        commission = ds.representationcommission.val();
                                    };

                                    controls.ajax({
                                        functionname: 'insert_representation',
                                        data: {
                                            representation: representation,
                                            attachments: me.datasource.selectedattachments//anexos
                                        }
                                    }, function (data) {
                                        if (ifUndefinedOrNull(data.success, false)) {
                                            controls.feedback.bind({ type: 'success', message: 'Contrato adicionado com sucesso.' });
                                            window.open('representation_list.php', '_self');
                                        } else {
                                            controls.message.bind({ type: 'error', message: 'Nao foi possível adicionar o contrato.' });
                                        };
                                    }, function () {
                                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                    }, function () {
                                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                    });
                                });

                                //INSERIR NOVO CONTRATO TREINADOR
                                ds.saverepresentationcoach.on('click', function(){
                                    var representation = me.datasource.representation;   

                                    with(representation) {
                                        coach = ds.representationcoach.find('option:selected').val();
                                        datestart = ds.representationdatestart.val();
                                        dateend = ds.representationdateend.val();
                                        dateend = ds.representationdateend.val();
                                        commission = ds.representationcommission.val();
                                    };

                                    controls.ajax({
                                        functionname: 'insert_representation_coach',
                                        data: {
                                            representation: representation,
                                            attachments: me.datasource.selectedattachments//anexos
                                        }
                                    }, function (data) {
                                        if (ifUndefinedOrNull(data.success, false)) {
                                            controls.feedback.bind({ type: 'success', message: 'Contrato adicionado com sucesso.' });
                                            window.open('representation_list.php', '_self');
                                        } else {
                                            controls.message.bind({ type: 'error', message: 'Nao foi possível adicionar o contrato.' });
                                        };
                                    }, function () {
                                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                    }, function () {
                                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                    });
                                });

                                ds.representationplayerclubnew.append('<option value="0">Selecionar</option>');

                                $.each(clubs.SingleFieldDistinct('country'), function (index, country) {
                                    var group = $('<optgroup label="{0}"></optgroup>'.format(country)),
                                        countryclubs = clubs.filter(function(c){ return (c.country == country); });
            
                                    $.each(countryclubs, function (index, club) {
                                        group.append('<option value="{0}">{1}</option>'.format(club.id, club.name_club));
                                    });
            
                                    ds.representationplayerclubnew.append(group);
                                });

                                //ANEXOS NOVO JOGADOR
                                ds.uploaderplayer = new FileDropzone({
                                    target: ds.ctruploadernew.find('#box'),
                                    clickable: true,
                                    multiple: true,
                                    forceReplace: false,
                                    paramName: 'my-file',
                                    accept: '.jpeg, .jpg, .gif, .bmp, .tiff, .png, .pdf, .docx, .doc, .xlsx, .xls, .csv',
                                    onChange: function () {
                                        var files = new Array(),
                                            elem = this.element.find('.files');
            
                                        elem.empty();
            
                                        $.each(ifUndefinedOrNull(this.getFiles(), new Array()), function (index, file) {
                                            var isnewfile = ifUndefinedOrNull(files, new Array()).filter(function (a) { return (a.name.toLowerCase() == file.name.toLowerCase()); }).length == 0,
                                                idvalidsize = (file.size <= 10485760); //[ MAX: 10 MB ]
            
                                            if (isnewfile && idvalidsize) {
                                                files.push(file);
                                            };
                                        });
            
                                        ds.uploaderplayer.clickable = false;
            
                                        $.each(ifUndefinedOrNull(files, new Array()), function (index, item) {
                                            var reader = new FileReader(),
                                                element = $('<div class="file-name"><div class="row"><div class="remove" style="padding-right: 10px;" data="{1}"><i class="grid-action fa fa-trash" style="color:#3282b8"></i></div>{0}</div></div>'.format(item.name, index));
            
                                            reader.addEventListener('load', function (e) {
                                                var isnewfile = ifUndefinedOrNull(me.datasource.selectedattachments, new Array()).filter(function (a) { return (a.AttachmentName.toLowerCase() == item.name.toLowerCase()); }).length == 0;
            
                                                if (isnewfile) {
                                                    var messageattachment = {
                                                            Attachment: null,
                                                            AttachmentName: null,
                                                            ID: 0,
                                                            RepresentationID: 0
                                                        },
                                                        url;
            
                                                    messageattachment.index = index;
            
                                                    if (item.type.split('/')[0] === 'image') {
                                                        var image = new Image();
            
                                                        //[ RESIZE IMAGE ]
                                                        image.onload = function () {
                                                            var canvas = document.createElement("canvas"),
                                                                context = canvas.getContext("2d");
            
                                                            canvas.width = image.width / 4;
                                                            canvas.height = image.height / 4;
                                                            context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
            
                                                            with (messageattachment) {
                                                                Attachment = canvas.toDataURL();
                                                                AttachmentName = item.name;
                                                            };
            
                                                            me.datasource.selectedattachments.push(messageattachment);
                                                        };
            
                                                        image.src = e.target.result;
                                                    } else {
                                                        with (messageattachment) {
                                                            Attachment = reader.result;
                                                            AttachmentName = item.name;
                                                        };
            
                                                        me.datasource.selectedattachments.push(messageattachment);
                                                    };
                                                };
                                            }, false);
            
                                            if (!isUndefinedOrNull(item)) { reader.readAsDataURL(item); };
            
                                            //[ REMOVE ]
                                            element.find('.remove[data={0}]'.format(index)).on('click', function (e) {
                                                var id = $(this).attr('data');
            
                                                me.datasource.selectedattachments.removeField('index', id);
                                                $(this).parent().remove();
            
                                                if (me.datasource.selectedattachments.length == 0) {
                                                    ds.uploaderplayer.clearAll();
            
                                                    elem.html(controls.resources.attachment_upload_info);
            
                                                    setTimeout(function () {
                                                        ds.uploaderplayer.clickable = true;
                                                    }, 1000);
                                                };
            
                                                e.preventDefault();
                                            });
            
                                            elem.append(element);
                                        });
            
                                        if (ifUndefinedOrNull(files, new Array()).length == 0) {
                                            with (ds.uploaderplayer.element.find('.files')) {
                                                empty();
                                                addClass('dz-default dz-message');
                                            };
                                        } else {
                                            with (ds.uploaderplayer.element.find('.files')) {
                                                removeClass('dz-default dz-message');
                                            };
                                        };
                                    }
                                });

                                //ADICIONAR JOGADOR
                                ds.addnewplayer.on('click', function(){
                                    ds.representationplayerclubnew.find('option:selected').val();
                                    ds.representationplayerfirstnamenew.val('');
                                    ds.representationplayerlastnamenew.val('');
                                    ds.representationplayerbirthnew.val('');
                                    ds.representationplayernationalitynew.val('');
                                    ds.representationplayerheightnew.val('');
                                    ds.representationplayerweightnew.val('');
                                    ds.representationplayerfootnew.find('span.cs-placeholder').html();
                                    ds.representationplayerpositionnew.find('span.cs-placeholder').html();
                                    ds.representationplayervaluenew.val('');
                                    ds.representationplayerpassportnew.val('');
                                    ds.representationplayerpassportvalnew.val('');

                                    //ANEXOS NOVO JOGADOR
                                    if (ifUndefinedOrNull(me.datasource.attachments, new Array()).length > 0) {
                                        $.each(me.datasource.attachments, function (index, attachment) {
                                            var filename = attachment.file_name,
                                                lastindex = filename.lastIndexOf('.'),
                                                html = $('<div class="file-name" data="{0}"><div class="row"><div class="actions" style="padding-right: 10px;"><div class="row"><div class="delete" style="padding-right: 10px;" data="{0}"><i class="grid-action fa fa-trash" style="color:#3282b8"> </i></div><div class="download" data="{0}"><i class="grid-action fa fa-download" style="color:#3282b8"></i></div></div></div>{1}</div></div>'.format(attachment.id, attachment.file_name, filename.substring(lastindex, filename.length)));
                                                    
                                                    
                                            with (html) {
                                                //[ DELETE FILE ]
                                                find('.delete').on('click', function (e) {
                                                    var element = $(this),
                                                        id = parseInt($(this).attr('data')),
                                                        parent = $(this).parents('.file-name');
    
                                                    me.methods.deleteattachmentplayer(id, function () {
                                                        //[ REMOVE ATTACHMENT FROM ARRAY ]
                                                        me.datasource.attachments.removeField('id', id);
    
                                                        //[ REMOVE ATTACHMENT HTML ]
                                                        parent.remove();
    
                                                        if (ifUndefinedOrNull(me.datasource.attachments, new Array()).length == 0){
                                                            ds.ctrfilesnew.remove();
                                                        }
                                                    });
                                                    e.preventDefault();
                                                });
    
                                                //[ DOWNLOAD FILE ]
                                                find('.download').on('click', function (e) {
                                                    var id = parseInt($(this).attr('data')),
                                                        selectedfile = me.datasource.attachments.filter(function (a) { return (a.id == id); })[0];
    
                                                    me.methods.downloadattachmentplayer(selectedfile);
                                                    e.preventDefault();
                                                });
                                            };
    
                                            ds.ctrfilesnew.find('.files').append(html);
                                        });
                                    } else {
                                        ds.ctrfilesnew.remove();
                                    };
    
                                    if (representation.child == 1){
                                        ds.child.trigger('click')    
                                    }
                                });

                                //BOTAO DE SALVAR ADICIONAR JOGADOR
                                ds.savenewplayer.on('click', function(){
                                    var player = args.player;       
                                    
                                    with(player) {
                                        club = ds.representationplayerclubnew.find('option:selected').val();
                                        name = ds.representationplayernamenew.val();
                                        firstname = ds.representationplayerfirstnamenew.val();
                                        lastname = ds.representationplayerlastnamenew.val();
                                        birth = ds.representationplayerbirthnew.val();
                                        nationality = ds.representationplayernationalitynew.val();
                                        height = ds.representationplayerheightnew.val();
                                        weight = ds.representationplayerweightnew.val();
                                        foot = ds.representationplayerfootnew.prev().find('.cs-selected span').html();
                                        position = ds.representationplayerpositionnew.prev().find('.cs-selected span').html();
                                        value = ds.representationplayervaluenew.val();
                                        passport = ds.representationplayerpassportnew.val();
                                        passportval = ds.representationplayerpassportvalnew.val();
                                    };

                                    controls.ajax({
                                        functionname: 'insert_player',
                                        data: {
                                            player: player,
                                            attachments: me.datasource.selectedattachments//anexos
                                        }
                                    }, function (data) {
                                        if (ifUndefinedOrNull(data.success, false)) {

                                            //MOSTRAR DADOS ALTERADOS
                                            ds.representationplayerclub.val(player.clubname);
                                            ds.representationplayername.val(player.name);
                                            ds.representationplayerfirstname.val(player.firstname);
                                            ds.representationplayerlastname.val(player.lastname);
                                            ds.representationplayerbirth.val(player.birth);
                                            ds.representationplayernationality.val(player.nationality);
                                            ds.representationplayerheight.val(player.height);
                                            ds.representationplayerweight.val(player.weight);
                                            ds.representationplayervalue.val(player.value);
                                            ds.representationplayerpassport.val(player.passport);
                                            ds.representationplayerpassportval.val(player.passportval);
                                            
                                            controls.feedback.bind({ type: 'success', message: 'Jogador adicionado com sucesso' });
                                            $("[data-dismiss=modal]").trigger({ type: "click" });
                                            //$('body').trigger('click');
                                            
                                        } else {
                                            controls.message.bind({ type: 'error', message: 'Jogador não adicionado com sucesso.' });
                                        };
                                    }, function () {
                                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                    }, function () {
                                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                    });
                                });

                                ds.editplayer.remove();
                            };   
                            
                            //ANEXOS EDIT PLAYER
                            ds.uploaderplayeredit = new FileDropzone({
                                target: ds.ctruploaderedit.find('#box'),
                                clickable: true,
                                multiple: true,
                                forceReplace: false,
                                paramName: 'my-file',
                                accept: '.jpeg, .jpg, .gif, .bmp, .tiff, .png, .pdf, .docx, .doc, .xlsx, .xls, .csv',
                                onChange: function () {
                                    var files = new Array(),
                                        elem = this.element.find('.files');
        
                                    elem.empty();
        
                                    $.each(ifUndefinedOrNull(this.getFiles(), new Array()), function (index, file) {
                                        var isnewfile = ifUndefinedOrNull(files, new Array()).filter(function (a) { return (a.name.toLowerCase() == file.name.toLowerCase()); }).length == 0,
                                            idvalidsize = (file.size <= 10485760); //[ MAX: 10 MB ]
        
                                        if (isnewfile && idvalidsize) {
                                            files.push(file);
                                        };
                                    });
        
                                    ds.uploaderplayeredit.clickable = false;
        
                                    $.each(ifUndefinedOrNull(files, new Array()), function (index, item) {
                                        var reader = new FileReader(),
                                            element = $('<div class="file-name"><div class="row"><div class="remove" style="padding-right: 10px;" data="{1}"><i class="grid-action fa fa-trash" style="color:#3282b8"></i></div>{0}</div></div>'.format(item.name, index));
        
                                        reader.addEventListener('load', function (e) {
                                            var isnewfile = ifUndefinedOrNull(me.datasource.selectedattachments, new Array()).filter(function (a) { return (a.AttachmentName.toLowerCase() == item.name.toLowerCase()); }).length == 0;
        
                                            if (isnewfile) {
                                                var messageattachment = {
                                                        Attachment: null,
                                                        AttachmentName: null,
                                                        ID: 0,
                                                        PlayerID: 0
                                                    },
                                                    url;
        
                                                messageattachment.index = index;
        
                                                if (item.type.split('/')[0] === 'image') {
                                                    var image = new Image();
        
                                                    //[ RESIZE IMAGE ]
                                                    image.onload = function () {
                                                        var canvas = document.createElement("canvas"),
                                                            context = canvas.getContext("2d");
        
                                                        canvas.width = image.width / 4;
                                                        canvas.height = image.height / 4;
                                                        context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
        
                                                        with (messageattachment) {
                                                            Attachment = canvas.toDataURL();
                                                            AttachmentName = item.name;
                                                        };
        
                                                        me.datasource.selectedattachments.push(messageattachment);
                                                    };
        
                                                    image.src = e.target.result;
                                                } else {
                                                    with (messageattachment) {
                                                        Attachment = reader.result;
                                                        AttachmentName = item.name;
                                                    };
        
                                                    me.datasource.selectedattachments.push(messageattachment);
                                                };
                                            };
                                        }, false);
        
                                        if (!isUndefinedOrNull(item)) { reader.readAsDataURL(item); };
        
                                        //[ REMOVE ]
                                        element.find('.remove[data={0}]'.format(index)).on('click', function (e) {
                                            var id = $(this).attr('data');
        
                                            me.datasource.selectedattachments.removeField('index', id);
                                            $(this).parent().remove();
        
                                            if (me.datasource.selectedattachments.length == 0) {
                                                ds.uploaderplayeredit.clearAll();
        
                                                elem.html(controls.resources.attachment_upload_info);
        
                                                setTimeout(function () {
                                                    ds.uploaderplayeredit.clickable = true;
                                                }, 1000);
                                            };
        
                                            e.preventDefault();
                                        });
        
                                        elem.append(element);
                                    });
        
                                    if (ifUndefinedOrNull(files, new Array()).length == 0) {
                                        with (ds.uploaderplayeredit.element.find('.files')) {
                                            empty();
                                            addClass('dz-default dz-message');
                                        };
                                    } else {
                                        with (ds.uploaderplayeredit.element.find('.files')) {
                                            removeClass('dz-default dz-message');
                                        };
                                    };
                                }
                            });

                            //EDITAR DADOS DO JOGADOR
                            ds.editplayer.on('click', function(){
                                ds.representationplayerclubedit.val(representation.club);
                                ds.representationplayerclubedit.trigger('change');
                                ds.representationplayernameedit.val(representation.name);
                                ds.representationplayerfirstnameedit.val(representation.firstname);
                                ds.representationplayerlastnameedit.val(representation.lastname);
                                ds.representationplayerbirthedit.val(representation.birth);
                                ds.representationplayernationalityedit.val(representation.nationality);
                                ds.representationplayerheightedit.val(representation.height);
                                ds.representationplayerweightedit.val(representation.weight);
                                ds.representationplayervalueedit.val(representation.value);
                                ds.representationplayerpassportedit.val(representation.passport);
                                ds.representationplayerpassportvaledit.val(representation.passportval);

                                //ANEXOS EDIT PLAYER
                                if (ifUndefinedOrNull(me.datasource.attachments, new Array()).length > 0) {
                                    $.each(me.datasource.attachments, function (index, attachment) {
                                        var filename = attachment.file_name,
                                            lastindex = filename.lastIndexOf('.'),
                                            html = $('<div class="file-name" data="{0}"><div class="row"><div class="actions" style="padding-right: 10px;"><div class="row"><div class="delete" style="padding-right: 10px;" data="{0}"><i class="grid-action fa fa-trash" style="color:#3282b8"> </i></div><div class="download" data="{0}"><i class="grid-action fa fa-download" style="color:#3282b8"></i></div></div></div>{1}</div></div>'.format(attachment.id, attachment.file_name, filename.substring(lastindex, filename.length)));
                                                
                                                
                                        with (html) {
                                            //[ DELETE FILE ]
                                            find('.delete').on('click', function (e) {
                                                var element = $(this),
                                                    id = parseInt($(this).attr('data')),
                                                    parent = $(this).parents('.file-name');

                                                me.methods.deleteattachmentplayeredit(id, function () {
                                                    //[ REMOVE ATTACHMENT FROM ARRAY ]
                                                    me.datasource.attachments.removeField('id', id);

                                                    //[ REMOVE ATTACHMENT HTML ]
                                                    parent.remove();

                                                    if (ifUndefinedOrNull(me.datasource.attachments, new Array()).length == 0){
                                                        ds.ctrfilesedit.remove();
                                                    }
                                                });
                                                e.preventDefault();
                                            });

                                            //[ DOWNLOAD FILE ]
                                            find('.download').on('click', function (e) {
                                                var id = parseInt($(this).attr('data')),
                                                    selectedfile = me.datasource.attachments.filter(function (a) { return (a.id == id); })[0];

                                                me.methods.downloadattachmentplayeredit(selectedfile);
                                                e.preventDefault();
                                            });
                                        };

                                        ds.ctrfilesedit.find('.files').append(html);
                                    });
                                } else {
                                    ds.ctrfilesedit.remove();
                                };
        
                                ds.representationplayerfootedit.prev().find('li[data-value="{0}"]'.format(ds.representationplayerfootedit.val())).trigger('click');
                                ds.representationplayerfootedit.prev().prev().trigger('click');
        
                                $.each(ds.representationplayerpositionedit.find('option'), function (index, element) {
                                    if ($(element).html() == representation.position) {
                                        $(element).attr('selected', 'selected');
        
                                        ds.representationplayerpositionedit.prev().find('li[data-value="{0}"]'.format(ds.representationplayerpositionedit.val())).addClass('cs-selected');
        
                                        return false;
                                    }
                                });
        
                                ds.representationplayerpositionedit.prev().find('li[data-value="{0}"]'.format(ds.representationplayerpositionedit.val())).trigger('click');
                                ds.representationplayerpositionedit.prev().prev().trigger('click');
                            });

                            //BOTAO DE SALVAR EDIÇÃO DE JOGADOR
                            ds.saveeditplayer.on('click', function(){
                                var player = args.player;       
                                
                                with(player) {
                                    id = representation.player;
                                    club = ds.representationplayerclubedit.find('option:selected').val();
                                    name = ds.representationplayernameedit.val();
                                    firstname = ds.representationplayerfirstnameedit.val();
                                    lastname = ds.representationplayerlastnameedit.val();
                                    birth = ds.representationplayerbirthedit.val();
                                    nationality = ds.representationplayernationalityedit.val();
                                    height = ds.representationplayerheightedit.val();
                                    weight = ds.representationplayerweightedit.val();
                                    foot = ds.representationplayerfootedit.find('span.cs-placeholder').html();
                                    position = ds.representationplayerpositionedit.find('span.cs-placeholder').html();
                                    value = ds.representationplayervalueedit.val();
                                    passport = ds.representationplayerpassportedit.val();
                                    passportval = ds.representationplayerpassportvaledit.val();
                                };

                                //ANEXOS EDIT PLAYER
                                if (ifUndefinedOrNull(me.datasource.selectedattachments, new Array()).length > 0) {
                                    $.each(me.datasource.selectedattachments, function (index, attachment) {
                                        attachment.PlayerID = player.id;
                                    });
                                };

                                controls.ajax({
                                    functionname: 'update_player',
                                    data: {
                                        player: player,
                                        attachments: me.datasource.selectedattachments//anexos
                                    }
                                }, function (data) {
                                    if (ifUndefinedOrNull(data.success, false)) {
                                        
                                        //MOSTRAR DADOS ALTERADOS
                                        ds.representationplayername.val(player.name);
                                        ds.representationplayerfirstname.val(player.firstname);
                                        ds.representationplayerlastname.val(player.lastname);
                                        ds.representationplayerbirth.val(player.birth);
                                        ds.representationplayernationality.val(player.nationality);
                                        ds.representationplayerheight.val(player.height);
                                        ds.representationplayerweight.val(player.weight);
                                        ds.representationplayerclub.val(player.clubname);
                                        ds.representationplayervalue.val(player.value);
                                        ds.representationplayerpassport.val(player.passport);
                                        ds.representationplayerpassportval.val(player.passportval);
                                        
                                        controls.feedback.bind({ type: 'success', message: 'Dados do jogador atualizados com sucesso' });
                                        $("[data-dismiss=modal]").trigger({ type: "click" });
                                        //$('body').trigger('click');

                                    } else {
                                        controls.message.bind({ type: 'error', message: 'O jogador não existe.' });
                                    };
                                }, function () {
                                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                }, function () {
                                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                });
                            });  
                        });
                    });
                });
            });
        },
        init: function() {
            var me = this;
            me.datasource.base = this;
            me.methods.base = this;
            me.load();
        }
    };
    representation.init();
};

function club(args) {
    var club = {
        design: {
            //DADOS DO CONTRATO
            clubplayername: $('.txtPlayerNameClub'),
            clubplayerfirstname: $('.txtPlayerFirstNameClub'),
            clubplayerlastname: $('.txtPlayerLastNameClub'),
            clubplayerbirth: $('.txtPlayerBirthClub'),
            clubplayernationality: $('.txtPlayerNationalityClub'),
            clubplayerheight: $('.txtPlayerHeightClub'),
            clubplayerweight: $('.txtPlayerWeightClub'),
            clubplayerclub: $('.txtPlayerClubClub'),
            clubplayervalue: $('.txtPlayerValueClub'),
            clubplayerpassport: $('.txtPlayerPassportClub'),
            clubplayerpassportval: $('.txtPlayerPassportValClub'),
            ctrfiles: $('.ctrFiles'), //anexos
            ctruploader: $('.ctrUploader'), //anexos

            //NOVO JOGADOR
            clubplayerclubnew: $('.ddlPlayerClubNewClub'),
            clubplayernamenew: $('.txtPlayerNameNewClub'),
            clubplayerfirstnamenew: $('.txtPlayerFirstNameNewClub'),
            clubplayerlastnamenew: $('.txtPlayerLastNameNewClub'),
            clubplayerbirthnew: $('.txtPlayerBirthNewClub'),
            clubplayernationalitynew: $('.txtPlayerNationalityNewClub'),
            clubplayerheightnew: $('.txtPlayerHeightNewClub'),
            clubplayerweightnew: $('.txtPlayerWeightNewClub'),
            clubplayerpositionnew: $('select.ddlPlayerPositionNewClub'),
            clubplayerfootnew: $('select.ddlPlayerFootNewClub'),
            clubplayervaluenew: $('.txtPlayerValueNewClub'),
            clubplayerpassportnew: $('.txtPlayerPassportNewClub'),
            clubplayerpassportvalnew: $('.txtPlayerPassportValNewClub'),

            //EDITAR JOGADOR
            clubplayerclubedit: $('.ddlPlayerClubEditClub'),
            clubplayernameedit: $('.txtPlayerNameEditClub'),
            clubplayerfirstnameedit: $('.txtPlayerFirstNameEditClub'),
            clubplayerlastnameedit: $('.txtPlayerLastNameEditClub'),
            clubplayerbirthedit: $('.txtPlayerBirthEditClub'),
            clubplayernationalityedit: $('.txtPlayerNationalityEditClub'),
            clubplayerheightedit: $('.txtPlayerHeightEditClub'),
            clubplayerweightedit: $('.txtPlayerWeightEditClub'),
            clubplayerpositionedit: $('select.ddlPlayerPositionEditClub'),
            clubplayerfootedit: $('select.ddlPlayerFootEditClub'),
            clubplayervalueedit: $('.txtPlayerValueEditClub'),
            clubplayerpassportedit: $('.txtPlayerPassportEditClub'),
            clubplayerpassportvaledit: $('.txtPlayerPassportValEditClub'),

            //INSERIR CONTRATO
            clubplayer: $('select.ddlCclubPlayer'),
            clubcoach: $('select.ddlCclubCoach'),
            clubclub: $('.ddlCclubClub'),
            clubdatestart: $('.txtCclubDateStart'),
            clubdateend: $('.txtCclubDateEnd'),
            clubvalue: $('.txtCclubValue'),
            clubclause: $('.txtCclubClause'),
            clubbonus: $('.txtCclubBonus'),
            clubcourt: $('.txtCclubCourt'),
            clubobs: $('.txtCclubObs'),

            //BOTÕES
            saveclub: $('.btnSaveCclub'),
            saveclubcoach: $('.btnSaveCclubCoach'),
            saveeditplayerclub: $('.btnSavePlayerEditClub'),
            savenewplayerclub: $('.btnSavePlayerNewClub'),
            addnewplayerclub: $('.addNewPlayerClub'),
            editplayerclub: $('.editPlayerClub')
        },
        datasource: {
            base: undefined,
            id: ifUndefinedOrNull(args.data.club_id, 0),
            club: undefined,
            list_clubs: new Array(),
            attachments: new Array(), //anexos
            selectedattachments: new Array() //anexos
        },
        methods: {
            base: undefined,
            getclub: function (after) {
                var me = this.base;

                //[ GET club ]
                if (ifUndefinedOrNull(me.datasource.id, 0) > 0) {
                    controls.ajax({
                        functionname: 'club',
                        data: {
                            club_id: ifUndefinedOrNull(me.datasource.id, 0)
                        }
                    }, function (data) {
                        //[ SET list_club LIST ]
                        me.datasource.club = data.club;
                        me.datasource.attachments = data.attachments; //anexos

                        if (!isUndefinedOrNull(after)) { after(); };
                    }, function () {
                        //[ ERROR ]
                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                    }, function () {
                        //[ ERROR ]
                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                    });
                } else {
                    me.datasource.club = args.club;
                    if (!isUndefinedOrNull(after)) { after(); };
                };
            },
            getclubs: function (after) {
                var me = this.base;

                controls.ajax({
                    functionname: 'clubs_list',
                }, function (data) {
                    //[ SET list_player LIST ]
                    me.datasource.clubs = data.clubs;

                    if (!isUndefinedOrNull(after)) { after(); };
                }, function () {
                    //[ ERROR ]
                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                }, function () {
                    //[ ERROR ]
                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                });
            },
            getplayers: function (after) {
                var me = this.base;

                controls.ajax({
                    functionname: 'players',
                }, function (data) {
                    //[ SET list_player LIST ]
                    me.datasource.players = data.players;

                    if (!isUndefinedOrNull(after)) { after(); };
                }, function () {
                    //[ ERROR ]
                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                }, function () {
                    //[ ERROR ]
                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                });
            },
            getcoach: function (after) {
                var me = this.base;

                controls.ajax({
                    functionname: 'coaches',
                }, function (data) {
                    //[ SET list_player LIST ]
                    me.datasource.coaches = data.coaches;

                    if (!isUndefinedOrNull(after)) { after(); };
                }, function () {
                    //[ ERROR ]
                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                }, function () {
                    //[ ERROR ]
                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                });
            },
            downloadattachment: function (attachment) {
                if (!isStringVoid(attachment.file)) {
                    const downloadLink = document.createElement("a");
    
                    with (downloadLink) {
                        href = attachment.file;
                        download = attachment.file_name;
                        click();
                    };
                };
            },
            deleteattachment: function (id, after) {
                var me = this.base;
    
                //[ DELETE ATTACHMENT ]
                if (ifUndefinedOrNull(me.datasource.id, 0) > 0) {
                    controls.message.bind({
                        type: 'question',
                        message: 'Pretende remover o documento selecionado?',
                        afteryes: function () {
                            controls.ajax({
                                functionname: 'delete_attachment_club',
                                data: {
                                    id: id
                                }
                            }, function (data) {
                                if (ifUndefinedOrNull(data.success, false)) {
                                    controls.message.bind({
                                        type: 'success',
                                        message: 'O documento foi removido com sucesso.',
                                        afterok: function () {
                                            if (!isUndefinedOrNull(after)) { after(data); };
                                        }
                                    });
                                } else {
                                    controls.message.bind({ type: 'error', message: 'Ocorreu um erro ao remover o anexo, por favor tente novamente.' });
                                };
                            }, function () {
                                controls.feedback.bind({ type: 'error', message: 'Ocorreu um erro ao remover o anexo, por favor tente novamente.' });
                            }, function () {
                                controls.feedback.bind({ type: 'error', message: 'Ocorreu um erro ao remover o anexo, por favor tente novamente.' });
                            });
                        }
                    });
                };
            },
        },
        load: function() {
            var me = this,
                ds = me.design;     
                
            me.methods.getclubs(function(){
                me.methods.getplayers(function(){
                    me.methods.getcoach(function(){
                        me.methods.getclub(function(){
                            var clubs = me.datasource.club,
                            list_clubs = me.datasource.clubs;

                            ds.clubplayer.append('<option value="0">Selecionar</option>');
                            $.each(me.datasource.players, function (index, player) {
                                ds.clubplayer.append('<option value="{0}">{1} {2}</option>'.format(player.id, player.firstname, player.lastname));
                                
                            });

                            ds.clubcoach.append('<option value="0">Selecionar</option>');
                            $.each(me.datasource.coaches, function (index, coach) {
                                ds.clubcoach.append('<option value="{0}">{1} {2}</option>'.format(coach.id, coach.firstname, coach.lastname));
                            });
                            
                            ds.clubclub.append('<option value="0">Selecionar</option>');
                            $.each(list_clubs.SingleFieldDistinct('country'), function (index, country) {
                                var group = $('<optgroup label="{0}"></optgroup>'.format(country)),
                                    countryclubs = list_clubs.filter(function(c){ return (c.country == country); });

                                $.each(countryclubs, function (index, club) {
                                    group.append('<option value="{0}">{1}</option>'.format(club.id, club.name_club));
                                });

                                ds.clubclub.append(group);
                            });

                            //anexos
                            ds.uploader = new FileDropzone({
                                target: ds.ctruploader.find('#box'),
                                clickable: true,
                                multiple: true,
                                forceReplace: false,
                                paramName: 'my-file',
                                accept: '.jpeg, .jpg, .gif, .bmp, .tiff, .png, .pdf, .docx, .doc, .xlsx, .xls, .csv',
                                onChange: function () {
                                    var files = new Array(),
                                        elem = this.element.find('.files');

                                    elem.empty();

                                    $.each(ifUndefinedOrNull(this.getFiles(), new Array()), function (index, file) {
                                        var isnewfile = ifUndefinedOrNull(files, new Array()).filter(function (a) { return (a.name.toLowerCase() == file.name.toLowerCase()); }).length == 0,
                                            idvalidsize = (file.size <= 10485760); //[ MAX: 10 MB ]

                                        if (isnewfile && idvalidsize) {
                                            files.push(file);
                                        };
                                    });

                                    ds.uploader.clickable = false;

                                    $.each(ifUndefinedOrNull(files, new Array()), function (index, item) {
                                        var reader = new FileReader(),
                                            element = $('<div class="file-name"><div class="row"><div class="remove" style="padding-right: 10px;" data="{1}"><i class="grid-action fa fa-trash" style="color:#3282b8"></i></div>{0}</div></div>'.format(item.name, index));

                                        reader.addEventListener('load', function (e) {
                                            var isnewfile = ifUndefinedOrNull(me.datasource.selectedattachments, new Array()).filter(function (a) { return (a.AttachmentName.toLowerCase() == item.name.toLowerCase()); }).length == 0;

                                            if (isnewfile) {
                                                var messageattachment = {
                                                        Attachment: null,
                                                        AttachmentName: null,
                                                        ID: 0,
                                                        ClubID: 0
                                                    },
                                                    url;

                                                messageattachment.index = index;

                                                if (item.type.split('/')[0] === 'image') {
                                                    var image = new Image();

                                                    //[ RESIZE IMAGE ]
                                                    image.onload = function () {
                                                        var canvas = document.createElement("canvas"),
                                                            context = canvas.getContext("2d");

                                                        canvas.width = image.width / 4;
                                                        canvas.height = image.height / 4;
                                                        context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);

                                                        with (messageattachment) {
                                                            Attachment = canvas.toDataURL();
                                                            AttachmentName = item.name;
                                                        };

                                                        me.datasource.selectedattachments.push(messageattachment);
                                                    };

                                                    image.src = e.target.result;
                                                } else {
                                                    with (messageattachment) {
                                                        Attachment = reader.result;
                                                        AttachmentName = item.name;
                                                    };

                                                    me.datasource.selectedattachments.push(messageattachment);
                                                };
                                            };
                                        }, false);

                                        if (!isUndefinedOrNull(item)) { reader.readAsDataURL(item); };

                                        //[ REMOVE ]
                                        element.find('.remove[data={0}]'.format(index)).on('click', function (e) {
                                            var id = $(this).attr('data');

                                            me.datasource.selectedattachments.removeField('index', id);
                                            $(this).parent().remove();

                                            if (me.datasource.selectedattachments.length == 0) {
                                                ds.uploader.clearAll();

                                                elem.html(controls.resources.attachment_upload_info);

                                                setTimeout(function () {
                                                    ds.uploader.clickable = true;
                                                }, 1000);
                                            };

                                            e.preventDefault();
                                        });

                                        elem.append(element);
                                    });

                                    if (ifUndefinedOrNull(files, new Array()).length == 0) {
                                        with (ds.uploader.element.find('.files')) {
                                            empty();
                                            addClass('dz-default dz-message');
                                        };
                                    } else {
                                        with (ds.uploader.element.find('.files')) {
                                            removeClass('dz-default dz-message');
                                        };
                                    };
                                }
                            });

                            if (clubs.id > 0) {
                                ds.clubplayername.val(clubs.name);
                                ds.clubplayerfirstname.val(clubs.firstname);
                                ds.clubplayerlastname.val(clubs.lastname);
                                ds.clubplayerbirth.val(clubs.birth);
                                ds.clubplayernationality.val(clubs.nationality);
                                ds.clubplayerheight.val(clubs.height);
                                ds.clubplayerweight.val(clubs.weight);
                                ds.clubplayerclub.val(clubs.clubname);
                                ds.clubplayervalue.val(clubs.valueplayer);
                                ds.clubplayerpassport.val(clubs.passport);
                                ds.clubplayerpassportval.val(clubs.passportval);

                                ds.clubplayer.val(clubs.player);
                                ds.clubplayer.trigger('change');
                                ds.clubclub.val(clubs.club);
                                ds.clubclub.trigger('change');
                                ds.clubdatestart.val(clubs.datestart);
                                ds.clubdateend.val(clubs.dateend);
                                ds.clubvalue.val(clubs.value);
                                ds.clubclause.val(clubs.clause);
                                ds.clubbonus.val(clubs.bonus);
                                ds.clubcourt.val(clubs.court);
                                ds.clubobs.val(clubs.obs);
                                $('.titleClub').html('EDITAR CONTRATO DE CLUBES');

                                //anexos
                                if (ifUndefinedOrNull(me.datasource.attachments, new Array()).length > 0) {
                                    $.each(me.datasource.attachments, function (index, attachment) {
                                        var filename = attachment.file_name,
                                            lastindex = filename.lastIndexOf('.'),
                                            html = $('<div class="file-name" data="{0}"><div class="row"><div class="actions" style="padding-right: 10px;"><div class="row"><div class="delete" style="padding-right: 10px;" data="{0}"><i class="grid-action fa fa-trash" style="color:#3282b8"> </i></div><div class="download" data="{0}"><i class="grid-action fa fa-download" style="color:#3282b8"></i></div></div></div>{1}</div></div>'.format(attachment.id, attachment.file_name, filename.substring(lastindex, filename.length)));
                                                
                                                
                                        with (html) {
                                            //[ DELETE FILE ]
                                            find('.delete').on('click', function (e) {
                                                var element = $(this),
                                                    id = parseInt($(this).attr('data')),
                                                    parent = $(this).parents('.file-name');

                                                me.methods.deleteattachment(id, function () {
                                                    //[ REMOVE ATTACHMENT FROM ARRAY ]
                                                    me.datasource.attachments.removeField('id', id);

                                                    //[ REMOVE ATTACHMENT HTML ]
                                                    parent.remove();

                                                    if (ifUndefinedOrNull(me.datasource.attachments, new Array()).length == 0){
                                                        ds.ctrfiles.remove();
                                                    }
                                                });
                                                e.preventDefault();
                                            });

                                            //[ DOWNLOAD FILE ]
                                            find('.download').on('click', function (e) {
                                                var id = parseInt($(this).attr('data')),
                                                    selectedfile = me.datasource.attachments.filter(function (a) { return (a.id == id); })[0];

                                                me.methods.downloadattachment(selectedfile);
                                                e.preventDefault();
                                            });
                                        };

                                        ds.ctrfiles.find('.files').append(html);
                                    });
                                } else {
                                    ds.ctrfiles.remove();
                                };

                                //EDITAR CONTRATO CLUBES
                                ds.saveclub.on('click', function(){
                                    var club = me.datasource.club;

                                    with(club) {
                                        player = ds.clubplayer.find('option:selected').val();
                                        club = ds.clubclub.find('option:selected').val();
                                        datestart = ds.clubdatestart.val();
                                        dateend = ds.clubdateend.val();
                                        value = ds.clubvalue.val();
                                        clause = ds.clubclause.val();
                                        bonus = ds.clubbonus.val();
                                        court = ds.clubcourt.val();
                                        obs = ds.clubobs.val();
                                    };

                                    //anexos
                                    if (ifUndefinedOrNull(me.datasource.selectedattachments, new Array()).length > 0) {
                                        $.each(me.datasource.selectedattachments, function (index, attachment) {
                                            attachment.ClubID = club.id;
                                        });
                                    };

                                    controls.ajax({
                                        functionname: 'update_club',
                                        data: {
                                            club: club,
                                            attachments: me.datasource.selectedattachments//anexos
                                        }
                                    }, function (data) {
                                        if (ifUndefinedOrNull(data.success, false)) {
                                            controls.feedback.bind({ type: 'success', message: 'login com sucesso' });
                                            window.open('clubs_list.php', '_self');
                                        } else {
                                            controls.message.bind({ type: 'error', message: 'O utilizador não existe.' });
                                        };
                                    }, function () {
                                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                    }, function () {
                                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                    });
                                });

                                ds.addnewplayerclub.remove();

                            } else {
                                ds.ctrfiles.remove(); //anexos

                                //INSERIR CONTRATO CLUBES JOGADORES
                                ds.saveclub.on('click', function(){
                                    var club = me.datasource.club;

                                    with(club) {
                                        player = ds.clubplayer.find('option:selected').val();
                                        club = ds.clubclub.find('option:selected').val();
                                        datestart = ds.clubdatestart.val();
                                        dateend = ds.clubdateend.val();
                                        value = ds.clubvalue.val();
                                        clause = ds.clubclause.val();
                                        bonus = ds.clubbonus.val();
                                        court = ds.clubcourt.val();
                                        obs = ds.clubobs.val();
                                    };

                                    controls.ajax({
                                        functionname: 'insert_club',
                                        data: {
                                            club: club,
                                            attachments: me.datasource.selectedattachments//anexos
                                        }
                                    }, function (data) {
                                        if (ifUndefinedOrNull(data.success, false)) {
                                            controls.feedback.bind({ type: 'success', message: 'Dados do contrato atualizados com sucesso.' });
                                            window.open('clubs_list.php', '_self');
                                        } else {
                                            controls.message.bind({ type: 'error', message: 'O contrato não foi criado com sucesso.' });
                                        };
                                    }, function () {
                                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                    }, function () {
                                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                    });
                                });

                                //INSERIR NOVO CONTRATO CLUBES TREINADOR
                                ds.saveclubcoach.on('click', function(){
                                    var club = me.datasource.club;   

                                    with(club) {
                                        coach = ds.clubcoach.find('option:selected').val();
                                        club = ds.clubclub.find('option:selected').val();
                                        datestart = ds.clubdatestart.val();
                                        dateend = ds.clubdateend.val();
                                        value = ds.clubvalue.val();
                                        clause = ds.clubclause.val();
                                        bonus = ds.clubbonus.val();
                                        court = ds.clubcourt.val();
                                        obs = ds.clubobs.val();
                                    };

                                    controls.ajax({
                                        functionname: 'insert_club_coach',
                                        data: {
                                            club: club,
                                            attachments: me.datasource.selectedattachments//anexos
                                        }
                                    }, function (data) {
                                        if (ifUndefinedOrNull(data.success, false)) {
                                            controls.feedback.bind({ type: 'success', message: 'Contrato adicionado com sucesso.' });
                                            window.open('representation_list.php', '_self');
                                        } else {
                                            controls.message.bind({ type: 'error', message: 'Nao foi possível adicionar o contrato.' });
                                        };
                                    }, function () {
                                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                    }, function () {
                                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                    });
                                });

                                $.each(list_clubs.SingleFieldDistinct('country'), function (index, country) {
                                    var group = $('<optgroup label="{0}"></optgroup>'.format(country)),
                                        countryclubs = list_clubs.filter(function(c){ return (c.country == country); });
            
                                    $.each(countryclubs, function (index, club) {
                                        group.append('<option value="{0}">{1}</option>'.format(club.id, club.name_club));
                                    });
            
                                    ds.clubplayerclubnew.append(group);
                                });

                                //ADICIONAR JOGADOR
                                ds.addnewplayerclub.on('click', function(){
                                    ds.clubplayerclubnew.val();
                                    ds.clubplayerclubnew.trigger('change');
                                    ds.clubplayernamenew.val('');
                                    ds.clubplayerfirstnamenew.val('');
                                    ds.clubplayerlastnamenew.val('');
                                    ds.clubplayerbirthnew.val('');
                                    ds.clubplayernationalitynew.val('');
                                    ds.clubplayerheightnew.val('');
                                    ds.clubplayerweightnew.val('');
                                    ds.clubplayerfootnew.find('span.cs-placeholder').html();
                                    ds.clubplayerpositionnew.find('span.cs-placeholder').html();
                                    ds.clubplayervaluenew.val('');
                                    ds.clubplayerpassportnew.val('');
                                    ds.clubplayerpassportvalnew.val('');
                                });

                                //BOTAO DE SALVAR ADICIONAR JOGADOR
                                ds.savenewplayerclub.on('click', function(){
                                    var player = args.player;       
                                    
                                    with(player) {
                                        name = ds.clubplayernamenew.val();
                                        club = ds.clubplayerclubnew.find('option:selected').val();
                                        firstname = ds.clubplayerfirstnamenew.val();
                                        lastname = ds.clubplayerlastnamenew.val();
                                        birth = ds.clubplayerbirthnew.val();
                                        nationality = ds.clubplayernationalitynew.val();
                                        height = ds.clubplayerheightnew.val();
                                        weight = ds.clubplayerweightnew.val();
                                        foot = ds.clubplayerfootnew.find('span.cs-placeholder').html();
                                        position = ds.clubplayerpositionnew.find('span.cs-placeholder').html();
                                        value = ds.clubplayervaluenew.val();
                                        passport = ds.clubplayerpassportnew.val();
                                        passportval = ds.clubplayerpassportvalnew.val();
                                    };

                                    controls.ajax({
                                        functionname: 'insert_player',
                                        data: {
                                            player: player
                                        }
                                    }, function (data) {
                                        if (ifUndefinedOrNull(data.success, false)) {

                                            //MOSTRAR DADOS ALTERADOS
                                            ds.clubplayerclub.val(player.clubname);
                                            ds.clubplayername.val(player.name);
                                            ds.clubplayerfirstname.val(player.firstname);
                                            ds.clubplayerlastname.val(player.lastname);
                                            ds.clubplayerbirth.val(player.birth);
                                            ds.clubplayernationality.val(player.nationality);
                                            ds.clubplayerheight.val(player.height);
                                            ds.clubplayerweight.val(player.weight);
                                            ds.clubplayervalue.val(player.value);
                                            ds.clubplayerpassport.val(player.passport);
                                            ds.clubplayerpassportval.val(player.passportval);
                                            
                                            controls.feedback.bind({ type: 'success', message: 'Jogador adicionado com sucesso' });
                                            $("[data-dismiss=modal]").trigger({ type: "click" });
                                            //$('body').trigger('click');
                                            
                                        } else {
                                            controls.message.bind({ type: 'error', message: 'Jogador não adicionado com sucesso.' });
                                        };
                                    }, function () {
                                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                    }, function () {
                                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                    });
                                });
                                
                                ds.editplayerclub.remove();
                            };             

                            //EDITAR DADOS DO JOGADOR
                            $.each(list_clubs.SingleFieldDistinct('country'), function (index, country) {
                                var group = $('<optgroup label="{0}"></optgroup>'.format(country)),
                                    countryclubs = list_clubs.filter(function(c){ return (c.country == country); });

                                $.each(countryclubs, function (index, club) {
                                    group.append('<option value="{0}">{1}</option>'.format(club.id, club.name_club));
                                });

                                ds.clubplayerclubedit.append(group);
                            });

                            ds.editplayerclub.on('click', function(){
                                ds.clubplayerclubedit.val(clubs.club);
                                ds.clubplayerclubedit.trigger('change');
                                ds.clubplayernameedit.val(clubs.name);
                                ds.clubplayerfirstnameedit.val(clubs.firstname);
                                ds.clubplayerlastnameedit.val(clubs.lastname);
                                ds.clubplayerbirthedit.val(clubs.birth);
                                ds.clubplayernationalityedit.val(clubs.nationality);
                                ds.clubplayerheightedit.val(clubs.height);
                                ds.clubplayerweightedit.val(clubs.weight);
                                ds.clubplayerfootedit.find('span.cs-placeholder').html();
                                ds.clubplayerpositionedit.find('span.cs-placeholder').html();
                                ds.clubplayervalueedit.val(clubs.value);
                                ds.clubplayerpassportedit.val(clubs.passport);
                                ds.clubplayerpassportvaledit.val(clubs.passportval);
                            });

                            //BOTAO DE SALVAR EDIÇÃO DE JOGADOR
                            ds.saveeditplayerclub.on('click', function(){
                                var player = args.player;       
                                
                                with(player) {
                                    id = clubs.player;
                                    club = ds.clubplayerclubedit.find('option:selected').val();
                                    name = ds.clubplayernameedit.val();
                                    firstname = ds.clubplayerfirstnameedit.val();
                                    lastname = ds.clubplayerlastnameedit.val();
                                    birth = ds.clubplayerbirthedit.val();
                                    nationality = ds.clubplayernationalityedit.val();
                                    height = ds.clubplayerheightedit.val();
                                    weight = ds.clubplayerweightedit.val();
                                    foot = ds.clubplayerfootedit.find('span.cs-placeholder').html();
                                    position = ds.clubplayerpositionedit.find('span.cs-placeholder').html();
                                    value = ds.clubplayervalueedit.val();
                                    passport = ds.clubplayerpassportedit.val();
                                    passportval = ds.clubplayerpassportvaledit.val();
                                };

                                controls.ajax({
                                    functionname: 'update_player',
                                    data: {
                                        player: player
                                    }
                                }, function (data) {
                                    if (ifUndefinedOrNull(data.success, false)) {
                                        
                                        //MOSTRAR DADOS ALTERADOS
                                        ds.clubplayername.val(player.name);
                                        ds.clubplayerfirstname.val(player.firstname);
                                        ds.clubplayerlastname.val(player.lastname);
                                        ds.clubplayerbirth.val(player.birth);
                                        ds.clubplayernationality.val(player.nationality);
                                        ds.clubplayerheight.val(player.height);
                                        ds.clubplayerweight.val(player.weight);
                                        ds.clubplayerclub.val(player.clubname);
                                        ds.clubplayervalue.val(player.value);
                                        ds.clubplayerpassport.val(player.passport);
                                        ds.clubplayerpassportval.val(player.passportval);
                                        
                                        controls.feedback.bind({ type: 'success', message: 'Dados do jogador atualizados com sucesso' });
                                        $("[data-dismiss=modal]").trigger({ type: "click" });
                                        //$('body').trigger('click');

                                    } else {
                                        controls.message.bind({ type: 'error', message: 'O jogador não existe.' });
                                    };
                                }, function () {
                                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                }, function () {
                                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                });
                            });  
                        });
                    });
                });
            });
        },
        init: function() {
            var me = this;
            me.datasource.base = this;
            me.methods.base = this;
            me.load();
        }
    };
    club.init();
};

function mandates(args) {
    var mandates = {
        design: {
            //DADOS DO CONTRATO
            mandateplayerfirstname: $('.txtPlayerMandatesFirstName'),
            mandateplayerlastname: $('.txtPlayerMandatesLastName'),
            mandateplayerclub: $('.txtPlayerMandatesClub'),
            mandateplayervalue: $('.txtPlayerMandatesValue'),
            mandateplayerpassport: $('.txtPlayerMandatesPassport'),
            mandateplayerpassportval: $('.txtPlayerMandatesPassportVal'),
            mandateagentfirstname: $('.txtAgentMandatesFirstName'),
            mandateagentlastname: $('.txtAgentMandatesLastName'),
            mandateagentclub: $('.txtAgentMandatesClub'),
            mandateagentcountry: $('.txtAgentMandatesCountry'),
            mandateagentpassport: $('.txtAgentMandatesPassport'),
            mandateagentpassportval: $('.txtAgentMandatesPassportVal'),

            //NOVO JOGADOR
            mandateplayerclubnew: $('div.ddlPlayerClubNewMandate'),
            mandateplayernamenew: $('.txtPlayerNameNewMandate'),
            mandateplayerfirstnamenew: $('.txtPlayerFirstNameNewMandate'),
            mandateplayerlastnamenew: $('.txtPlayerLastNameNewMandate'),
            mandateplayerbirthnew: $('.txtPlayerBirthNewMandate'),
            mandateplayernationalitynew: $('.txtPlayerNationalityNewMandate'),
            mandateplayerheightnew: $('.txtPlayerHeightNewMandate'),
            mandateplayerweightnew: $('.txtPlayerWeightNewMandate'),
            mandateplayerpositionnew: $('div.ddlPlayerFootNewMandate'),
            mandateplayerfootnew: $('div.ddlPlayerPositionNewMandate'),
            mandateplayervaluenew: $('.txtPlayerValueNewMandate'),
            mandateplayerpassportnew: $('.txtPlayerPassportNewMandate'),
            mandateplayerpassportvalnew: $('.txtPlayerPassportValNewMandate'),

            //EDITAR JOGADOR
            mandateplayernameedit: $('.txtPlayerNameEditMandate'),
            mandateplayerfirstnameedit: $('.txtPlayerFirstNameEditMandate'),
            mandateplayerlastnameedit: $('.txtPlayerLastNameEditMandate'),
            mandateplayerbirthedit: $('.txtPlayerBirthEditMandate'),
            mandateplayernationalityedit: $('.txtPlayerNationalityEditMandate'),
            mandateplayerheightedit: $('.txtPlayerHeightEditMandate'),
            mandateplayerweightedit: $('.txtPlayerWeightEditMandate'),
            mandateplayerpositionedit: $('div.ddlPlayerPositionEditMandate'),
            mandateplayerfootedit: $('div.ddlPlayerFootEditMandate'),
            mandateplayerclubedit: $('div.ddlPlayerClubEditMandate'),
            mandateplayervalueedit: $('.txtPlayerValueEditMandate'),
            mandateplayerpassportedit: $('.txtPlayerPassportEditMandate'),
            mandateplayerpassportvaledit: $('.txtPlayerPassportValEditMandate'),

            //NOVO AGENTE
            mandateagentclubnew: $('.txtAgentClubNewMandate'),
            mandateagentnamenew: $('.txtAgentNewMandate'),
            mandateagentfirstnamenew: $('.txtAgentFirstNameNewMandate'),
            mandateagentlastnamenew: $('.txtAgentLastNameNewMandate'),
            mandateagentbirthnew: $('.txtAgentBirthNewMandate'),
            mandateagentnationalitynew: $('.txtAgentnationalityNewMandate'),
            mandateagentcompanynew: $('.txtAgentCompanyNewMandate'),
            mandateagentcountrynew: $('.txtAgentCountryNewMandate'),
            mandateagentcontactnew: $('.txtAgentContactNewMandate'),
            mandateagentobsnew: $('.txtAgentObsNewMandate'),
            mandateagentpassportnew: $('.txtAgentPassportNewMandate'),
            mandateagentpassportvalnew: $('.txtAgentPassporValNewMandate'),

            //EDITAR AGENTE
            mandateagentclubedit: $('.txtAgentClubEditMandate'),
            mandateagentnameedit: $('.txtAgentEditMandate'),
            mandateagentfirstnameedit: $('.txtAgentFirstNameEditMandate'),
            mandateagentlastnameedit: $('.txtAgentLastNameEditMandate'),
            mandateagentbirthedit: $('.txtAgentBirthEditMandate'),
            mandateagentnationalityedit: $('.txtAgentNationalityEditMandate'),
            mandateagentcompanyedit: $('.txtAgentCompanyEditMandate'),
            mandateagentcountryedit: $('.txtAgentCountryEditMandate'),
            mandateagentcontactedit: $('.txtAgentContactEditMandate'),
            mandateagentobsedit: $('.txtAgentObsEditMandate'),
            mandateagentpassportedit: $('.txtAgentPassportEditMandate'),
            mandateagentpassportvaledit: $('.txtAgentPassportValEditMandate'),
            
            //INSERIR MANDATO
            mandateplayer: $('select.ddlMandatePlayer'),
            mandatecoach: $('select.ddlMandateCoach'),
            mandateagent: $('select.ddlMandateAgent'),
            mandatedatestart: $('.txtMandatesDateStart'),
            mandatedateend: $('.txtMandatesDateEnd'),
            mandatecompany: $('.txtMandatesCompany'),
            mandatecountry: $('.txtMandatesCountry'),
            mandateclub: $('.txtMandatesClub'),
            mandateobs: $('.txtMandatesObs'),
            ctrfiles: $('.ctrFiles'), //anexos
            ctruploader: $('.ctrUploader'), //anexos

            //BOTÕES
            savemandates: $('.btnSaveMandates'),

            saveeditplayermandate: $('.btnSavePlayerEditMandate'),
            savenewplayermandate: $('.btnSavePlayerNewMandate'),
            addnewplayermandate: $('.addNewPlayerMandate'),
            editplayermandate: $('.editPlayerMandate'),

            saveeditagentmandate: $('.btnSaveAgentEditMandate'),
            savenewagentmandate: $('.btnSaveAgentNewMandate'),
            addnewagentmandate: $('.addNewAgentMandate'),
            editagentmandate: $('.editAgentMandate')
        },
        datasource: {
            base: undefined,
            id: ifUndefinedOrNull(args.data.mandates_id, 0),
            mandates: undefined,
            clubs: new Array(),
            attachments: new Array(), //anexos
            selectedattachments: new Array() //anexos
        },
        methods: {
            base: undefined,
            getmandates: function (after) {
                var me = this.base;

                //[ GET mandates ]
                if (ifUndefinedOrNull(me.datasource.id, 0) > 0) {
                    controls.ajax({
                        functionname: 'mandate',
                        data: {
                            mandates_id: ifUndefinedOrNull(me.datasource.id, 0)
                        }
                    }, function (data) {
                        //[ SET list_mandates LIST ]
                        me.datasource.mandates = data.mandate;
                        me.datasource.agents_clubs = ifUndefinedOrNull(data.agents_clubs, new Array());
                        me.datasource.all_clubs = ifUndefinedOrNull(data.all_clubs, new Array());


                        if (!isUndefinedOrNull(after)) { after(); };
                    }, function () {
                        //[ ERROR ]
                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                    }, function () {
                        //[ ERROR ]
                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                    });
                } else {
                    me.datasource.mandates = args.mandates;
                    if (!isUndefinedOrNull(after)) { after(); };
                };
            },
            getclubs: function (after) {
                var me = this.base;

                controls.ajax({
                    functionname: 'clubs_list',
                }, function (data) {
                    //[ SET list_player LIST ]
                    me.datasource.clubs = data.clubs;

                    if (!isUndefinedOrNull(after)) { after(); };
                }, function () {
                    //[ ERROR ]
                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                }, function () {
                    //[ ERROR ]
                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                });
            },
            getplayers: function (after) {
                var me = this.base;

                controls.ajax({
                    functionname: 'players',
                }, function (data) {
                    //[ SET list_player LIST ]
                    me.datasource.players = data.players;

                    if (!isUndefinedOrNull(after)) { after(); };
                }, function () {
                    //[ ERROR ]
                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                }, function () {
                    //[ ERROR ]
                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                });
            },
            getcoach: function (after) {
                var me = this.base;

                controls.ajax({
                    functionname: 'coaches',
                }, function (data) {
                    //[ SET list_player LIST ]
                    me.datasource.coaches = data.coaches;

                    if (!isUndefinedOrNull(after)) { after(); };
                }, function () {
                    //[ ERROR ]
                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                }, function () {
                    //[ ERROR ]
                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                });
            },
            getagent: function (after) {
                var me = this.base;

                controls.ajax({
                    functionname: 'agents',
                }, function (data) {
                    //[ SET list_player LIST ]
                    me.datasource.agents = data.agents;

                    if (!isUndefinedOrNull(after)) { after(); };
                }, function () {
                    //[ ERROR ]
                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                }, function () {
                    //[ ERROR ]
                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                });
            },
            downloadattachment: function (attachment) {
                if (!isStringVoid(attachment.file)) {
                    const downloadLink = document.createElement("a");

                    with (downloadLink) {
                        href = attachment.file;
                        download = attachment.file_name;
                        click();
                    };
                };
            },
            deleteattachment: function (id, after) {
                var me = this.base;

                //[ DELETE ATTACHMENT ]
                if (ifUndefinedOrNull(me.datasource.id, 0) > 0) {
                    controls.message.bind({
                        type: 'question',
                        message: 'Pretende remover o documento selecionado?',
                        afteryes: function () {
                            controls.ajax({
                                functionname: 'delete_attachment_mandate',
                                data: {
                                    id: id
                                }
                            }, function (data) {
                                if (ifUndefinedOrNull(data.success, false)) {
                                    controls.message.bind({
                                        type: 'success',
                                        message: 'O documento foi removido com sucesso.',
                                        afterok: function () {
                                            if (!isUndefinedOrNull(after)) { after(data); };
                                        }
                                    });
                                } else {
                                    controls.message.bind({ type: 'error', message: 'Ocorreu um erro ao remover o anexo, por favor tente novamente.' });
                                };
                            }, function () {
                                controls.feedback.bind({ type: 'error', message: 'Ocorreu um erro ao remover o anexo, por favor tente novamente.' });
                            }, function () {
                                controls.feedback.bind({ type: 'error', message: 'Ocorreu um erro ao remover o anexo, por favor tente novamente.' });
                            });
                        }
                    });
                };
            },
        },
        load: function() {
            var me = this,
                ds = me.design;  
                
            me.methods.getmandates(function(){
                me.methods.getclubs(function(){
                    me.methods.getplayers(function(){
                        me.methods.getcoach(function(){
                            me.methods.getagent(function(){
                                var mandates = me.datasource.mandates,
                                    clubs = me.datasource.clubs;

                                ds.mandateplayer.append('<option value="0">Selecionar</option>');
                                $.each(me.datasource.players, function (index, player) {
                                    ds.mandateplayer.append('<option value="{0}">{1} {2}</option>'.format(player.id, player.firstname, player.lastname));
                                    
                                });

                                ds.mandatecoach.append('<option value="0">Selecionar</option>');
                                $.each(me.datasource.coaches, function (index, coach) {
                                    ds.mandatecoach.append('<option value="{0}">{1} {2}</option>'.format(coach.id, coach.firstname, coach.lastname));
                                    
                                });

                                ds.mandateagent.append('<option value="0">Selecionar</option>');
                                $.each(me.datasource.agents, function (index, agents) {
                                    ds.mandateagent.append('<option value="{0}">{1} {2}</option>'.format(agents.id, agents.firstname, agents.lastname));
                                    
                                });

                                //anexos
                                ds.uploader = new FileDropzone({
                                    target: ds.ctruploader.find('#box'),
                                    clickable: true,
                                    multiple: true,
                                    forceReplace: false,
                                    paramName: 'my-file',
                                    accept: '.jpeg, .jpg, .gif, .bmp, .tiff, .png, .pdf, .docx, .doc, .xlsx, .xls, .csv',
                                    onChange: function () {
                                        var files = new Array(),
                                            elem = this.element.find('.files');

                                        elem.empty();

                                        $.each(ifUndefinedOrNull(this.getFiles(), new Array()), function (index, file) {
                                            var isnewfile = ifUndefinedOrNull(files, new Array()).filter(function (a) { return (a.name.toLowerCase() == file.name.toLowerCase()); }).length == 0,
                                                idvalidsize = (file.size <= 10485760); //[ MAX: 10 MB ]

                                            if (isnewfile && idvalidsize) {
                                                files.push(file);
                                            };
                                        });

                                        ds.uploader.clickable = false;

                                        $.each(ifUndefinedOrNull(files, new Array()), function (index, item) {
                                            var reader = new FileReader(),
                                                element = $('<div class="file-name"><div class="row"><div class="remove" style="padding-right: 10px;" data="{1}"><i class="grid-action fa fa-trash" style="color:#3282b8"></i></div>{0}</div></div>'.format(item.name, index));

                                            reader.addEventListener('load', function (e) {
                                                var isnewfile = ifUndefinedOrNull(me.datasource.selectedattachments, new Array()).filter(function (a) { return (a.AttachmentName.toLowerCase() == item.name.toLowerCase()); }).length == 0;

                                                if (isnewfile) {
                                                    var messageattachment = {
                                                            Attachment: null,
                                                            AttachmentName: null,
                                                            ID: 0,
                                                            MandateID: 0
                                                        },
                                                        url;

                                                    messageattachment.index = index;

                                                    if (item.type.split('/')[0] === 'image') {
                                                        var image = new Image();

                                                        //[ RESIZE IMAGE ]
                                                        image.onload = function () {
                                                            var canvas = document.createElement("canvas"),
                                                                context = canvas.getContext("2d");

                                                            canvas.width = image.width / 4;
                                                            canvas.height = image.height / 4;
                                                            context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);

                                                            with (messageattachment) {
                                                                Attachment = canvas.toDataURL();
                                                                AttachmentName = item.name;
                                                            };

                                                            me.datasource.selectedattachments.push(messageattachment);
                                                        };

                                                        image.src = e.target.result;
                                                    } else {
                                                        with (messageattachment) {
                                                            Attachment = reader.result;
                                                            AttachmentName = item.name;
                                                        };

                                                        me.datasource.selectedattachments.push(messageattachment);
                                                    };
                                                };
                                            }, false);

                                            if (!isUndefinedOrNull(item)) { reader.readAsDataURL(item); };

                                            //[ REMOVE ]
                                            element.find('.remove[data={0}]'.format(index)).on('click', function (e) {
                                                var id = $(this).attr('data');

                                                me.datasource.selectedattachments.removeField('index', id);
                                                $(this).parent().remove();

                                                if (me.datasource.selectedattachments.length == 0) {
                                                    ds.uploader.clearAll();

                                                    elem.html(controls.resources.attachment_upload_info);

                                                    setTimeout(function () {
                                                        ds.uploader.clickable = true;
                                                    }, 1000);
                                                };

                                                e.preventDefault();
                                            });

                                            elem.append(element);
                                        });

                                        if (ifUndefinedOrNull(files, new Array()).length == 0) {
                                            with (ds.uploader.element.find('.files')) {
                                                empty();
                                                addClass('dz-default dz-message');
                                            };
                                        } else {
                                            with (ds.uploader.element.find('.files')) {
                                                removeClass('dz-default dz-message');
                                            };
                                        };
                                    }
                                });

                                ds.mandateagent.on('change', function(){
                                    var agentid = ds.mandateagent.find('option:selected').val(),
                                        agent_club = me.datasource.all_clubs.filter(function(ac){ return (ac.id_agent == parseInt(agentid)); }),
                                        club = '',
                                        country = '';

                                    if (ifUndefinedOrNull(agent_club, new Array).length > 0) {
                                        $.each(agent_club, function (index, ac) {
                                            if (country.indexOf(ac.club_name) == -1) {
                                                if(index > 0) {
                                                    club += ', ';
                                                }
            
                                                club += ac.club_name;
                                            };
            
                                            if (country.indexOf(ac.country_name) == -1) {
                                                if(index > 0) {
                                                    country += ', ';
                                                }
            
                                                country += ac.country_name;
                                            };
                                        });
                                    }

                                    ds.mandateagentclub.val(club);
                                    ds.mandateagentcountry.val(country);

                                    ds.mandatecountry.val(country);
                                    ds.mandateclub.val(club);
                                });

                                //EDITAR MANDATO
                                if (mandates.id > 0) {
                                    var agent_club = me.datasource.agents_clubs.filter(function(ac){ return (ac.id_agent == mandates.agentid); }),
                                    club = '',
                                    country = '';

                                    if (ifUndefinedOrNull(agent_club, new Array).length > 0) {
                                        $.each(agent_club, function (index, ac) {
                                            if (country.indexOf(ac.club_name) == -1) {
                                                if(index > 0) {
                                                    club += ', ';
                                                }

                                                club += ac.club_name;
                                            };

                                            if (country.indexOf(ac.country_name) == -1) {
                                                if(index > 0) {
                                                    country += ', ';
                                                }

                                                country += ac.country_name;
                                            };
                                        });
                                    }

                                    ds.mandateplayer.val(mandates.player);
                                    ds.mandateplayer.trigger('change');  
                                    ds.mandateagent.val(mandates.agentid);
                                    ds.mandateagent.trigger('change');
                                    ds.mandateplayerfirstname.val(mandates.playerfirstname);
                                    ds.mandateplayerlastname.val(mandates.playerlastname);
                                    ds.mandateplayerclub.val(mandates.playerclubname);
                                    ds.mandateplayervalue.val(mandates.playervalue);
                                    ds.mandateplayerpassport.val(mandates.playerpassport);
                                    ds.mandateplayerpassportval.val(mandates.playerpassportval);

                                    ds.mandateagentfirstname.val(mandates.agentfirstname);
                                    ds.mandateagentlastname.val(mandates.agentlastname);
                                    ds.mandatecompany.val(mandates.agentcompany)
                                    ds.mandateagentclub.val(club);
                                    ds.mandateagentcountry.val(country);
                                    ds.mandateagentpassport.val(mandates.agentpassport);
                                    ds.mandateagentpassportval.val(mandates.agentpassportval);
                                    

                                    ds.mandatedatestart.val(mandates.datestart);
                                    ds.mandatedateend.val(mandates.dateend);
                                    ds.mandatecompany.val(mandates.agentcompany);
                                    ds.mandatecountry.val(country);
                                    ds.mandateclub.val(club);
                                    ds.mandateobs.val(mandates.obs);

                                    $('.titleMandate').html('EDITAR MANDATO');

                                    //anexos
                                    if (ifUndefinedOrNull(me.datasource.attachments, new Array()).length > 0) {
                                        $.each(me.datasource.attachments, function (index, attachment) {
                                            var filename = attachment.file_name,
                                                lastindex = filename.lastIndexOf('.'),
                                                html = $('<div class="file-name" data="{0}"><div class="row"><div class="actions" style="padding-right: 10px;"><div class="row"><div class="delete" style="padding-right: 10px;" data="{0}"><i class="grid-action fa fa-trash" style="color:#3282b8"> </i></div><div class="download" data="{0}"><i class="grid-action fa fa-download" style="color:#3282b8"></i></div></div></div>{1}</div></div>'.format(attachment.id, attachment.file_name, filename.substring(lastindex, filename.length)));
                                                    
                                                    
                                            with (html) {
                                                //[ DELETE FILE ]
                                                find('.delete').on('click', function (e) {
                                                    var element = $(this),
                                                        id = parseInt($(this).attr('data')),
                                                        parent = $(this).parents('.file-name');

                                                    me.methods.deleteattachment(id, function () {
                                                        //[ REMOVE ATTACHMENT FROM ARRAY ]
                                                        me.datasource.attachments.removeField('id', id);

                                                        //[ REMOVE ATTACHMENT HTML ]
                                                        parent.remove();

                                                        if (ifUndefinedOrNull(me.datasource.attachments, new Array()).length == 0){
                                                            ds.ctrfiles.remove();
                                                        }
                                                    });
                                                    e.preventDefault();
                                                });

                                                //[ DOWNLOAD FILE ]
                                                find('.download').on('click', function (e) {
                                                    var id = parseInt($(this).attr('data')),
                                                        selectedfile = me.datasource.attachments.filter(function (a) { return (a.id == id); })[0];

                                                    me.methods.downloadattachment(selectedfile);
                                                    e.preventDefault();
                                                });
                                            };

                                            ds.ctrfiles.find('.files').append(html);
                                        });
                                    } else {
                                        ds.ctrfiles.remove();
                                    };

                                    //DADOS MANDATO
                                    ds.savemandates.on('click', function(){
                                        var mandates = me.datasource.mandates;
                    
                                        with(mandates) {
                                            id = mandates.id;
                                            player = ds.mandateplayer.find('option:selected').val();
                                            agentid = ds.mandateagent.find('option:selected').val();
                                            datestart = ds.mandatedatestart.val();
                                            dateend = ds.mandatedateend.val();
                                            obs = ds.mandateobs.val();
                                        };

                                        //anexos
                                        if (ifUndefinedOrNull(me.datasource.selectedattachments, new Array()).length > 0) {
                                            $.each(me.datasource.selectedattachments, function (index, attachment) {
                                                attachment.MandateID = mandates.id;
                                            });
                                        };
                    
                                        controls.ajax({
                                            functionname: 'update_mandates',
                                            data: {
                                                mandates: mandates,
                                                attachments: me.datasource.selectedattachments//anexos
                                            }
                                        }, function (data) {
                                            if (ifUndefinedOrNull(data.success, false)) {
                                                controls.feedback.bind({ type: 'success', message: 'Mandato editado com sucesso' });
                                                window.open('mandates_list.php', '_self');
                                            } else {
                                                controls.message.bind({ type: 'error', message: 'Não foi possível editar o mandato.' });
                                            };
                                        }, function () {
                                            controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                        }, function () {
                                            controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                        });
                                    });

                                    ds.addnewplayermandate.remove();
                                    ds.addnewagentmandate.remove();
                                } else {
                                    ds.ctrfiles.remove(); //anexos

                                    //INSERIR NOVO MANDATO JOGADOR
                                    ds.savemandates.on('click', function(){
                                        var mandates = me.datasource.mandates;
                    
                                        with(mandates) {
                                            player = ds.mandateplayer.find('option:selected').val();
                                            agentid = ds.mandateagent.find('option:selected').val();
                                            datestart = ds.mandatedatestart.val();
                                            dateend = ds.mandatedateend.val();
                                            obs = ds.mandateobs.val();
                                        };
                    
                                        controls.ajax({
                                            functionname: 'insert_mandates',
                                            data: {
                                                mandates: mandates,
                                                attachments: me.datasource.selectedattachments//anexos
                                            }
                                        }, function (data) {
                                            if (ifUndefinedOrNull(data.success, false)) {
                                                controls.feedback.bind({ type: 'success', message: 'Mandato adicionado com sucesso.' });
                                                window.open('mandates_list.php', '_self');
                                            } else {
                                                controls.message.bind({ type: 'error', message: 'Nao foi possível adicionar o mandato.' });
                                            };
                                        }, function () {
                                            controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                        }, function () {
                                            controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                        });
                                    });

                                    //INSERIR NOVO MANDATO TREINADOR
                                    ds.savemandates.on('click', function(){
                                        var mandates = me.datasource.mandates;
                    
                                        with(mandates) {
                                            coach = ds.mandatecoach.find('option:selected').val();
                                            agentid = ds.mandateagent.find('option:selected').val();
                                            datestart = ds.mandatedatestart.val();
                                            dateend = ds.mandatedateend.val();
                                            obs = ds.mandateobs.val();
                                        };
                    
                                        controls.ajax({
                                            functionname: 'insert_mandates_coach',
                                            data: {
                                                mandates: mandates,
                                                attachments: me.datasource.selectedattachments//anexos
                                            }
                                        }, function (data) {
                                            if (ifUndefinedOrNull(data.success, false)) {
                                                controls.feedback.bind({ type: 'success', message: 'Mandato adicionado com sucesso.' });
                                                window.open('mandates_list.php', '_self');
                                            } else {
                                                controls.message.bind({ type: 'error', message: 'Nao foi possível adicionar o mandato.' });
                                            };
                                        }, function () {
                                            controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                        }, function () {
                                            controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                        });
                                    });

                                    //ADICIONAR JOGADOR
                                    ds.addnewplayermandate.on('click', function(){
                                        ds.mandateplayerclubnew.val('');
                                        ds.mandateplayernamenew.val('');
                                        ds.mandateplayerfirstnamenew.val('');
                                        ds.mandateplayerlastnamenew.val('');
                                        ds.mandateplayerbirthnew.val('');
                                        ds.mandateplayernationalitynew.val('');
                                        ds.mandateplayerheightnew.val('');
                                        ds.mandateplayerweightnew.val('');
                                        ds.mandateplayerfootnew.find('span.cs-placeholder').html();
                                        ds.mandateplayerpositionnew.find('span.cs-placeholder').html();
                                        ds.mandateplayervaluenew.val('');
                                        ds.mandateplayerpassportnew.val('');
                                        ds.mandateplayerpassportvalnew.val('');
                                    });

                                    //BOTAO DE SALVAR ADICIONAR JOGADOR
                                    ds.savenewplayermandate.on('click', function(){
                                        var player = args.player;       
                                        
                                        with(player) {
                                            name = ds.mandateplayernamenew.val();
                                            firstname = ds.mandateplayerfirstnamenew.val();
                                            lastname = ds.mandateplayerlastnamenew.val();
                                            birth = ds.mandateplayerbirthnew.val();
                                            nationality = ds.mandateplayernationalitynew.val();
                                            height = ds.mandateplayerheightnew.val();
                                            weight = ds.mandateplayerweightnew.val();
                                            foot = ds.mandateplayerfootnew.find('span.cs-placeholder').html();
                                            position = ds.mandateplayerpositionnew.find('span.cs-placeholder').html();
                                            value = ds.mandateplayervaluenew.val();
                                            passport = ds.mandateplayerpassportnew.val();
                                            passportval = ds.mandateplayerpassportvalnew.val();
                                        };

                                        controls.ajax({
                                            functionname: 'insert_player',
                                            data: {
                                                player: player
                                            }
                                        }, function (data) {
                                            if (ifUndefinedOrNull(data.success, false)) {

                                                //MOSTRAR DADOS ALTERADOS
                                                ds.mandateplayerclub.val(player.clubname);
                                                ds.mandateplayerfirstname.val(player.firstname);
                                                ds.mandateplayerlastname.val(player.lastname);
                                                ds.mandateplayervalue.val(player.value);
                                                ds.mandateplayerpassport.val(player.passport);
                                                ds.mandateplayerpassportval.val(player.passportval);
                                                
                                                controls.feedback.bind({ type: 'success', message: 'Jogador adicionado com sucesso' });
                                                $("[data-dismiss=modal]").trigger({ type: "click" });
                                                //$('body').trigger('click');
                                                
                                            } else {
                                                controls.message.bind({ type: 'error', message: 'Jogador não adicionado com sucesso.' });
                                            };
                                        }, function () {
                                            controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                        }, function () {
                                            controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                        });
                                    });

                                    //ADICIONAR AGENTE
                                    ds.addnewagentmandate.on('click', function(){
                                        ds.mandateagentclubnew.val('');
                                        ds.mandateagentnamenew.val('');
                                        ds.mandateagentfirstnamenew.val('');
                                        ds.mandateagentlastnamenew.val('');
                                        ds.mandateagentbirthnew.val('');
                                        ds.mandateagentnationalitynew.val('');
                                        ds.mandateagentpassportnew.val('');
                                        ds.mandateagentpassportvalnew.val('');
                                        ds.mandateagentcompanynew.val('');
                                        ds.mandateagentcountrynew.val('');
                                        ds.mandateagentcontactnew.val('');
                                        ds.mandateagentobsnew.val('');
                                    });
                                    
                                    //BOTAO DE SALVAR ADICIONAR JOGADOR
                                    ds.savenewagentmandate.on('click', function(){
                                        var agent = args.agent;       
                                        
                                        with(agent) {
                                            name = ds.mandateagentnamenew.val();
                                            firstname = ds.mandateagentfirstnamenew.val();
                                            lastname = ds.mandateagentlastnamenew.val();
                                            birth = ds.mandateagentbirthnew.val();
                                            nationality = ds.mandateagentnationalitynew.val();
                                            passport = ds.mandateagentpassportnew.val();
                                            passportval = ds.mandateagentpassportvalnew.val();
                                            agentcompany = ds.mandateagentcompanynew.val();
                                            country = ds.mandateagentcountrynew.val();
                                            contacts = ds.mandateagentcontactnew.val();
                                            obs = ds.mandateagentobsnew.val();
                                        };

                                        controls.ajax({
                                            functionname: 'insert_agent',
                                            data: {
                                                agent: agent
                                            }
                                        }, function (data) {
                                            if (ifUndefinedOrNull(data.success, false)) {

                                                //MOSTRAR DADOS ALTERADOS
                                                ds.mandateagentclub.val(agent.clubname);
                                                ds.mandateagentfirstname.val(agent.firstname);
                                                ds.mandateagentlastname.val(agent.lastname);
                                                ds.mandateagentcountry.val(agent.country);
                                                ds.mandateagentpassport.val(agent.passport);
                                                ds.mandateagentpassportval.val(agent.passportval);
                                                ds.mandatecompany.val(agent.agentcompany);
                                                
                                                controls.feedback.bind({ type: 'success', message: 'Jogador adicionado com sucesso' });
                                                $("[data-dismiss=modal]").trigger({ type: "click" });
                                                //$('body').trigger('click');
                                                
                                            } else {
                                                controls.message.bind({ type: 'error', message: 'Jogador não adicionado com sucesso.' });
                                            };
                                        }, function () {
                                            controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                        }, function () {
                                            controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                        });
                                    });

                                    ds.editplayermandate.remove();
                                    ds.editagentmandate.remove();
                                };

                                //EDITAR DADOS DO JOGADOR
                                ds.editplayermandate.on('click', function(){
                                    ds.mandateplayerclubedit.val(mandates.playerclubname);
                                    ds.mandateplayernameedit.val(mandates.playername);
                                    ds.mandateplayerfirstnameedit.val(mandates.playerfirstname);
                                    ds.mandateplayerlastnameedit.val(mandates.playerlastname);
                                    ds.mandateplayerbirthedit.val(mandates.playerbirth);
                                    ds.mandateplayernationalityedit.val(mandates.playernationality);
                                    ds.mandateplayerheightedit.val(mandates.playerheight);
                                    ds.mandateplayerweightedit.val(mandates.playerweight);
                                    ds.mandateplayerfootedit.find('span.cs-placeholder').html();
                                    ds.mandateplayerpositionedit.find('span.cs-placeholder').html();
                                    ds.mandateplayervalueedit.val(mandates.playervalue);
                                    ds.mandateplayerpassportedit.val(mandates.playerpassport);
                                    ds.mandateplayerpassportvaledit.val(mandates.playerpassportval);
                                });

                                //BOTAO DE SALVAR EDIÇÃO DE JOGADOR
                                ds.saveeditplayermandate.on('click', function(){
                                    var player = args.player;       
                                    
                                    with(player) {
                                        id = mandates.player;
                                        name = ds.mandateplayernameedit.val();
                                        firstname = ds.mandateplayerfirstnameedit.val();
                                        lastname = ds.mandateplayerlastnameedit.val();
                                        birth = ds.mandateplayerbirthedit.val();
                                        nationality = ds.mandateplayernationalityedit.val();
                                        height = ds.mandateplayerheightedit.val();
                                        weight = ds.mandateplayerweightedit.val();
                                        foot = ds.mandateplayerfootedit.find('span.cs-placeholder').html();
                                        position = ds.mandateplayerpositionedit.find('span.cs-placeholder').html();
                                        value = ds.mandateplayervalueedit.val();
                                        passport = ds.mandateplayerpassportedit.val();
                                        passportval = ds.mandateplayerpassportvaledit.val();
                                    };

                                    controls.ajax({
                                        functionname: 'update_player',
                                        data: {
                                            player: player
                                        }
                                    }, function (data) {
                                        if (ifUndefinedOrNull(data.success, false)) {
                                            
                                            //MOSTRAR DADOS ALTERADOS
                                            ds.mandateplayerfirstname.val(player.firstname);
                                            ds.mandateplayerlastname.val(player.lastname);
                                            ds.mandateplayerclub.val(player.clubname);
                                            ds.mandateplayervalue.val(player.value);
                                            ds.mandateplayerpassport.val(player.passport);
                                            ds.mandateplayerpassportval.val(player.passportval);
                                            
                                            controls.feedback.bind({ type: 'success', message: 'Dados do jogador atualizados com sucesso' });
                                            $("[data-dismiss=modal]").trigger({ type: "click" });
                                            //$('body').trigger('click');

                                        } else {
                                            controls.message.bind({ type: 'error', message: 'Não foi possivel editar os dados do jogador.' });
                                        };
                                    }, function () {
                                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                    }, function () {
                                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                    });
                                });  

                                //EDITAR DADOS DO AGENTE
                                ds.editagentmandate.on('click', function(){
                                    ds.mandateagentclubedit.val(mandates.agentclubname);
                                    ds.mandateagentnameedit.val(mandates.agentname);
                                    ds.mandateagentfirstnameedit.val(mandates.agentfirstname);
                                    ds.mandateagentlastnameedit.val(mandates.agentlastname);
                                    ds.mandateagentbirthedit.val(mandates.agentbirth);
                                    ds.mandateagentnationalityedit.val(mandates.agentnationality);
                                    ds.mandateagentpassportedit.val(mandates.agentpassport);
                                    ds.mandateagentpassportvaledit.val(mandates.agentpassportval);
                                    ds.mandateagentcompanyedit.val(mandates.agentcompany);
                                    ds.mandateagentcountryedit.val(mandates.agentcountry);
                                    ds.mandateagentcontactedit.val(mandates.agentcontacts);
                                    ds.mandateagentobsedit.val(mandates.agentobs);
                                });

                                //BOTAO DE SALVAR EDIÇÃO DE AGENTE
                                ds.saveeditagentmandate.on('click', function(){
                                    var agent = args.agent;       
                                    
                                    with(agent) {
                                        id = mandates.agentid;
                                        name = ds.mandateagentnameedit.val();
                                        firstname = ds.mandateagentfirstnameedit.val();
                                        lastname = ds.mandateagentlastnameedit.val();
                                        birth = ds.mandateagentbirthedit.val();
                                        nationality = ds.mandateagentnationalityedit.val();
                                        passport = ds.mandateagentpassportedit.val();
                                        passportval = ds.mandateagentpassportvaledit.val();
                                        agentcompany = ds.mandateagentcompanyedit.val();
                                        country = ds.mandateagentcountryedit.val();
                                        contacts = ds.mandateagentcontactedit.val();
                                        obs = ds.mandateagentobsedit.val();
                                    };

                                    controls.ajax({
                                        functionname: 'update_agent',
                                        data: {
                                            agent: agent
                                        }
                                    }, function (data) {
                                        if (ifUndefinedOrNull(data.success, false)) {
                                            
                                            //MOSTRAR DADOS ALTERADOS
                                            ds.mandateagentfirstname.val(agent.firstname);
                                            ds.mandateagentlastname.val(agent.lastname);
                                            ds.mandateagentclub.val(agent.clubname);
                                            ds.mandateagentcountry.val(agent.agentcountry);
                                            ds.mandateagentpassport.val(agent.passport);
                                            ds.mandateagentpassportval.val(agent.passportval);
                                            
                                            controls.feedback.bind({ type: 'success', message: 'Dados do jogador atualizados com sucesso' });
                                            $("[data-dismiss=modal]").trigger({ type: "click" });
                                            //$('body').trigger('click');

                                        } else {
                                            controls.message.bind({ type: 'error', message: 'Não foi possivel editar os dados do jogador.' });
                                        };
                                    }, function () {
                                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                    }, function () {
                                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                    });
                                }); 
                            });
                        });
                    });
                });
            });
        },
        init: function() {
            var me = this;
            me.datasource.base = this;
            me.methods.base = this;
            me.load();
        }
    };
    mandates.init();
};

function list_player() { 
    var list_player = {
        design: {
            base: undefined,
            search: $('.grid-search input'),
            actions: {
                me: $('.main-content-actions'),
                add: $('.main-content-actions .add-list_player'),
            },
            grid: {
                me: $('.table'),
                rows: $('.table .row_player'),
                rowtemplate: $('<tr role="row_player" class="row_player"></tr>')
                // withoutresults: $('.grid-without-results')
            }
        },
        datasource: {
            base: undefined,
            list_player: new Array(),
            list_playerusers: new Array(),
            total: 0
        },
        methods: {
            base: undefined,
            actions: {
                base: undefined,
                edit: function (list_playerid) {
                    var me = this.base;

                    controls.post(me.datasource.detailpage, { player_id: list_playerid });
                },
                remove: function (playersids) {
                    var me = this.base;

                    //[ REMOVE list_player ]
                    if (ifUndefinedOrNull(playersids, new Array().length > 0)) {
                        controls.message.bind({
                            type: 'question',
                            message: 'Pretende remover os jogadores selecionados?',
                            afteryes: function () {
                                controls.ajax({
                                    functionname: 'delete_player',
                                    data: {
                                        players_ids: playersids
                                    }
                                }, function (data) {
                                    if (ifUndefinedOrNull(data.success, false)) {
                                        controls.message.bind({
                                            type: 'success',
                                            message: 'Jogador removido com sucesso',
                                            afterok: function () {
                                                //[ BIND list_player GRID ]
                                                me.methods.grid.bind();
                                            } 
                                        });
                                    } else {
                                        controls.message.bind({ type: 'error', message: 'Ocorreu um erro ao tentar remover os jogadores, por favor tente mais tarde.' });
                                    };
                                }, function () {
                                    //[ ERROR ]
                                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                }, function () {
                                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                });
                            }
                        });
                    };
                }
            }, 
            grid: {
                base: undefined,
                bind: function (parameters, after) {
                    var me = this.base,
                        ds = me.design.grid;

                    //[ GET list_player ]
                    controls.ajax({
                        functionname: 'players',
                        data: {
                            page: (!isUndefinedOrNull(parameters)) ? ifUndefinedOrNull(parameters.page, 1) : 1,
                            records: (!isUndefinedOrNull(parameters)) ? ifUndefinedOrNull(parameters.records, 10) : 10
                        }
                    }, function (data) {
                        //[ SET list_player LIST ]
                        me.datasource.list_player = ifUndefinedOrNull(data.players, new Array());
                        me.datasource.detailpage = ifUndefinedOrNull(data.detail_page, '');

                        if (data.total > 0) {
                            ds.me.slideDown();

                            //[ BIND ROWS ]
                            me.methods.grid.build(me.datasource.list_player);

                            //[ BIND PAGER ]
                            controls.pager.bind({
                                total: data.total_pages,
                                total_records: data.total,
                                current: data.current_page,
                                update: function (page) {
                                    me.methods.grid.bind({ page: page });
                                }
                            });
                        } else {
                            //[ SHOW WITHOUT RESULTS CONTENT ]
                            ds.me.slideUp();
                        };

                        if (!isUndefinedOrNull(after)) { after(data); };
                    }, function () {
                        //[ ERROR ]
                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                    }, function () {
                        //[ ERROR ]
                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                    });
                }, 
                build: function (datasource) {
                    var me = this.base,
                        ds = me.design.grid,
                        datasource = me.datasource.list_player;

                    //[ CLEAR GRID ]
                    ds.rows.children().remove();

                    //[ BIND ROWS ]
                    if (datasource.length > 0) {
                        $.each(datasource, function (index, list_player) {
                            var row = ds.rowtemplate.clone(),
                                actionscolumn = '<div class="actions" data="{1}">{0}</div>',
                                itemcolumn = '<td class="v-align-middle">{0}</td>';

                            with (row) {
                                //[ SAVE list_player ID ]
                                attr('data', list_player.id);

                                //[ OTHER COLUMNS ]
                                row.append(itemcolumn.format('<div class="checkbox text-center"><input type="checkbox" id="ckPlayer{0}" data="{0}"><label for="ckPlayer{0}" class="no-padding no-margin"></label></div>'.format(list_player.id)));
                                row.append(itemcolumn.format('{0} {1}'.format(list_player.firstname, list_player.lastname)));
                                row.append(itemcolumn.format(list_player.birth));
                                row.append(itemcolumn.format(list_player.nationality));
                                row.append(itemcolumn.format(list_player.position));
                                row.append(itemcolumn.format(list_player.clubname));
                                row.append(itemcolumn.format(list_player.value));
                            };

                            row.on('dblclick', function (e) {
                                me.methods.actions.edit($(this).attr('data'));
                                e.preventDefault();
                                e.stopPropagation();
                            });                           

                            ds.rows.append(row);
                        });

                        ds.me.find('.btn-remove').on('click', function (e) {
                            var selected = new Array();

                            $.each(ds.rows.find('.checkbox > input'), function (index, item) {
                                if($(item).is(':checked')) {
                                    selected.push(parseInt($(item).attr('data')));
                                }
                            });

                            if (ifUndefinedOrNull(selected, new Array()).length > 0) {
                                me.methods.actions.remove(selected);
                            };
                            e.preventDefault();
                            e.stopPropagation();
                        });
                    };
                },
            },
        }, 
        load: function () {
            var me = this,
                ds = me.design.actions;

            //[ BIND list_player GRID ]
            me.methods.grid.bind();
        },
        init: function () {
            var me = this;

            this.design.base = this;
            this.datasource.base = this;

            this.methods.base = this;
            this.methods.actions.base = this;
            this.methods.grid.base = this;

            this.load();

            return this;
        }
    };
 
    return list_player.init();
};

function list_coach() { 
    var list_coach = {
        design: {
            base: undefined,
            search: $('.grid-search input'),
            actions: {
                me: $('.main-content-actions'),
                add: $('.main-content-actions .add-list_coach'),
            },
            grid: {
                me: $('.table'),
                rows: $('.table .row_coach'),
                rowtemplate: $('<tr role="row_coach" class="row_coach"></tr>')
                // withoutresults: $('.grid-without-results')
            }
        },
        datasource: {
            base: undefined,
            list_coach: new Array(),
            list_coachusers: new Array(),
            total: 0
        },
        methods: {
            base: undefined,
            actions: {
                base: undefined,
                edit: function (list_coachid) {
                    var me = this.base;

                    controls.post(me.datasource.detailpage, { coach_id: list_coachid });
                },
                remove: function (coachesids) {
                    var me = this.base;

                    //[ REMOVE list_coach ]
                    if (ifUndefinedOrNull(coachesids, new Array().length > 0)) {
                        controls.message.bind({
                            type: 'question',
                            message: 'Pretende remover os jogadores selecionados?',
                            afteryes: function () {
                                controls.ajax({
                                    functionname: 'delete_coach',
                                    data: {
                                        coaches_ids: coachesids
                                    }
                                }, function (data) {
                                    if (ifUndefinedOrNull(data.success, false)) {
                                        controls.message.bind({
                                            type: 'success',
                                            message: 'Os jogadores foram removidos com sucesso',
                                            afterok: function () {
                                                //[ BIND list_coach GRID ]
                                                me.methods.grid.bind();
                                            }
                                        });
                                    } else {
                                        controls.message.bind({ type: 'error', message: 'Ocorreu um erro ao tentar remover os jogadores, por favor tente mais tarde.' });
                                    };
                                }, function () {
                                    //[ ERROR ]
                                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                }, function () {
                                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                });
                            }
                        });
                    };
                }
            }, 
            grid: {
                base: undefined,
                bind: function (parameters, after) {
                    var me = this.base,
                        ds = me.design.grid;

                    //[ GET list_coach ]
                    controls.ajax({
                        functionname: 'coaches',
                        data: {
                            page: (!isUndefinedOrNull(parameters)) ? ifUndefinedOrNull(parameters.page, 1) : 1,
                            records: (!isUndefinedOrNull(parameters)) ? ifUndefinedOrNull(parameters.records, 10) : 10
                        }
                    }, function (data) {
                        //[ SET list_coach LIST ]
                        me.datasource.list_coach = ifUndefinedOrNull(data.coaches, new Array());
                        me.datasource.detailpage = ifUndefinedOrNull(data.detail_page, '');

                        if (data.total > 0) {
                            ds.me.slideDown();

                            //[ BIND ROWS ]
                            me.methods.grid.build(me.datasource.list_coach);

                            //[ BIND PAGER ]
                            controls.pager.bind({
                                total: data.total_pages,
                                total_records: data.total,
                                current: data.current_page,
                                update: function (page) {
                                    me.methods.grid.bind({ page: page });
                                }
                            });
                        } else {
                            //[ SHOW WITHOUT RESULTS CONTENT ]
                            ds.me.slideUp();
                        };

                        if (!isUndefinedOrNull(after)) { after(data); };
                    }, function () {
                        //[ ERROR ]
                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                    }, function () {
                        //[ ERROR ]
                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                    });
                }, 
                build: function (datasource) {
                    var me = this.base,
                        ds = me.design.grid,
                        datasource = me.datasource.list_coach;

                    //[ CLEAR GRID ]
                    ds.rows.children().remove();

                    //[ BIND ROWS ]
                    if (datasource.length > 0) {
                        $.each(datasource, function (index, list_coach) {
                            var row = ds.rowtemplate.clone(),
                                actionscolumn = '<div class="actions" data="{1}">{0}</div>',
                                itemcolumn = '<td class="v-align-middle">{0}</td>';

                            with (row) {
                                //[ SAVE list_coach ID ]
                                attr('data', list_coach.id);

                                //[ OTHER COLUMNS ]
                                row.append(itemcolumn.format('<div class="checkbox text-center"><input type="checkbox" id="ckcoach{0}" data="{0}"><label for="ckcoach{0}" class="no-padding no-margin"></label></div>'.format(list_coach.id)));
                                row.append(itemcolumn.format('{0} {1}'.format(list_coach.firstname, list_coach.lastname)));
                                row.append(itemcolumn.format(list_coach.birth));
                                row.append(itemcolumn.format(list_coach.nationality));
                                row.append(itemcolumn.format(list_coach.formation));
                                row.append(itemcolumn.format(list_coach.clubname));
                                row.append(itemcolumn.format(list_coach.value));
                            };

                            row.on('dblclick', function (e) {
                                me.methods.actions.edit($(this).attr('data'));
                                e.preventDefault();
                                e.stopPropagation();
                            });                           

                            ds.rows.append(row);
                        });

                        ds.me.find('.btn-remove').on('click', function (e) {
                            var selected = new Array();

                            $.each(ds.rows.find('.checkbox > input'), function (index, item) {
                                if($(item).is(':checked')) {
                                    selected.push(parseInt($(item).attr('data')));
                                }
                            });

                            if (ifUndefinedOrNull(selected, new Array()).length > 0) {
                                me.methods.actions.remove(selected);
                            };
                            e.preventDefault();
                            e.stopPropagation();
                        });
                    };
                },
            },
        }, 
        load: function () {
            var me = this,
                ds = me.design.actions;

            //[ BIND list_coach GRID ]
            me.methods.grid.bind();
        },
        init: function () {
            var me = this;

            this.design.base = this;
            this.datasource.base = this;

            this.methods.base = this;
            this.methods.actions.base = this;
            this.methods.grid.base = this;

            this.load();

            return this;
        }
    };
 
    return list_coach.init();
};

function list_representation() { 
    var list_representation = {
        design: {
            base: undefined,
            search: $('.grid-search input'),
            actions: {
                me: $('.main-content-actions'),
                add: $('.main-content-actions .add-list_representation'),
            },
            grid: {
                me: $('.table'),
                rows: $('.table .row_representation'),
                rowtemplate: $('<tr role="row_representation" class="row_representation"></tr>')
                // withoutresults: $('.grid-without-results')
            }
        },
        datasource: {
            base: undefined,
            list_representation: new Array(),
            list_representationusers: new Array(),
            total: 0
        },
        methods: {
            base: undefined,
            actions: {
                base: undefined,
                edit: function (list_representationid) {
                    var me = this.base;
                    controls.post(me.datasource.detailpage, { representation_id: list_representationid });
                },
                remove: function (representationsids) {
                    var me = this.base;

                    //[ REMOVE list_representation ]
                    if (ifUndefinedOrNull(representationsids, new Array().length > 0)) {
                        controls.message.bind({
                            type: 'question',
                            message: 'Pretende remover os jogadores selecionados?',
                            afteryes: function () {
                                controls.ajax({
                                    functionname: 'delete_representation',
                                    data: {
                                        representations_ids: representationsids
                                    }
                                }, function (data) {
                                    if (ifUndefinedOrNull(data.success, false)) {
                                        controls.message.bind({
                                            type: 'success',
                                            message: 'Os jogadores foram removidos com sucesso',
                                            afterok: function () {
                                                //[ BIND list_representation GRID ]
                                                me.methods.grid.bind();
                                            }
                                        });
                                     } else {
                                        controls.message.bind({ type: 'error', message: 'Ocorreu um erro ao tentar remover os jogadores, por favor tente mais tarde.' });
                                    };
                                }, function () {
                                    //[ ERROR ]
                                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                }, function () {
                                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                });
                            }
                        });
                    };
                }
            }, 
            grid: {
                base: undefined,
                bind: function (parameters, after) {
                    var me = this.base,
                        ds = me.design.grid;

                    //[ GET list_representation ]
                    controls.ajax({
                        functionname: 'representations',
                        data: {
                            page: (!isUndefinedOrNull(parameters)) ? ifUndefinedOrNull(parameters.page, 1) : 1,
                            records: (!isUndefinedOrNull(parameters)) ? ifUndefinedOrNull(parameters.records, 10) : 10
                        }
                    }, function (data) {
                        //[ SET list_representation LIST ]
                        me.datasource.list_representation = ifUndefinedOrNull(data.representations, new Array());
                        me.datasource.detailpage = ifUndefinedOrNull(data.detail_page, '');
                       

                        if (data.total > 0) {
                            ds.me.slideDown();

                            //[ BIND ROWS ]
                            me.methods.grid.build(me.datasource.list_representation);

                            //[ BIND PAGER ]
                            controls.pager.bind({
                                total: data.total_pages,
                                total_records: data.total,
                                current: data.current_page,
                                update: function (page) {
                                    me.methods.grid.bind({ page: page });
                                }
                            });
                        } else {
                            //[ SHOW WITHOUT RESULTS CONTENT ]
                            ds.me.slideUp();
                        };

                        if (!isUndefinedOrNull(after)) { after(data); };
                    }, function () {
                        //[ ERROR ]
                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                    }, function () {
                        //[ ERROR ]
                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                    });
                }, 
                build: function (datasource) {
                    var me = this.base,
                        ds = me.design.grid,
                        datasource = me.datasource.list_representation;

                    //[ CLEAR GRID ]
                    ds.rows.children().remove();

                    //[ BIND ROWS ]
                    if (datasource.length > 0) {
                        $.each(datasource, function (index, list_representation) {
                            var row = ds.rowtemplate.clone(),
                                actionscolumn = '<div class="actions" data="{1}">{0}</div>',
                                itemcolumn = '<td class="v-align-middle">{0}</td>';

                            with (row) {
                                //[ SAVE list_representation ID ]
                                attr('data', list_representation.id);

                                //[ OTHER COLUMNS ]
                                row.append(itemcolumn.format('<div class="checkbox text-center"><input type="checkbox" id="ckrepresentation{0}" data="{0}"><label for="ckrepresentation{0}" class="no-padding no-margin"></label></div>'.format(list_representation.id)));
                                row.append(itemcolumn.format('{0} {1}'.format(list_representation.firstname, list_representation.lastname)));
                                row.append(itemcolumn.format(ifUndefinedOrNull(list_representation.datestart, '')));
                                row.append(itemcolumn.format(ifUndefinedOrNull(list_representation.dateend, '')));
                                row.append(itemcolumn.format(ifUndefinedOrNull(list_representation.commission, '')));
                                row.append(itemcolumn.format(ifUndefinedOrNull(list_representation.child, '')));
                            };

                            row.on('dblclick', function (e) {
                                me.methods.actions.edit($(this).attr('data'));
                                e.preventDefault();
                                e.stopPropagation();
                            });                           

                            ds.rows.append(row);
                        });

                        ds.me.find('.btn-remove').on('click', function (e) {
                            var selected = new Array();

                            $.each(ds.rows.find('.checkbox > input'), function (index, item) {
                                if($(item).is(':checked')) {
                                    selected.push(parseInt($(item).attr('data')));
                                }
                            });

                            if (ifUndefinedOrNull(selected, new Array()).length > 0) {
                                me.methods.actions.remove(selected);
                            };
                            e.preventDefault();
                            e.stopPropagation();
                        });
                    };
                },
            },
        }, 
        load: function () {
            var me = this,
                ds = me.design.actions;

            //[ BIND list_representation GRID ]
            me.methods.grid.bind();
        },
        init: function () {
            var me = this;

            this.design.base = this;
            this.datasource.base = this;

            this.methods.base = this;
            this.methods.actions.base = this;
            this.methods.grid.base = this;

            this.load();

            return this;
        }
    };
 
    return list_representation.init();
};

function list_club() { 
    var list_club = {
        design: {
            base: undefined,
            search: $('.grid-search input'),
            actions: {
                me: $('.main-content-actions'),
                add: $('.main-content-actions .add-list_club'),
            },
            grid: {
                me: $('.table'),
                rows: $('.table .row_club'),
                rowtemplate: $('<tr role="row_club" class="row_club"></tr>')
                // withoutresults: $('.grid-without-results')
            }
        },
        datasource: {
            base: undefined,
            list_club: new Array(),
            list_clubusers: new Array(),
            total: 0
        },
        methods: {
            base: undefined,
            actions: {
                base: undefined,
                edit: function (list_clubid) {
                    var me = this.base;

                    controls.post(me.datasource.detailpage, { club_id: list_clubid });

                },
                remove: function (clubsids) {
                    var me = this.base;

                    //[ REMOVE list_club ]
                    if (ifUndefinedOrNull(clubsids, new Array().length > 0)) {
                        controls.message.bind({
                            type: 'question',
                            message: 'Pretende remover os jogadores selecionados?',
                            afteryes: function () {
                                controls.ajax({
                                    functionname: 'delete_club',
                                    data: {
                                        clubs_ids: clubsids
                                    }
                                }, function (data) {
                                    if (ifUndefinedOrNull(data.success, false)) {
                                        controls.message.bind({
                                            type: 'success',
                                            message: 'Os jogadores foram removidos com sucesso',
                                            afterok: function () {
                                                //[ BIND list_club GRID ]
                                                me.methods.grid.bind();
                                            }
                                        });
                                    } else {
                                        controls.message.bind({ type: 'error', message: 'Ocorreu um erro ao tentar remover os jogadores, por favor tente mais tarde.' });
                                    };
                                }, function () {
                                    //[ ERROR ]
                                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                }, function () {
                                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                });
                            }
                        });
                    };
                }
            }, 
            grid: {
                base: undefined,
                bind: function (parameters, after) {
                    var me = this.base,
                        ds = me.design.grid;

                    //[ GET list_club ]
                    controls.ajax({
                        functionname: 'clubs',
                        data: {
                            page: (!isUndefinedOrNull(parameters)) ? ifUndefinedOrNull(parameters.page, 1) : 1,
                            records: (!isUndefinedOrNull(parameters)) ? ifUndefinedOrNull(parameters.records, 10) : 10
                        }
                    }, function (data) {
                        //[ SET list_club LIST ]
                        me.datasource.list_club = ifUndefinedOrNull(data.clubs, new Array());
                        me.datasource.detailpage = ifUndefinedOrNull(data.detail_page, '');

                        if (data.total > 0) {
                            ds.me.slideDown();

                            //[ BIND ROWS ]
                            me.methods.grid.build(me.datasource.list_club);

                            //[ BIND PAGER ]
                            controls.pager.bind({
                                total: data.total_pages,
                                total_records: data.total,
                                current: data.current_page,
                                update: function (page) {
                                    me.methods.grid.bind({ page: page });
                                }
                            });
                        } else {
                            //[ SHOW WITHOUT RESULTS CONTENT ]
                            ds.me.slideUp();
                        };

                        if (!isUndefinedOrNull(after)) { after(data); };
                    }, function () {
                        //[ ERROR ]
                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                    }, function () {
                        //[ ERROR ]
                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                    });
                }, 
                build: function (datasource) {
                    var me = this.base,
                        ds = me.design.grid,
                        datasource = me.datasource.list_club;

                    //[ CLEAR GRID ]
                    ds.rows.children().remove();

                    //[ BIND ROWS ]
                    if (datasource.length > 0) {
                        $.each(datasource, function (index, list_club) {
                            var row = ds.rowtemplate.clone(),
                                actionscolumn = '<div class="actions" data="{1}">{0}</div>',
                                itemcolumn = '<td class="v-align-middle">{0}</td>';

                            with (row) {
                                //[ SAVE list_club ID ]
                                attr('data', list_club.id);

                                //[ OTHER COLUMNS ]
                                row.append(itemcolumn.format('<div class="checkbox text-center"><input type="checkbox" id="ckclub{0}" data="{0}"><label for="ckclub{0}" class="no-padding no-margin"></label></div>'.format(list_club.id)));
                                row.append(itemcolumn.format('{0} {1}'.format(list_club.firstname, list_club.lastname)));
                                row.append(itemcolumn.format(ifUndefinedOrNull(list_club.datestart, '')));
                                row.append(itemcolumn.format(ifUndefinedOrNull(list_club.dateend, '')));
                                row.append(itemcolumn.format(ifUndefinedOrNull(list_club.clubname, '')));
                                row.append(itemcolumn.format(ifUndefinedOrNull(list_club.value, '')));
                                row.append(itemcolumn.format(ifUndefinedOrNull(list_club.clause, '')));
                            };

                            row.on('dblclick', function (e) {
                                me.methods.actions.edit($(this).attr('data'));
                                e.preventDefault();
                                e.stopPropagation();
                                console.log(list_club.id);
                            });                           

                            ds.rows.append(row);
                        });

                        ds.me.find('.btn-remove').on('click', function (e) {
                            var selected = new Array();

                            $.each(ds.rows.find('.checkbox > input'), function (index, item) {
                                if($(item).is(':checked')) {
                                    selected.push(parseInt($(item).attr('data')));
                                }
                            });

                            if (ifUndefinedOrNull(selected, new Array()).length > 0) {
                                me.methods.actions.remove(selected);
                            };
                            e.preventDefault();
                            e.stopPropagation();
                        });
                    };
                },
            },
        }, 
        load: function () {
            var me = this,
                ds = me.design.actions;

            //[ BIND list_club GRID ]
            me.methods.grid.bind();
        },
        init: function () {
            var me = this;

            this.design.base = this;
            this.datasource.base = this;

            this.methods.base = this;
            this.methods.actions.base = this;
            this.methods.grid.base = this;

            this.load();

            return this;
        }
    };
 
    return list_club.init();
};

function list_mandate() { 
    var list_mandate = {
        design: {
            base: undefined,
            search: $('.grid-search input'),
            actions: {
                me: $('.main-content-actions'),
                add: $('.main-content-actions .add-list_mandate'),
            },
            grid: {
                me: $('.table'),
                rows: $('.table .row_mandates'),
                rowtemplate: $('<tr role="row_mandates" class="row_mandates"></tr>')
                // withoutresults: $('.grid-without-results')
            }
        },
        datasource: {
            base: undefined,
            list_mandate: new Array(),
            list_mandateusers: new Array(),
            total: 0
        },
        methods: {
            base: undefined,
            actions: {
                base: undefined,
                edit: function (list_mandateid) {
                    var me = this.base;

                    controls.post(me.datasource.detailpage, { mandates_id: list_mandateid });
                },
                remove: function (mandatesids) {
                    var me = this.base;

                    //[ REMOVE list_mandate ]
                    if (ifUndefinedOrNull(mandatesids, new Array().length > 0)) {
                        controls.message.bind({
                            type: 'question',
                            message: 'Pretende remover os jogadores selecionados?',
                            afteryes: function () {
                                controls.ajax({
                                    functionname: 'delete_mandate',
                                    data: {
                                        mandates_ids: mandatesids
                                    }
                                }, function (data) {
                                    if (ifUndefinedOrNull(data.success, false)) {
                                        controls.message.bind({
                                            type: 'success',
                                            message: 'O mandato foi removido com sucesso',
                                            afterok: function () {
                                                //[ BIND list_mandate GRID ]
                                                me.methods.grid.bind();
                                            }
                                        });
                                    } else {
                                        controls.message.bind({ type: 'error', message: 'Ocorreu um erro ao tentar remover o mandato, por favor tente mais tarde.' });
                                    };
                                }, function () {
                                    //[ ERROR ]
                                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                }, function () {
                                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                });
                            }
                        });
                    };
                }
            }, 
            grid: {
                base: undefined,
                bind: function (parameters, after) {
                    var me = this.base,
                        ds = me.design.grid;

                    //[ GET list_mandate ]
                    controls.ajax({
                        functionname: 'mandates',
                        data: {
                            page: (!isUndefinedOrNull(parameters)) ? ifUndefinedOrNull(parameters.page, 1) : 1,
                            records: (!isUndefinedOrNull(parameters)) ? ifUndefinedOrNull(parameters.records, 10) : 10
                        }
                    }, function (data) {
                        //[ SET list_mandate LIST ]
                        me.datasource.list_mandate = ifUndefinedOrNull(data.mandates, new Array());
                        me.datasource.detailpage = ifUndefinedOrNull(data.detail_page, '');
                        me.datasource.agents_clubs = ifUndefinedOrNull(data.agents_clubs, new Array());

                        if (data.total > 0) {
                            ds.me.slideDown();

                            //[ BIND ROWS ]
                            me.methods.grid.build(me.datasource.list_mandate);

                            //[ BIND PAGER ]
                            controls.pager.bind({
                                total: data.total_pages,
                                total_records: data.total,
                                current: data.current_page,
                                update: function (page) {
                                    me.methods.grid.bind({ page: page });
                                }
                            });
                        } else {
                            //[ SHOW WITHOUT RESULTS CONTENT ]
                            ds.me.slideUp();
                        };

                        if (!isUndefinedOrNull(after)) { after(data); };
                    }, function () {
                        //[ ERROR ]
                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                    }, function () {
                        //[ ERROR ]
                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                    });
                }, 
                build: function (datasource) {
                    var me = this.base,
                        ds = me.design.grid,
                        datasource = me.datasource.list_mandate;

                    //[ CLEAR GRID ]
                    ds.rows.children().remove();

                    //[ BIND ROWS ]
                    if (datasource.length > 0) {
                        $.each(datasource, function (index, list_mandate) {
                            var row = ds.rowtemplate.clone(),
                                actionscolumn = '<div class="actions" data="{1}">{0}</div>',
                                itemcolumn = '<td class="v-align-middle">{0}</td>';

                            with (row) {
                                //[ SAVE list_mandate ID ]
                                attr('data', list_mandate.id);

                                var agent_club = me.datasource.agents_clubs.filter(function(ac){ return (ac.id_agent == list_mandate.agentid); }),
                                    club = '',
                                    country = '';

                                if (ifUndefinedOrNull(agent_club, new Array).length > 0) {
                                    $.each(agent_club, function (index, ac) {
                                        if (country.indexOf(ac.club_name) == -1) {
                                            if(index > 0) {
                                                club += ', ';
                                            }

                                            club += ac.club_name;
                                        };

                                        if (country.indexOf(ac.country_name) == -1) {
                                            if(index > 0) {
                                                country += ', ';
                                            }

                                            country += ac.country_name;
                                        };
                                    });
                                }

                                //[ OTHER COLUMNS ]
                                row.append(itemcolumn.format('<div class="checkbox text-center"><input type="checkbox" id="ckmandate{0}" data="{0}"><label for="ckmandate{0}" class="no-padding no-margin"></label></div>'.format(list_mandate.id)));
                                row.append(itemcolumn.format('{0} {1}'.format(list_mandate.playerfirstname, list_mandate.playerlastname)));
                                row.append(itemcolumn.format('{0} {1}'.format(list_mandate.agentfirstname, list_mandate.agentlastname)));
                                row.append(itemcolumn.format(ifUndefinedOrNull(list_mandate.agentcompany, '')));
                                row.append(itemcolumn.format(ifUndefinedOrNull(club, '')));
                                row.append(itemcolumn.format(ifUndefinedOrNull(country, '')));
                                row.append(itemcolumn.format(ifUndefinedOrNull(list_mandate.datestart, '')));
                                row.append(itemcolumn.format(ifUndefinedOrNull(list_mandate.dateend, '')));
                            };

                            row.on('dblclick', function (e) {
                                me.methods.actions.edit($(this).attr('data'));
                                e.preventDefault();
                                e.stopPropagation();
                            });                           

                            ds.rows.append(row);
                        });

                        ds.me.find('.btn-remove').on('click', function (e) {
                            var selected = new Array();

                            $.each(ds.rows.find('.checkbox > input'), function (index, item) {
                                if($(item).is(':checked')) {
                                    selected.push(parseInt($(item).attr('data')));
                                }
                            });

                            if (ifUndefinedOrNull(selected, new Array()).length > 0) {
                                me.methods.actions.remove(selected);
                            };
                            e.preventDefault();
                            e.stopPropagation();
                        });
                    };
                },
            },
        }, 
        load: function () {
            var me = this,
                ds = me.design.actions;

            //[ BIND list_mandate GRID ]
            me.methods.grid.bind();
        },
        init: function () {
            var me = this;

            this.design.base = this;
            this.datasource.base = this;

            this.methods.base = this;
            this.methods.actions.base = this;
            this.methods.grid.base = this;

            this.load();

            return this;
        }
    };
 
    return list_mandate.init();
};

function list_agent() { 
    var list_agent = {
        design: {
            base: undefined,
            search: $('.grid-search input'),
            actions: {
                me: $('.main-content-actions'),
                add: $('.main-content-actions .add-list_agent'),
            },
            grid: {
                me: $('.table'),
                rows: $('.table .row_agent'),
                rowtemplate: $('<tr role="row_agent" class="row_agent"></tr>')
                // withoutresults: $('.grid-without-results')
            }
        },
        datasource: {
            base: undefined,
            list_agent: new Array(),
            list_agentusers: new Array(),
            agents_clubs: new Array(),
            total: 0
        },
        methods: {
            base: undefined,
            actions: {
                base: undefined,
                edit: function (list_agentid) {
                    var me = this.base;

                    controls.post(me.datasource.detailpage, { agent_id: list_agentid });
                },
                remove: function (agentsids) {
                    var me = this.base;

                    //[ REMOVE list_agent ]
                    if (ifUndefinedOrNull(agentsids, new Array().length > 0)) {
                        controls.message.bind({
                            type: 'question',
                            message: 'Pretende remover os jogadores selecionados?',
                            afteryes: function () {
                                controls.ajax({
                                    functionname: 'delete_agent',
                                    data: {
                                        agents_ids: agentsids
                                    }
                                }, function (data) {
                                    if (ifUndefinedOrNull(data.success, false)) {
                                        controls.message.bind({
                                            type: 'success',
                                            message: 'Os jogadores foram removidos com sucesso',
                                            afterok: function () {
                                                //[ BIND list_agent GRID ]
                                                me.methods.grid.bind();
                                            }
                                        });
                                    } else {
                                        controls.message.bind({ type: 'error', message: 'Ocorreu um erro ao tentar remover os jogadores, por favor tente mais tarde.' });
                                    };
                                }, function () {
                                    //[ ERROR ]
                                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                }, function () {
                                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                });
                            }
                        });
                    };
                }
            }, 
            grid: {
                base: undefined,
                bind: function (parameters, after) {
                    var me = this.base,
                        ds = me.design.grid;

                    //[ GET list_agent ]
                    controls.ajax({
                        functionname: 'agents',
                        data: {
                            page: (!isUndefinedOrNull(parameters)) ? ifUndefinedOrNull(parameters.page, 1) : 1,
                            records: (!isUndefinedOrNull(parameters)) ? ifUndefinedOrNull(parameters.records, 10) : 10
                        }
                    }, function (data) {
                        //[ SET list_agent LIST ]
                        me.datasource.list_agent = ifUndefinedOrNull(data.agents, new Array());
                        me.datasource.agents_clubs = ifUndefinedOrNull(data.agents_clubs, new Array());
                        me.datasource.detailpage = ifUndefinedOrNull(data.detail_page, '');

                        if (data.total > 0) {
                            ds.me.slideDown();

                            //[ BIND ROWS ]
                            me.methods.grid.build(me.datasource.list_agent);

                            //[ BIND PAGER ]
                            controls.pager.bind({
                                total: data.total_pages,
                                total_records: data.total,
                                current: data.current_page,
                                update: function (page) {
                                    me.methods.grid.bind({ page: page });
                                }
                            });
                        } else {
                            //[ SHOW WITHOUT RESULTS CONTENT ]
                            ds.me.slideUp();
                        };

                        if (!isUndefinedOrNull(after)) { after(data); };
                    }, function () {
                        //[ ERROR ]
                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                    }, function () {
                        //[ ERROR ]
                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                    });
                }, 
                build: function (datasource) {
                    var me = this.base,
                        ds = me.design.grid,
                        datasource = me.datasource.list_agent;

                    //[ CLEAR GRID ]
                    ds.rows.children().remove();

                    //[ BIND ROWS ]
                    if (datasource.length > 0) {
                        $.each(datasource, function (index, list_agent) {
                            var row = ds.rowtemplate.clone(),
                                actionscolumn = '<div class="actions" data="{1}">{0}</div>',
                                itemcolumn = '<td class="v-align-middle">{0}</td>';

                            with (row) {
                                var agent_club = me.datasource.agents_clubs.filter(function(ac){ return (ac.id_agent == list_agent.id); }),
                                    club = '',
                                    country = '';

                                if (ifUndefinedOrNull(agent_club, new Array).length > 0) {
                                    $.each(agent_club, function (index, ac) {
                                        if (country.indexOf(ac.club_name) == -1) {
                                            if(index > 0) {
                                                club += ', ';
                                            }
    
                                            club += ac.club_name;
                                        };

                                        if (country.indexOf(ac.country_name) == -1) {
                                            if(index > 0) {
                                                country += ', ';
                                            }

                                            country += ac.country_name;
                                        };
                                    });
                                }

                                //[ SAVE list_agent ID ]
                                attr('data', list_agent.id);

                                //[ OTHER COLUMNS ]
                                row.append(itemcolumn.format('<div class="checkbox text-center"><input type="checkbox" id="ckagent{0}" data="{0}"><label for="ckagent{0}" class="no-padding no-margin"></label></div>'.format(list_agent.id)));
                                row.append(itemcolumn.format('{0} {1}'.format(list_agent.firstname, list_agent.lastname)));
                                row.append(itemcolumn.format(ifUndefinedOrNull(list_agent.agentcompany, '')));
                                row.append(itemcolumn.format(ifUndefinedOrNull(club, '')));
                                row.append(itemcolumn.format(ifUndefinedOrNull(country, '')));
                                row.append(itemcolumn.format(ifUndefinedOrNull(list_agent.contacts, '')));
                            };

                            row.on('dblclick', function (e) {
                                me.methods.actions.edit($(this).attr('data'));
                                e.preventDefault();
                                e.stopPropagation();
                            });                           

                            ds.rows.append(row);
                        });

                        ds.me.find('.btn-remove').on('click', function (e) {
                            var selected = new Array();

                            $.each(ds.rows.find('.checkbox > input'), function (index, item) {
                                if($(item).is(':checked')) {
                                    selected.push(parseInt($(item).attr('data')));
                                }
                            });

                            if (ifUndefinedOrNull(selected, new Array()).length > 0) {
                                me.methods.actions.remove(selected);
                            };
                            e.preventDefault();
                            e.stopPropagation();
                        });
                    };
                },
            },
        }, 
        load: function () {
            var me = this,
                ds = me.design.actions;

            //[ BIND list_agent GRID ]
            me.methods.grid.bind();
        },
        init: function () {
            var me = this;

            this.design.base = this;
            this.datasource.base = this;

            this.methods.base = this;
            this.methods.actions.base = this;
            this.methods.grid.base = this;

            this.load();

            return this;
        }
    };
 
    return list_agent.init();
};

function list_index() { 
    var list_value = {
        design: {
            base: undefined,
            search: $('.grid-search input'),
            actions: {
                me: $('.main-content-actions'),
                add: $('.main-content-actions .add-list_value'),
            },
            grid: {
                me: $('.table'),
                rows: $('.table .row_value'),
                rowtemplate: $('<tr role="row_value" class="row_value"></tr>')
                // withoutresults: $('.grid-without-results')
            },
            gridnationality: {
                me: $('.table'),
                rows: $('.table .row_nationality'),
                rowtemplate: $('<tr role="row" class="row_nationality"></tr>')
                // withoutresults: $('.grid-without-results')
            },
            gridclubs_index: {
                me: $('.table'),
                rows: $('.table .row_clubs_index'),
                rowtemplate: $('<tr role="row" class="row_clubs_index"></tr>')
                // withoutresults: $('.grid-without-results')
            },
            gridbirth: {
                me: $('.table'),
                rows: $('.table .row_birth'),
                rowtemplate: $('<tr role="row" class="row_birth"></tr>')
                // withoutresults: $('.grid-without-results')
            },
            gridleague: {
                me: $('.table'),
                rows: $('.table .row_league'),
                rowtemplate: $('<tr role="row" class="row_league"></tr>')
                // withoutresults: $('.grid-without-results')
            },
            gridposition: {
                me: $('.table'),
                rows: $('.table .row_position'),
                rowtemplate: $('<tr role="row" class="row_position"></tr>')
                // withoutresults: $('.grid-without-results')
            }
        },
        datasource: {
            base: undefined,
            list_value: new Array(),
            list_valueusers: new Array(),
            total: 0
        },
        methods: {
            base: undefined,
            actions: {
                base: undefined,
                edit: function (playerid) {
                    var me = this.base;

                    controls.post(me.datasource.detailpage, { player_id: playerid });
                },
            }, 
            grid: {
                base: undefined,
                bind: function (parameters, after) {
                    var me = this.base,
                        ds = me.design.grid;

                    //[ GET list_value ]
                    controls.ajax({
                        functionname: 'values',
                        data: {
                            page: (!isUndefinedOrNull(parameters)) ? ifUndefinedOrNull(parameters.page, 1) : 1,
                            records: (!isUndefinedOrNull(parameters)) ? ifUndefinedOrNull(parameters.records, 10) : 10
                        }
                    }, function (data) {
                        //[ SET list_value LIST ]
                        me.datasource.list_value = ifUndefinedOrNull(data.values, new Array());
                        me.datasource.detailpage = ifUndefinedOrNull(data.detail_page, '');

                        if (data.total > 0) {
                            ds.me.slideDown();

                            //[ BIND ROWS ]
                            me.methods.grid.build(me.datasource.list_value);

                            //[ BIND PAGER ]
                            controls.pager.bind({
                                total: data.total_pages,
                                total_records: data.total,
                                current: data.current_page,
                                update: function (page) {
                                    me.methods.grid.bind({ page: page });
                                }
                            });
                        } else {
                            //[ SHOW WITHOUT RESULTS CONTENT ]
                            ds.me.slideUp();
                        };

                        if (!isUndefinedOrNull(after)) { after(data); };
                    }, function () {
                        //[ ERROR ]
                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                    }, function () {
                        //[ ERROR ]
                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                    });
                }, 
                build: function (datasource) {
                    var me = this.base,
                        ds = me.design.grid,
                        datasource = me.datasource.list_value;

                    //[ CLEAR GRID ]
                    ds.rows.children().remove();

                    //[ BIND ROWS ]
                    if (datasource.length > 0) {
                        var total = 0;
                        
                        $.each(datasource, function (index, list_value) {
                            var row = ds.rowtemplate.clone(),
                                actionscolumn = '<div class="actions" data="{1}">{0}</div>',
                                itemcolumn = '<td class="font-montserrat all-caps fs-12 w-50">{0}</td>',
                                itemcolumn2 = '<td class="text-right b-r b-dashed b-grey w-25"><span class="hint-text small">Valor €</span></td>',
                                itemcolumn3 = '<td class="w-25" style="width:20%; text-align: center; vertical-align: middle;">{0}</td>';

                            with (row) {
                                //[ SAVE list_value ID ]
                                attr('data', list_value.id);

                                //[ OTHER COLUMNS ]
                                row.append(itemcolumn.format('{0} {1}'.format(list_value.firstname, list_value.lastname)));
                                row.append(itemcolumn2);
                                row.append(itemcolumn3.format(ifUndefinedOrNull(list_value.value, '')));

                                total = total + parseFloat(list_value.value);
                            };

                            row.on('dblclick', function (e) {
                                me.methods.actions.edit($(this).attr('data'));
                                e.preventDefault();
                                e.stopPropagation();
                            });                           

                            ds.rows.append(row);
                        });

                        $('.marketTotalValue').html(total + '€');

                        ds.me.find('.btn-remove').on('click', function (e) {
                            var selected = new Array();

                            $.each(ds.rows.find('.checkbox > input'), function (index, item) {
                                if($(item).is(':checked')) {
                                    selected.push(parseInt($(item).attr('data')));
                                }
                            });

                            if (ifUndefinedOrNull(selected, new Array()).length > 0) {
                                me.methods.actions.remove(selected);
                            };
                            e.preventDefault();
                            e.stopPropagation();
                        });
                    };
                },
                nationality: {
                    base: undefined,
                    bind: function (parameters, after) {
                        var me = this.base,
                            ds = me.design.gridnationality;
    
                        //[ GET list_nationality ]
                        controls.ajax({
                            functionname: 'nationality',
                            data: {
                                page: (!isUndefinedOrNull(parameters)) ? ifUndefinedOrNull(parameters.page, 1) : 1,
                                records: (!isUndefinedOrNull(parameters)) ? ifUndefinedOrNull(parameters.records, 10) : 10
                            }
                        }, function (data) {
                            //[ SET list_nationality LIST ]
                            me.datasource.list_nationality = ifUndefinedOrNull(data.nationality, new Array());
                            me.datasource.detailpage = ifUndefinedOrNull(data.detail_page, '');
    
                            if (data.total > 0) {
                                ds.me.slideDown();
    
                                //[ BIND ROWS ]
                                me.methods.grid.nationality.build(me.datasource.list_nationality);
    
                                //[ BIND PAGER ]
                                controls.pager.bind({
                                    total: data.total_pages,
                                    total_records: data.total,
                                    current: data.current_page,
                                    update: function (page) {
                                        me.methods.grid.nationality.bind({ page: page });
                                    }
                                });
                            } else {
                                //[ SHOW WITHOUT RESULTS CONTENT ]
                                ds.me.slideUp();
                            };
    
                            if (!isUndefinedOrNull(after)) { after(data); };
                        }, function () {
                            //[ ERROR ]
                            controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                        }, function () {
                            //[ ERROR ]
                            controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                        });
                    }, 
                    build: function (datasource) {
                        var me = this.base,
                            ds = me.design.gridnationality,
                            datasource = me.datasource.list_nationality;
    
                        //[ CLEAR GRID ]
                        ds.rows.children().remove();
    
                        //[ BIND ROWS ]
    
                        if (datasource.length > 0) {
                            var total = datasource.SingleFieldDistinct('nationality').length;

                            $.each(datasource, function (index, list_nationality) {
                                var row = ds.rowtemplate.clone(),
                                    actionscolumn = '<div class="actions" data="{1}">{0}</div>',
                                    itemcolumn = '<td class="font-montserrat all-caps fs-12 w-50">{0}</td>',
                                    itemcolumn2 = '<td class="text-right b-r b-dashed b-grey w-25"><span class="hint-text small">Nacionalidade</span></td>',
                                    itemcolumn3 = '<td class="w-25" style="width:20%; text-align: center; vertical-align: middle;">{0}</td>';
    
                                with (row) {
                                    //[ SAVE list_nationality ID ]
                                    attr('data', list_nationality.id);
    
                                    //[ OTHER COLUMNS ]
                                    row.append(itemcolumn.format('{0} {1}'.format(list_nationality.firstname, list_nationality.lastname)));
                                    row.append(itemcolumn2);
                                    row.append(itemcolumn3.format(ifUndefinedOrNull(list_nationality.nationality, '')));
                                };
    
                                row.on('dblclick', function (e) {
                                    me.methods.actions.edit($(this).attr('data'));
                                    e.preventDefault();
                                    e.stopPropagation();
                                });                           
    
                                ds.rows.append(row);
                            });

                            $('.marketTotalNationality').html(total + ' países');
    
                            ds.me.find('.btn-remove').on('click', function (e) {
                                var selected = new Array();
    
                                $.each(ds.rows.find('.checkbox > input'), function (index, item) {
                                    if($(item).is(':checked')) {
                                        selected.push(parseInt($(item).attr('data')));
                                    }
                                });
    
                                if (ifUndefinedOrNull(selected, new Array()).length > 0) {
                                    me.methods.actions.remove(selected);
                                };
                                e.preventDefault();
                                e.stopPropagation();
                            });
                        };
                    }
                },
                clubs_index: {
                    base: undefined,
                    bind: function (parameters, after) {
                        var me = this.base,
                            ds = me.design.gridclubs_index;
    
                        //[ GET list_clubs_index ]
                        controls.ajax({
                            functionname: 'clubs_index',
                            data: {
                                page: (!isUndefinedOrNull(parameters)) ? ifUndefinedOrNull(parameters.page, 1) : 1,
                                records: (!isUndefinedOrNull(parameters)) ? ifUndefinedOrNull(parameters.records, 10) : 10
                            }
                        }, function (data) {
                            //[ SET list_clubs_index LIST ]
                            me.datasource.list_clubs_index = ifUndefinedOrNull(data.clubs_index, new Array());
                            me.datasource.detailpage = ifUndefinedOrNull(data.detail_page, '');
    
                            if (data.total > 0) {
                                ds.me.slideDown();
    
                                //[ BIND ROWS ]
                                me.methods.grid.clubs_index.build(me.datasource.list_clubs_index);
    
                                //[ BIND PAGER ]
                                controls.pager.bind({
                                    total: data.total_pages,
                                    total_records: data.total,
                                    current: data.current_page,
                                    update: function (page) {
                                        me.methods.grid.clubs_index.bind({ page: page });
                                    }
                                });
                            } else {
                                //[ SHOW WITHOUT RESULTS CONTENT ]
                                ds.me.slideUp();
                            };
    
                            if (!isUndefinedOrNull(after)) { after(data); };
                        }, function () {
                            //[ ERROR ]
                            controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                        }, function () {
                            //[ ERROR ]
                            controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                        });
                    }, 
                    build: function (datasource) {
                        var me = this.base,
                            ds = me.design.gridclubs_index,
                            datasource = me.datasource.list_clubs_index;
    
                        //[ CLEAR GRID ]
                        ds.rows.children().remove();
    
                        //[ BIND ROWS ]
    
                        if (datasource.length > 0) {
                            var total = 0;

                            $.each(datasource, function (index, list_clubs_index) {
                                var row = ds.rowtemplate.clone(),
                                    actionscolumn = '<div class="actions" data="{1}">{0}</div>',
                                    itemcolumn = '<td class="font-montserrat all-caps fs-12 w-50">{0}</td>',
                                    itemcolumn2 = '<td class="text-right b-r b-dashed b-grey w-25"><span class="hint-text small">Total</span></td>',
                                    itemcolumn3 = '<td class="w-25" style="width:20%; text-align: center; vertical-align: middle;">{0}</td>';
    
                                with (row) {
                                    //[ SAVE list_clubs_index ID ]
                                    attr('data', list_clubs_index.id);
    
                                    //[ OTHER COLUMNS ]
                                    row.append(itemcolumn.format(ifUndefinedOrNull(list_clubs_index.clubname, '')));
                                    row.append(itemcolumn2);
                                    row.append(itemcolumn3.format(ifUndefinedOrNull(list_clubs_index.count, '')));

                                    total = total +1;
                                };
    
                                row.on('dblclick', function (e) {
                                    me.methods.actions.edit($(this).attr('data'));
                                    e.preventDefault();
                                    e.stopPropagation();
                                });                           
                                
                                ds.rows.append(row);
                            });

                            $('.marketTotalClubs').html(total + ' clubes');
    
                            ds.me.find('.btn-remove').on('click', function (e) {
                                var selected = new Array();
    
                                $.each(ds.rows.find('.checkbox > input'), function (index, item) {
                                    if($(item).is(':checked')) {
                                        selected.push(parseInt($(item).attr('data')));
                                    }
                                });
    
                                if (ifUndefinedOrNull(selected, new Array()).length > 0) {
                                    me.methods.actions.remove(selected);
                                };
                                e.preventDefault();
                                e.stopPropagation();
                            });
                        };
                    }
                },
                birth: {
                    base: undefined,
                    bind: function (parameters, after) {
                        var me = this.base,
                            ds = me.design.gridbirth;
    
                        //[ GET list_birth ]
                        controls.ajax({
                            functionname: 'birth',
                            data: {
                                page: (!isUndefinedOrNull(parameters)) ? ifUndefinedOrNull(parameters.page, 1) : 1,
                                records: (!isUndefinedOrNull(parameters)) ? ifUndefinedOrNull(parameters.records, 10) : 10
                            }
                        }, function (data) {
                            //[ SET list_birth LIST ]
                            me.datasource.list_birth = ifUndefinedOrNull(data.birth, new Array());
                            me.datasource.detailpage = ifUndefinedOrNull(data.detail_page, '');
    
                            if (data.total > 0) {
                                ds.me.slideDown();
    
                                //[ BIND ROWS ]
                                me.methods.grid.birth.build(me.datasource.list_birth);
    
                                //[ BIND PAGER ]
                                controls.pager.bind({
                                    total: data.total_pages,
                                    total_records: data.total,
                                    current: data.current_page,
                                    update: function (page) {
                                        me.methods.grid.birth.bind({ page: page });
                                    }
                                });
                            } else {
                                //[ SHOW WITHOUT RESULTS CONTENT ]
                                ds.me.slideUp();
                            };
    
                            if (!isUndefinedOrNull(after)) { after(data); };
                        }, function () {
                            //[ ERROR ]
                            controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                        }, function () {
                            //[ ERROR ]
                            controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                        });
                    }, 
                    build: function (datasource) {
                        var me = this.base,
                            ds = me.design.gridbirth,
                            datasource = me.datasource.list_birth;
    
                        //[ CLEAR GRID ]
                        ds.rows.children().remove();
    
                        //[ BIND ROWS ]
    
                        if (datasource.length > 0) {
                            $.each(datasource, function (index, list_birth) {
                                var row = ds.rowtemplate.clone(),
                                    actionscolumn = '<div class="actions" data="{1}">{0}</div>',
                                    itemcolumn = '<td class="font-montserrat all-caps fs-12 w-50">{0}</td>',
                                    itemcolumn2 = '<td class="text-right b-r b-dashed b-grey w-25"><span class="hint-text small">Data</span></td>',
                                    itemcolumn3 = '<td class="w-25" style="width:20%; text-align: center; vertical-align: middle;">{0}</td>';
    
                                with (row) {
                                    //[ SAVE list_birth ID ]
                                    attr('data', list_birth.id);
    
                                    //[ OTHER COLUMNS ]
                                    row.append(itemcolumn.format('{0} {1}'.format(list_birth.firstname, list_birth.lastname)));
                                    row.append(itemcolumn2);
                                    row.append(itemcolumn3.format(ifUndefinedOrNull(list_birth.birth, '')));
                                };
    
                                row.on('dblclick', function (e) {
                                    me.methods.actions.edit($(this).attr('data'));
                                    e.preventDefault();
                                    e.stopPropagation();
                                });                           
    
                                ds.rows.append(row);
                            });
    
                            ds.me.find('.btn-remove').on('click', function (e) {
                                var selected = new Array();
    
                                $.each(ds.rows.find('.checkbox > input'), function (index, item) {
                                    if($(item).is(':checked')) {
                                        selected.push(parseInt($(item).attr('data')));
                                    }
                                });
    
                                if (ifUndefinedOrNull(selected, new Array()).length > 0) {
                                    me.methods.actions.remove(selected);
                                };
                                e.preventDefault();
                                e.stopPropagation();
                            });
                        };
                    }
                },
                league: {
                    base: undefined,
                    bind: function (parameters, after) {
                        var me = this.base,
                            ds = me.design.gridleague;
    
                        //[ GET list_league ]
                        controls.ajax({
                            functionname: 'league',
                            data: {
                                page: (!isUndefinedOrNull(parameters)) ? ifUndefinedOrNull(parameters.page, 1) : 1,
                                records: (!isUndefinedOrNull(parameters)) ? ifUndefinedOrNull(parameters.records, 10) : 10
                            }
                        }, function (data) {
                            //[ SET list_league LIST ]
                            me.datasource.list_league = ifUndefinedOrNull(data.league, new Array());
                            me.datasource.detailpage = ifUndefinedOrNull(data.detail_page, '');
    
                            if (data.total > 0) {
                                ds.me.slideDown();
    
                                //[ BIND ROWS ]
                                me.methods.grid.league.build(me.datasource.list_league);
    
                                //[ BIND PAGER ]
                                controls.pager.bind({
                                    total: data.total_pages,
                                    total_records: data.total,
                                    current: data.current_page,
                                    update: function (page) {
                                        me.methods.grid.league.bind({ page: page });
                                    }
                                });
                            } else {
                                //[ SHOW WITHOUT RESULTS CONTENT ]
                                ds.me.slideUp();
                            };
    
                            if (!isUndefinedOrNull(after)) { after(data); };
                        }, function () {
                            //[ ERROR ]
                            controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                        }, function () {
                            //[ ERROR ]
                            controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                        });
                    }, 
                    build: function (datasource) {
                        var me = this.base,
                            ds = me.design.gridleague,
                            datasource = me.datasource.list_league;
    
                        //[ CLEAR GRID ]
                        ds.rows.children().remove();
    
                        //[ BIND ROWS ]
    
                        if (datasource.length > 0) {
                            var total = 0;

                            $.each(datasource, function (index, list_league) {
                                var row = ds.rowtemplate.clone(),
                                    actionscolumn = '<div class="actions" data="{1}">{0}</div>',
                                    itemcolumn = '<td class="font-montserrat all-caps fs-12 w-50">{0}</td>',
                                    itemcolumn2 = '<td class="text-right b-r b-dashed b-grey w-25"><span class="hint-text small">Termina</span></td>',
                                    itemcolumn3 = '<td class="w-25" style="width:20%; text-align: center; vertical-align: middle;">{0}</td>';
    
                                with (row) {
                                    //[ SAVE list_league ID ]
                                    attr('data', list_league.id);
    
                                    //[ OTHER COLUMNS ]
                                    row.append(itemcolumn.format('{0} {1}'.format(list_league.firstname, list_league.lastname)));
                                    row.append(itemcolumn2);
                                    row.append(itemcolumn3.format(ifUndefinedOrNull(list_league.dateend, '')));
                                    
                                    total = total +1;
                                };
    
                                row.on('dblclick', function (e) {
                                    me.methods.actions.edit($(this).attr('data'));
                                    e.preventDefault();
                                    e.stopPropagation();
                                });                           
    
                                ds.rows.append(row);
                            });

                            $('.marketTotalLeague').html(total + ' contratos');
    
                            ds.me.find('.btn-remove').on('click', function (e) {
                                var selected = new Array();
    
                                $.each(ds.rows.find('.checkbox > input'), function (index, item) {
                                    if($(item).is(':checked')) {
                                        selected.push(parseInt($(item).attr('data')));
                                    }
                                });
    
                                if (ifUndefinedOrNull(selected, new Array()).length > 0) {
                                    me.methods.actions.remove(selected);
                                };
                                e.preventDefault();
                                e.stopPropagation();
                            });
                        };
                    }
                },
                position: {
                    base: undefined,
                    bind: function (parameters, after) {
                        var me = this.base,
                            ds = me.design.gridposition;
    
                        //[ GET list_position ]
                        controls.ajax({
                            functionname: 'position',
                            data: {
                                page: (!isUndefinedOrNull(parameters)) ? ifUndefinedOrNull(parameters.page, 1) : 1,
                                records: (!isUndefinedOrNull(parameters)) ? ifUndefinedOrNull(parameters.records, 10) : 10
                            }
                        }, function (data) {
                            //[ SET list_position LIST ]
                            me.datasource.list_position = ifUndefinedOrNull(data.position, new Array());
                            me.datasource.detailpage = ifUndefinedOrNull(data.detail_page, '');
    
                            if (data.total > 0) {
                                ds.me.slideDown();
    
                                //[ BIND ROWS ]
                                me.methods.grid.position.build(me.datasource.list_position);
    
                                //[ BIND PAGER ]
                                controls.pager.bind({
                                    total: data.total_pages,
                                    total_records: data.total,
                                    current: data.current_page,
                                    update: function (page) {
                                        me.methods.grid.position.bind({ page: page });
                                    }
                                });
                            } else {
                                //[ SHOW WITHOUT RESULTS CONTENT ]
                                ds.me.slideUp();
                            };
    
                            if (!isUndefinedOrNull(after)) { after(data); };
                        }, function () {
                            //[ ERROR ]
                            controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                        }, function () {
                            //[ ERROR ]
                            controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                        });
                    }, 
                    build: function (datasource) {
                        var me = this.base,
                            ds = me.design.gridposition,
                            datasource = me.datasource.list_position;
    
                        //[ CLEAR GRID ]
                        ds.rows.children().remove();
    
                        //[ BIND ROWS ]
    
                        if (datasource.length > 0) {
                            var total = 0;

                            $.each(datasource, function (index, list_position) {
                                var row = ds.rowtemplate.clone(),
                                    actionscolumn = '<div class="actions" data="{1}">{0}</div>',
                                    itemcolumn = '<td class="font-montserrat all-caps fs-12 w-50">{0}</td>',
                                    itemcolumn2 = '<td class="text-right b-r b-dashed b-grey w-25"><span class="hint-text small">Total</span></td>',
                                    itemcolumn3 = '<td class="w-25" style="width:20%; text-align: center; vertical-align: middle;">{0}</td>';
    
                                with (row) {
                                    //[ SAVE list_position ID ]
                                    attr('data', list_position.id);
    
                                    //[ OTHER COLUMNS ]
                                    row.append(itemcolumn.format(ifUndefinedOrNull(list_position.position, '')));
                                    row.append(itemcolumn2);
                                    row.append(itemcolumn3.format(ifUndefinedOrNull(list_position.count, '')));

                                    total = total +1;
                                };
    
                                row.on('dblclick', function (e) {
                                    me.methods.actions.edit($(this).attr('data'));
                                    e.preventDefault();
                                    e.stopPropagation();
                                });                           
    
                                ds.rows.append(row);
                            });

                            $('.marketTotalPosition').html(total + ' posições');
    
                            ds.me.find('.btn-remove').on('click', function (e) {
                                var selected = new Array();
    
                                $.each(ds.rows.find('.checkbox > input'), function (index, item) {
                                    if($(item).is(':checked')) {
                                        selected.push(parseInt($(item).attr('data')));
                                    }
                                });
    
                                if (ifUndefinedOrNull(selected, new Array()).length > 0) {
                                    me.methods.actions.remove(selected);
                                };
                                e.preventDefault();
                                e.stopPropagation();
                            });
                        };
                    }
                }
            },
        }, 
        load: function () {
            var me = this,
                ds = me.design.actions;

            //[ BIND list_value GRID ]
            me.methods.grid.bind();
            me.methods.grid.nationality.bind();
            me.methods.grid.clubs_index.bind();
            me.methods.grid.birth.bind();
            me.methods.grid.league.bind();
            me.methods.grid.position.bind();
        },
        init: function () {
            var me = this;

            this.design.base = this;
            this.datasource.base = this;

            this.methods.base = this;
            this.methods.actions.base = this;
            this.methods.grid.base = this;
            this.methods.grid.nationality.base = this;
            this.methods.grid.clubs_index.base = this;
            this.methods.grid.birth.base = this;
            this.methods.grid.league.base = this;
            this.methods.grid.position.base = this;

            this.load();

            return this;
        }
    };
 
    return list_value.init();
};

