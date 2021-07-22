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
            ctrfiles: $('.ctrFiles'),
            ctruploader: $('.ctrUploader')
        },
        datasource: {
            base: undefined,
            id: ifUndefinedOrNull(args.data.player_id, 0),
            player: undefined,
            clubs: new Array(),
            attachments: new Array(),
            selectedattachments: new Array()
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
                        //[ SET LIST_PLAYER LIST ]
                        me.datasource.player = data.player;
                        me.datasource.attachments = data.attachments;

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
                    //[ SET LIST_PLAYER LIST ]
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
                        clubs = me.datasource.clubs,
                        difference=new Date() - new Date(player.birth), 
                        ageDate = new Date(difference),
                        calculatedAge=   Math.abs(ageDate.getUTCFullYear() - 1970);

                    ds.playerclub.append('<option value="0">Selecionar</option>');
                    $.each(clubs.SingleFieldDistinct('country'), function (index, country) {
                        var group = $('<optgroup label="{0}"></optgroup>'.format(country)),
                            countryclubs = clubs.filter(function(c){ return (c.country == country); });

                        $.each(countryclubs, function (index, club) {
                            group.append('<option value="{0}">{1}</option>'.format(club.id, club.name_club));
                        });

                        ds.playerclub.append(group);
                    });

                    //ANEXOS
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
                        ds.playerage.val(calculatedAge);
                        ds.playerclub.val(player.club);
                        ds.playerclub.trigger('change');
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
                        $('.titlePlayer').html('EDITAR JOGADOR');

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

                        //ANEXOS
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
                            if (ds.playername.val() != '' && ds.playerfirstname.val() != '' && ds.playerlastname.val() != ''
                                && ds.playerbirth.val() != '' && ds.playerclub.val() != '0' && ds.playerfoot.val() != ''
                                && ds.playerheight.val() != '' && ds.playernationality.val() != '' && ds.playerposition.val() != ''
                                && ds.playervalue.val() != '' && ds.playerweight.val() != '') {
                                var player = me.datasource.player,
                                    difference=new Date() - new Date(ds.playerbirth.val()), 
                                    ageDate = new Date(difference),
                                    calculatedAge=   Math.abs(ageDate.getUTCFullYear() - 1970);

                                with(player) {
                                    club = ds.playerclub.find('option:selected').val();
                                    name = ds.playername.val();
                                    firstname = ds.playerfirstname.val();
                                    lastname = ds.playerlastname.val();
                                    nationality = ds.playernationality.val();
                                    birth = (ds.playerbirth.val() != '') ? ds.playerbirth.val() : null; 
                                    ds.playerage.val(calculatedAge);
                                    foot = ds.playerfoot.prev().find('.cs-selected span').html();
                                    position = ds.playerposition.prev().find('.cs-selected span').html();
                                    height = (ds.playerheight.val() != '') ? ds.playerheight.val() : 0;
                                    weight = (ds.playerweight.val() != '') ? ds.playerweight.val() : 0;
                                    passport = ds.playerpassport.val();
                                    passportval = (ds.playerpassportval.val() != '') ? ds.playerpassportval.val() : null;
                                    value = ds.playervalue.val();
                                };

                                //ANEXOS
                                if (ifUndefinedOrNull(me.datasource.selectedattachments, new Array()).length > 0) {
                                    $.each(me.datasource.selectedattachments, function (index, attachment) {
                                        attachment.PlayerID = player.id;
                                    });
                                };
            
                                controls.ajax({
                                    functionname: 'update_player',
                                    data: {
                                        player: player,
                                        attachments: me.datasource.selectedattachments
                                    }
                                }, function (data) {
                                    if (ifUndefinedOrNull(data.success, false)) {
                                        controls.feedback.bind({ type: 'success', message: 'Jogador editado com sucesso.' });
                                        setTimeout(function(){
                                            window.open('players_list.php', '_self');
                                         }, 2000);
                                    } else {
                                        controls.feedback.bind({ type: 'error', message: 'Jogador não foi editado com sucesso.' });
                                    };
                                }, function () {
                                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                }, function () {
                                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                });
                            } else {
                                controls.feedback.bind({ type: 'warning', message: 'Campos obrigatórios.' });
                            }; 
                        });
                    }else{
                        ds.ctrfiles.remove();

                        //INSERIR JOGADOR
                        ds.saveplayer.on('click', function(){
                            if (ds.playername.val() != '' && ds.playerfirstname.val() != '' && ds.playerlastname.val() != ''
                                && ds.playerbirth.val() != '' && ds.playerclub.val() != '0' && ds.playerfoot.val() != ''
                                && ds.playerheight.val() != '' && ds.playernationality.val() != '' && ds.playerposition.val() != ''
                                && ds.playervalue.val() != '' && ds.playerweight.val() != '') {
                                var player = me.datasource.player,
                                    difference=new Date() - new Date(ds.playerbirth.val()), 
                                    ageDate = new Date(difference),
                                    calculatedAge=   Math.abs(ageDate.getUTCFullYear() - 1970); 
                            
                                with(player) {
                                    age = ds.playerage.val(calculatedAge);
                                    birth = (ds.playerbirth.val() != '') ? ds.playerbirth.val() : null;                                   
                                    club = ds.playerclub.find('option:selected').val();
                                    firstname = ds.playerfirstname.val();
                                    foot = ds.playerfoot.prev().find('.cs-selected span').html();
                                    height = (ds.playerheight.val() != '') ? ds.playerheight.val() : 0;
                                    lastname = ds.playerlastname.val();
                                    name = ds.playername.val();
                                    nationality = ds.playernationality.val();
                                    passport = ds.playerpassport.val();
                                    passportval = (ds.playerpassportval.val() != '') ? ds.playerpassportval.val() : null;
                                    position = ds.playerposition.prev().find('.cs-selected span').html();
                                    value = (!isStringVoid(ds.playervalue.val())) ? ds.playervalue.val() : 0;
                                    weight = (ds.playerweight.val() != '') ? ds.playerweight.val() : 0;
                                };
            
                                controls.ajax({
                                    functionname: 'insert_player',
                                    data: {
                                        player: player,
                                        attachments: me.datasource.selectedattachments
                                    }
                                }, function (data) {
                                    if (ifUndefinedOrNull(data.success, false)) {
                                        controls.feedback.bind({ type: 'success', message: 'Jogador adicionado com sucesso.' });
                                        setTimeout(function(){
                                            window.open('players_list.php', '_self');
                                         }, 2000);
                                    } else {
                                        controls.feedback.bind({ type: 'error', message: 'Não foi possível adicionado o jogador.' });
                                    };
                                }, function () {
                                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                }, function () {
                                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                });
                            } else {
                                controls.feedback.bind({ type: 'warning', message: 'Campos obrigatórios.' });
                            };
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
            ctrfiles: $('.ctrFiles'),
            ctruploader: $('.ctrUploader')
        },
        datasource: {
            base: undefined,
            id: ifUndefinedOrNull(args.data.coach_id, 0),
            coach: undefined,
            clubs: new Array(),
            attachments: new Array(),
            selectedattachments: new Array()
        },
        methods: {
            base: undefined,
            getcoach: function (after) {
                var me = this.base;

                //[ GET COACH ]
                if (ifUndefinedOrNull(me.datasource.id, 0) > 0) {
                    controls.ajax({
                        functionname: 'coach',
                        data: {
                            coach_id: ifUndefinedOrNull(me.datasource.id, 0)
                        }
                    }, function (data) {
                        //[ SET list_coach LIST ]
                        me.datasource.coach = data.coach;
                        me.datasource.attachments = data.attachments;

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
                    //[ SET LIST_COACH LIST ]
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
                        clubs = me.datasource.clubs,
                        difference=new Date() - new Date(coach.birth), 
                        ageDate = new Date(difference),
                        calculatedAge=   Math.abs(ageDate.getUTCFullYear() - 1970);

                    ds.coachclub.append('<option value="0">Selecionar</option>');
                    $.each(clubs.SingleFieldDistinct('country'), function (index, country) {
                        var group = $('<optgroup label="{0}"></optgroup>'.format(country)),
                            countryclubs = clubs.filter(function(c){ return (c.country == country); });

                        $.each(countryclubs, function (index, club) {
                            group.append('<option value="{0}">{1}</option>'.format(club.id, club.name_club));
                        });

                        ds.coachclub.append(group);
                    });

                    //ANEXOS
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
                        ds.coachage.val(calculatedAge);
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

                        //ANEXOS
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

                        //EDITAR TREINADOR
                        ds.savecoach.on('click', function(){
                            if (ds.coachname.val() != '' && ds.coachfirstname.val() != '' && ds.coachlastname.val() != ''
                                && ds.coachbirth.val() != '' && ds.coachclub.val() != '0' && ds.coachformation.val() != ''
                                && ds.coachheight.val() != '' && ds.coachnationality.val() != ''
                                && ds.coachvalue.val() != '' && ds.coachweight.val() != '') {

                                var coach = me.datasource.coach,
                                    difference=new Date() - new Date(ds.coachbirth.val()), 
                                    ageDate = new Date(difference),
                                    calculatedAge=   Math.abs(ageDate.getUTCFullYear() - 1970);                   

                                with(coach) {
                                    birth = (ds.coachbirth.val() != '') ? ds.coachbirth.val() : null; 
                                    club = ds.coachclub.find('option:selected').val();
                                    firstname = ds.coachfirstname.val();
                                    formation = ds.coachformation.prev().find('.cs-selected span').html();
                                    height = ds.coachheight.val();
                                    lastname = ds.coachlastname.val();
                                    name = ds.coachname.val();
                                    nationality = ds.coachnationality.val();
                                    passport = ds.coachpassport.val();
                                    passportval = (ds.coachpassportval.val() != '') ? ds.coachpassportval.val() : null;
                                    value = ds.coachvalue.val();
                                    weight = ds.coachweight.val();
                                    ds.coachage.val(calculatedAge);
                                };

                                //ANEXOS
                                if (ifUndefinedOrNull(me.datasource.selectedattachments, new Array()).length > 0) {
                                    $.each(me.datasource.selectedattachments, function (index, attachment) {
                                        attachment.CoachID = coach.id;
                                    });
                                };
                
                                controls.ajax({
                                    functionname: 'update_coach',
                                    data: {
                                        coach: coach,
                                        attachments: me.datasource.selectedattachments
                                    }
                                }, function (data) {
                                    if (ifUndefinedOrNull(data.success, false)) {
                                        controls.feedback.bind({ type: 'success', message: 'Treinador editado com sucesso.' });
                                        setTimeout(function(){
                                            window.open('coaches_list.php', '_self');
                                        }, 2000);
                                    } else {
                                        controls.feedback.bind({ type: 'error', message: 'Treinador não foi editado com sucesso.' });
                                    };
                                }, function () {
                                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                }, function () {
                                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                });
                            } else {
                                controls.feedback.bind({ type: 'warning', message: 'Campos obrigatórios.' });
                            };
                        });
                    } else {
                        ds.ctrfiles.remove();

                        //INSERIR TREINADOR
                        ds.savecoach.on('click', function(){
                            if (ds.coachname.val() != '' && ds.coachfirstname.val() != '' && ds.coachlastname.val() != ''
                                && ds.coachbirth.val() != '' && ds.coachclub.val() != '0' && ds.coachformation.val() != ''
                                && ds.coachheight.val() != '' && ds.coachnationality.val() != ''
                                && ds.coachvalue.val() != '' && ds.coachweight.val() != '') {

                                var coach = me.datasource.coach;                   
            
                                with(coach) {
                                    age = ds.coachage.val();
                                    birth = (ds.coachbirth.val() != '') ? ds.coachbirth.val() : null; 
                                    club = ds.coachclub.find('option:selected').val();
                                    firstname = ds.coachfirstname.val();
                                    formation = ds.coachformation.prev().find('.cs-selected span').html();
                                    height = ds.coachheight.val();
                                    lastname = ds.coachlastname.val();
                                    name = ds.coachname.val();
                                    nationality = ds.coachnationality.val();
                                    passport = ds.coachpassport.val();
                                    passportval = (ds.coachpassportval.val() != '') ? ds.coachpassportval.val() : null;
                                    value = ds.coachvalue.val();
                                    weight = ds.coachweight.val();
                                };
                
                                controls.ajax({
                                    functionname: 'insert_coach',
                                    data: {
                                        coach: coach,
                                        attachments: me.datasource.selectedattachments
                                    }
                                }, function (data) {
                                    if (ifUndefinedOrNull(data.success, false)) {
                                        controls.feedback.bind({ type: 'success', message: 'Treinador adicionado com sucesso.' });
                                        setTimeout(function(){
                                            window.open('coaches_list.php', '_self');
                                         }, 2000);
                                    } else {
                                        controls.feedback.bind({ type: 'error', message: 'Não foi possível adicionado o treinador.' });
                                    };
                                }, function () {
                                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                }, function () {
                                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                });
                            } else {
                                controls.feedback.bind({ type: 'warning', message: 'Campos obrigatórios.' });
                            };
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
            agentage: $('.txtAgentAge'),
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
            ctrfiles: $('.ctrFiles'),
            ctruploader: $('.ctrUploader')
        },
        datasource: {
            base: undefined,
            id: ifUndefinedOrNull(args.data.agent_id, 0),
            agent: undefined,
            clubs: new Array(),
            agent_clubs: new Array(),
            attachments: new Array(),
            selectedattachments: new Array()
        },
        methods: {
            base: undefined,
            getagent: function (after) {
                var me = this.base;

                //[ GET AGENT ]
                if (ifUndefinedOrNull(me.datasource.id, 0) > 0) {
                    controls.ajax({
                        functionname: 'agent',
                        data: {
                            agent_id: ifUndefinedOrNull(me.datasource.id, 0)
                        }
                    }, function (data) {
                        //[ SET LIST_AGENT LIST ]
                        me.datasource.agent = data.agent;
                        me.datasource.agent_clubs = data.agent_clubs;
                        me.datasource.attachments = data.attachments;

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
                    //[ SET LIST_CLUBS LIST ]
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
                        clubs = me.datasource.clubs,
                        country = '',
                        difference=new Date() - new Date(agent.birth), 
                        ageDate = new Date(difference),
                        calculatedAge=   Math.abs(ageDate.getUTCFullYear() - 1970);

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

                    //ANEXOS
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
                        ds.agentage.val(calculatedAge);
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

                        if (ifUndefinedOrNull(me.datasource.agent_clubs, new Array).length > 0) {
                            $.each(me.datasource.agent_clubs, function (index, ac) {
                                if (country.indexOf(ac.country_name) == -1) {
                                    if(index > 0) {
                                        country += ', ';
                                    }
                                    country += ac.country_name;
                                };
                            });
                        }
                        ds.agentcountry.val(country);
                        
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

                        //ANEXOS
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
                            if (ds.agentname.val() != '' && ds.agentfirstname.val() != '' && ds.agentlastname.val() != ''
                                && ds.agentbirth.val() != '' && ds.agentclub.val() != '0' && ds.agentcontacts.val() != ''
                                && ds.agentcompany.val() != '' && ds.agentnationality.val() != '') {
                                
                                var agent = me.datasource.agent,
                                    agentclubs = me.datasource.agent_clubs.filter(function(ac){ return ac.id_agent ==  agent.id; }),
                                    clubs = new Array(),
                                    difference=new Date() - new Date(ds.agentbirth.val()), 
                                    ageDate = new Date(difference),
                                    calculatedAge=   Math.abs(ageDate.getUTCFullYear() - 1970);                   

                                with(agent) {
                                    name = ds.agentname.val();
                                    club = ds.agentclub.find('option:selected').val();
                                    firstname = ds.agentfirstname.val();
                                    lastname = ds.agentlastname.val();
                                    age = ds.agentage.val(calculatedAge);
                                    birth = (ds.agentbirth.val() != '') ? ds.agentbirth.val() : null;
                                    nationality = ds.agentnationality.val();
                                    passport = ds.agentdocuments.val();
                                    passportval = (ds.agentdocumentsval.val() != '') ? ds.agentdocumentsval.val() : null;
                                    agentcompany = ds.agentcompany.val();
                                    contacts = ds.agentcontacts.val();
                                    obs = ds.agentobs.val();
                                };

                                $.each(ds.ctrclubslist.find('.ddlAgentClub'), function (index, element) {
                                var value = $(element).find('option:selected').val();
                                
                                if (parseInt(value) > 0 && !agentclubs.containsWithField('id_club', parseInt(value))) {
                                    clubs.push(parseInt(value));
                                }
                                });

                                //ANEXOS
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
                                        attachments: me.datasource.selectedattachments
                                    }
                                }, function (data) {
                                    if (ifUndefinedOrNull(data.success, false)) {
                                        controls.feedback.bind({ type: 'success', message: 'Agente editado com sucesso.' });
                                        setTimeout(function(){
                                            window.open('agents_list.php', '_self');
                                         }, 2000);
                                    } else {
                                        controls.feedback.bind({ type: 'error', message: 'Agente não foi editado com sucesso.' });
                                    };
                                }, function () {
                                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                }, function () {
                                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                });
                            } else {
                                controls.feedback.bind({ type: 'warning', message: 'Campos obrigatórios.' });
                            }; 
                        });
                    } else {
                        ds.ctrfiles.remove();

                        //INSERIR AGENTE
                        ds.saveagent.on('click', function(){
                            if (ds.agentname.val() != '' && ds.agentfirstname.val() != '' && ds.agentlastname.val() != ''
                                && ds.agentbirth.val() != '' && ds.agentclub.val() != '0' && ds.agentcontacts.val() != ''
                                && ds.agentcompany.val() != '' && ds.agentnationality.val() != '') {
                                
                                var agent = me.datasource.agent,
                                    difference=new Date() - new Date(ds.agentbirth.val()), 
                                    ageDate = new Date(difference),
                                    calculatedAge=   Math.abs(ageDate.getUTCFullYear() - 1970);                   

                                with(agent) {
                                    age = ds.agentage.val(calculatedAge);
                                    name = ds.agentname.val();
                                    club = ds.agentclub.find('option:selected').val();
                                    firstname = ds.agentfirstname.val();
                                    lastname = ds.agentlastname.val();
                                    birth = (ds.agentbirth.val() != '') ? ds.agentbirth.val() : null;
                                    nationality = ds.agentnationality.val();
                                    passport = ds.agentdocuments.val();
                                    passportval = (ds.agentdocumentsval.val() != '') ? ds.agentdocumentsval.val() : null;
                                    agentcompany = ds.agentcompany.val();
                                    contacts = ds.agentcontacts.val();
                                    obs = ds.agentobs.val();
                                };

                                controls.ajax({
                                    functionname: 'insert_agent',
                                    data: {
                                        agent: agent,
                                        attachments: me.datasource.selectedattachments
                                    }
                                }, function (data) {
                                    if (ifUndefinedOrNull(data.success, false)) {
                                        controls.feedback.bind({ type: 'success', message: 'Agente adicionado com sucesso.' });
                                        setTimeout(function(){
                                            window.open('agents_list.php', '_self');
                                         }, 2000);
                                    } else {
                                        controls.feedback.bind({ type: 'error', message: 'Não foi possível adicionado o agente.' });
                                    };
                                }, function () {
                                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                }, function () {
                                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                });
                            } else {
                                controls.feedback.bind({ type: 'warning', message: 'Campos obrigatórios.' });
                            };
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

            //NOVO TREINADOR
            representationcoachnamenew: $('.txtCoachNameNew'),
            representationcoachfirstnamenew: $('.txtCoachFirstNameNew'),
            representationcoachlastnamenew: $('.txtCoachLastNameNew'),
            representationcoachbirthnew: $('.txtCoachBirthNew'),
            representationcoachnationalitynew: $('.txtCoachNationalityNew'),
            representationcoachheightnew: $('.txtCoachHeightNew'),
            representationcoachweightnew: $('.txtCoachWeightNew'),
            representationcoachformationnew: $('select.ddlCoachFormationNew'),
            representationcoachvaluenew: $('.txtCoachValueNew'),
            representationcoachclubnew: $('.ddlCoachClubNew'),
            representationcoachpassportnew: $('.txtCoachPassportNew'),
            representationcoachpassportvalnew: $('.txtCoachPassportValNew'),

            //EDITAR TREINADOR
            representationcoachnameedit: $('.txtCoachNameEdit'),
            representationcoachfirstnameedit: $('.txtCoachFirstNameEdit'),
            representationcoachlastnameedit: $('.txtCoachLastNameEdit'),
            representationcoachbirthedit: $('.txtCoachBirthEdit'),
            representationcoachnationalityedit: $('.txtCoachNationalityEdit'),
            representationcoachheightedit: $('.txtCoachHeightEdit'),
            representationcoachweightedit: $('.txtCoachWeightEdit'),
            representationcoachformationedit: $('select.ddlCoachFormationEdit'),
            representationcoachclubedit: $('.ddlCoachClubEdit'),
            representationcoachvalueedit: $('.txtCoachValueEdit'),
            representationcoachpassportedit: $('.txtCoachPassportEdit'),
            representationcoachpassportvaledit: $('.txtCoachPassportValEdit'),

            //NOVO CONTRATO DE REPRESENTAÇÃO
            representationfather: $('.txtRepresentationFather'),
            representationmother: $('.txtRepresentationMother'),
            representationdatestart: $('.txtRepresentationDateStart'),
            representationdateend: $('.txtRepresentationDateEnd'),
            representationcommission: $('.txtRepresentationCommission'),
            ctrfiles: $('.ctrFiles'),
            ctruploader: $('.ctrUploader'),

            //BOTÕES
            saverepresentation: $('.btnSaveRepresentation'),
            saverepresentationcoach: $('.btnSaveRepresentationCoach'),
            saveeditplayer: $('.btnSavePlayerEdit'),
            savenewplayer: $('.btnSavePlayerNew'),
            addnewplayer: $('.addNewPlayer'),
            editplayer: $('.editPlayer'),
            saveeditcoach: $('.btnSaveCoachEdit'),
            savenewcoach: $('.btnSaveCoachNew'),
            addnewcoach: $('.addNewCoach'),
            editcoach: $('.editCoach')
        },
        datasource: {
            base: undefined,
            id: ifUndefinedOrNull(args.data.representation_id, 0),
            representation: undefined,
            clubs: new Array(),
            attachments: new Array(),
            selectedattachments: new Array()
        },
        methods: {
            base: undefined,
            getrepresentation: function (after) {
                var me = this.base;

                //[ GET REPRESENTATION ]
                if (ifUndefinedOrNull(me.datasource.id, 0) > 0) {
                    controls.ajax({
                        functionname: 'representation',
                        data: {
                            representation_id: ifUndefinedOrNull(me.datasource.id, 0)
                        }
                    }, function (data) {
                        //[ SET LIST_REPRESENTATION LIST ]
                        me.datasource.representation = data.representation;
                        me.datasource.attachments = data.attachments;

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
                    //[ SET LIST_CLUB LIST ]
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
                    //[ SET LIST_PLAYER LIST ]
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
                    //[ SET LIST_COACH LIST ]
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

                            ds.representationplayerclubedit.append('<option value="0">Selecionar</option>');
                            $.each(clubs.SingleFieldDistinct('country'), function (index, country) {
                                var group = $('<optgroup label="{0}"></optgroup>'.format(country)),
                                    countryclubs = clubs.filter(function(c){ return (c.country == country); });

                                $.each(countryclubs, function (index, club) {
                                    group.append('<option value="{0}">{1}</option>'.format(club.id, club.name_club));
                                });

                                ds.representationplayerclubedit.append(group);
                            });

                            ds.representationcoachclubedit.append('<option value="0">Selecionar</option>');
                            $.each(clubs.SingleFieldDistinct('country'), function (index, country) {
                                var group = $('<optgroup label="{0}"></optgroup>'.format(country)),
                                    countryclubs = clubs.filter(function(c){ return (c.country == country); });

                                $.each(countryclubs, function (index, club) {
                                    group.append('<option value="{0}">{1}</option>'.format(club.id, club.name_club));
                                });

                                ds.representationcoachclubedit.append(group);
                            });

                            //ANEXOS
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
                                ds.representationcoach.val(representation.coach);
                                ds.representationcoach.trigger('change');                               
                                ds.representationfather.val(representation.father);
                                ds.representationmother.val(representation.mother);
                                ds.representationdatestart.val(representation.datestart);
                                ds.representationdateend.val(representation.dateend);
                                ds.representationcommission.val(representation.commission);
                                $('.titleRepresentation').html('EDITAR CONTRATO DE REPRESENTAÇÃO');

                                //ANEXOS
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
                                    if (ds.representationplayer.val() != '0' && ds.representationdatestart.val() != '' 
                                        && ds.representationdateend.val() != '' && ds.representationcommission.val() != '' ) {

                                        var representation = me.datasource.representation,
                                            startdate = (ds.representationdatestart.val() != '') ? new Date(ds.representationdatestart.val()) : new Date(),
                                            enddate = (ds.representationdateend.val() != '') ? new Date(ds.representationdateend.val()) : new Date();   

                                        if (ds.representationdatestart.val() != '' && ds.representationdateend.val() != '' && startdate > enddate) {
                                            controls.feedback.bind({ type: 'warning', message: 'Data de início inferior à data do fim.' });
                                        } else { 

                                            with(representation) {
                                                id = representation.id;
                                                player = ds.representationplayer.find('option:selected').val();
                                                father = ds.representationfather.val();
                                                mother = ds.representationmother.val();
                                                datestart = (ds.representationdatestart.val() != '') ? ds.representationdatestart.val() : null;
                                                dateend = (ds.representationdateend.val() != '') ? ds.representationdateend.val() : null;
                                                commission = ds.representationcommission.val();
                                                child = ds.child.is(':checked') ? 1 : 0;
                                            };

                                            //ANEXOS
                                            if (ifUndefinedOrNull(me.datasource.selectedattachments, new Array()).length > 0) {
                                                $.each(me.datasource.selectedattachments, function (index, attachment) {
                                                    attachment.RepresentationID = representation.id;
                                                });
                                            };

                                            controls.ajax({
                                                functionname: 'update_representation',
                                                data: {
                                                    representation: representation,
                                                    attachments: me.datasource.selectedattachments
                                                }
                                            }, function (data) {
                                                if (ifUndefinedOrNull(data.success, false)) {
                                                    controls.feedback.bind({ type: 'success', message: 'Contrato de representação editado com sucesso.' });
                                                    setTimeout(function(){
                                                        window.open('representation_list.php', '_self');
                                                    }, 2000);
                                                } else {
                                                    controls.feedback.bind({ type: 'error', message: 'Não foi possível editar o contrato de representação.' });
                                                };
                                            }, function () {
                                                controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                            }, function () {
                                                controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                            });
                                        };
                                    } else {
                                        controls.feedback.bind({ type: 'warning', message: 'Campos obrigatórios.' });
                                    };
                                });

                                //EDITAR CONTRATO TREINADOR
                                ds.saverepresentationcoach.on('click', function(){
                                    if (ds.representationcoach.val() != '0' && ds.representationdatestart.val() != '' 
                                        && ds.representationdateend.val() != '' && ds.representationcommission.val() != '' ) {

                                        var representation = me.datasource.representation,
                                            startdate = (ds.representationdatestart.val() != '') ? new Date(ds.representationdatestart.val()) : new Date(),
                                            enddate = (ds.representationdateend.val() != '') ? new Date(ds.representationdateend.val()) : new Date();   

                                        if (ds.representationdatestart.val() != '' && ds.representationdateend.val() != '' && startdate > enddate) {
                                            controls.feedback.bind({ type: 'warning', message: 'Data de início inferior à data do fim.' });
                                        } else { 

                                            with(representation) {
                                                id = representation.id;
                                                coach = ds.representationcoach.find('option:selected').val();
                                                datestart = (ds.representationdatestart.val() != '') ? ds.representationdatestart.val() : null;
                                                dateend = (ds.representationdateend.val() != '') ? ds.representationdateend.val() : null;
                                                commission = ds.representationcommission.val();
                                            };

                                            //ANEXOS
                                            if (ifUndefinedOrNull(me.datasource.selectedattachments, new Array()).length > 0) {
                                                $.each(me.datasource.selectedattachments, function (index, attachment) {
                                                    attachment.RepresentationID = representation.id;
                                                });
                                            };

                                            controls.ajax({
                                                functionname: 'update_representation_coach',
                                                data: {
                                                    representation: representation,
                                                    attachments: me.datasource.selectedattachments
                                                }
                                            }, function (data) {
                                                if (ifUndefinedOrNull(data.success, false)) {
                                                    controls.feedback.bind({ type: 'success', message: 'Contrato de representação editado com sucesso.' });
                                                    setTimeout(function(){
                                                        window.open('representation_list.php', '_self');
                                                    }, 2000);
                                                } else {
                                                    controls.feedback.bind({ type: 'error', message: 'Não foi possível editar o contrato de representação.' });
                                                };
                                            }, function () {
                                                controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                            }, function () {
                                                controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                            });
                                        };
                                    } else {
                                        controls.feedback.bind({ type: 'warning', message: 'Campos obrigatórios.' });
                                    };
                                });

                                ds.addnewplayer.remove();
                                ds.addnewcoach.remove();
                            } else {
                                ds.ctrfiles.remove();
                                ds.editplayer.remove();
                                ds.editcoach.remove();

                                //INSERIR NOVO CONTRATO JOGADOR
                                ds.saverepresentation.on('click', function(){
                                    if (ds.representationplayer.val() != '0' && ds.representationdatestart.val() != '' 
                                        && ds.representationdateend.val() != '' && ds.representationcommission.val() != '' ) {

                                        var representation = me.datasource.representation,
                                            startdate = (ds.representationdatestart.val() != '') ? new Date(ds.representationdatestart.val()) : new Date(),
                                            enddate = (ds.representationdateend.val() != '') ? new Date(ds.representationdateend.val()) : new Date();   

                                        if (ds.representationdatestart.val() != '' && ds.representationdateend.val() != '' && startdate > enddate) {
                                            controls.feedback.bind({ type: 'warning', message: 'Data de início inferior à data do fim.' });
                                        } else { 
                                            
                                            with(representation) {
                                                player = ds.representationplayer.find('option:selected').val();
                                                father = ds.representationfather.val();
                                                mother = ds.representationmother.val();
                                                child = ds.child.is(':checked') ? 1 : 0;
                                                datestart = (ds.representationdatestart.val() != '') ? ds.representationdatestart.val() : null;
                                                dateend = (ds.representationdateend.val() != '') ? ds.representationdateend.val() : null;
                                                commission = ds.representationcommission.val();
                                            };

                                            controls.ajax({
                                                functionname: 'insert_representation',
                                                data: {
                                                    representation: representation,
                                                    attachments: me.datasource.selectedattachments
                                                }
                                            }, function (data) {
                                                if (ifUndefinedOrNull(data.success, false)) {
                                                    controls.feedback.bind({ type: 'success', message: 'Contrato de representação adicionado com sucesso.' });
                                                    setTimeout(function(){
                                                        window.open('representation_list.php', '_self');
                                                    }, 2000);
                                                } else {
                                                    controls.feedback.bind({ type: 'error', message: 'Nao foi possível adicionar o contrato de representação.' });
                                                };
                                            }, function () {
                                                controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                            }, function () {
                                                controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                            });
                                        };
                                    } else {
                                        controls.feedback.bind({ type: 'warning', message: 'Campos obrigatórios.' });
                                    };
                                });

                                //INSERIR NOVO CONTRATO TREINADOR
                                ds.saverepresentationcoach.on('click', function(){
                                    if (ds.representationcoach.val() != '0' && ds.representationdatestart.val() != '' 
                                        && ds.representationdateend.val() != '' && ds.representationcommission.val() != '' ) {

                                        var representation = me.datasource.representation,
                                            startdate = (ds.representationdatestart.val() != '') ? new Date(ds.representationdatestart.val()) : new Date(),
                                            enddate = (ds.representationdateend.val() != '') ? new Date(ds.representationdateend.val()) : new Date();   

                                        if (ds.representationdatestart.val() != '' && ds.representationdateend.val() != '' && startdate > enddate) {
                                            controls.feedback.bind({ type: 'warning', message: 'Data de início inferior à data do fim.' });
                                        } else {    

                                            with(representation) {
                                                coach = ds.representationcoach.find('option:selected').val();
                                                datestart = (ds.representationdatestart.val() != '') ? ds.representationdatestart.val() : null;
                                                dateend = (ds.representationdateend.val() != '') ? ds.representationdateend.val() : null;
                                                commission = ds.representationcommission.val();
                                            };

                                            controls.ajax({
                                                functionname: 'insert_representation_coach',
                                                data: {
                                                    representation: representation,
                                                    attachments: me.datasource.selectedattachments
                                                }
                                            }, function (data) {
                                                if (ifUndefinedOrNull(data.success, false)) {
                                                    controls.feedback.bind({ type: 'success', message: 'Contrato de representação adicionado com sucesso.' });
                                                    setTimeout(function(){
                                                        window.open('representation_list.php', '_self');
                                                     }, 2000);
                                                } else {
                                                    controls.feedback.bind({ type: 'error', message: 'Nao foi possível adicionar o contrato de representação.' });
                                                };
                                            }, function () {
                                                controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                            }, function () {
                                                controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                            });
                                        };
                                    } else {
                                        controls.feedback.bind({ type: 'warning', message: 'Campos obrigatórios.' });
                                    };
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

                                //ADICIONAR JOGADOR
                                ds.addnewplayer.on('click', function(){
                                    ds.representationplayerclubnew.find('option:selected').val();
                                    ds.representationplayernamenew.val('');
                                    ds.representationplayerfirstnamenew.val('');
                                    ds.representationplayerlastnamenew.val('');
                                    ds.representationplayerbirthnew.val('');
                                    ds.representationplayernationalitynew.val('');
                                    ds.representationplayerheightnew.val('');
                                    ds.representationplayerweightnew.val('');
                                    ds.representationplayerfootnew.prev().find('.cs-selected span').html();
                                    ds.representationplayerpositionnew.prev().find('.cs-selected span').html();
                                    ds.representationplayervaluenew.val('');
                                    ds.representationplayerpassportnew.val('');
                                    ds.representationplayerpassportvalnew.val('');
                                });

                                //BOTAO DE SALVAR ADICIONAR JOGADOR
                                ds.savenewplayer.on('click', function(){
                                    if (ds.representationplayernamenew.val() != '' && ds.representationplayerfirstnamenew.val() != '' && ds.representationplayerlastnamenew.val() != ''
                                        && ds.representationplayerbirthnew.val() != '' && ds.representationplayerclubnew.val() != '0' && ds.representationplayerfootnew.val() != ''
                                        && ds.representationplayerheightnew.val() != '' && ds.representationplayernationalitynew.val() != '' && ds.representationplayerpositionnew.val() != ''
                                        && ds.representationplayervaluenew.val() != '' && ds.representationplayerweightnew.val() != '') {
                                            
                                        var player = args.player;       
                                        
                                        with(player) {
                                            club = ds.representationplayerclubnew.find('option:selected').val();
                                            name = ds.representationplayernamenew.val();
                                            firstname = ds.representationplayerfirstnamenew.val();
                                            lastname = ds.representationplayerlastnamenew.val();
                                            birth = (ds.representationplayerbirthnew.val() != '') ? ds.representationplayerbirthnew.val() : null;
                                            nationality = ds.representationplayernationalitynew.val();
                                            height = ds.representationplayerheightnew.val();
                                            weight = ds.representationplayerweightnew.val();
                                            foot = ds.representationplayerfootnew.prev().find('.cs-selected span').html();
                                            position = ds.representationplayerpositionnew.prev().find('.cs-selected span').html();
                                            value = ds.representationplayervaluenew.val();
                                            passport = ds.representationplayerpassportnew.val();
                                            passportval = (ds.representationplayerpassportvalnew.val() != '') ? ds.representationplayerpassportvalnew.val() : null;
                                        };

                                        controls.ajax({
                                            functionname: 'insert_player',
                                            data: {
                                                player: player,
                                                attachments: me.datasource.selectedattachments
                                            }
                                        }, function (data) {
                                            if (ifUndefinedOrNull(data.success, false)) {
                                                controls.feedback.bind({ type: 'success', message: 'Jogador adicionado com sucesso.' });
                                                setTimeout(function(){
                                                    $("[data-dismiss=modal]").trigger({ type: "click" });
                                                    window.location.reload();
                                                 }, 2000);
                                            } else {
                                                controls.feedback.bind({ type: 'error', message: 'Não foi possível adicionar o jogador.' });
                                            };
                                        }, function () {
                                            controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                        }, function () {
                                            controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                        });
                                    } else {
                                        controls.feedback.bind({ type: 'warning', message: 'Campos obrigatórios.' });
                                    };
                                });

                                ds.representationcoachclubnew.append('<option value="0">Selecionar</option>');

                                $.each(clubs.SingleFieldDistinct('country'), function (index, country) {
                                    var group = $('<optgroup label="{0}"></optgroup>'.format(country)),
                                        countryclubs = clubs.filter(function(c){ return (c.country == country); });
            
                                    $.each(countryclubs, function (index, club) {
                                        group.append('<option value="{0}">{1}</option>'.format(club.id, club.name_club));
                                    });
            
                                    ds.representationcoachclubnew.append(group);
                                });

                                //ADICIONAR TREINADOR
                                ds.addnewcoach.on('click', function(){
                                    ds.representationcoachclubnew.find('option:selected').val();
                                    ds.representationcoachfirstnamenew.val('');
                                    ds.representationcoachlastnamenew.val('');
                                    ds.representationcoachbirthnew.val('');
                                    ds.representationcoachnationalitynew.val('');
                                    ds.representationcoachheightnew.val('');
                                    ds.representationcoachweightnew.val('');
                                    ds.representationcoachformationnew.prev().find('.cs-selected span').html();
                                    ds.representationcoachvaluenew.val('');
                                    ds.representationcoachpassportnew.val('');
                                    ds.representationcoachpassportvalnew.val('');
                                });

                                //BOTAO DE SALVAR ADICIONAR TREINADOR
                                ds.savenewcoach.on('click', function(){
                                    if (ds.representationcoachnamenew.val() != '' && ds.representationcoachfirstnamenew.val() != '' && ds.representationcoachlastnamenew.val() != ''
                                        && ds.representationcoachbirthnew.val() != '' && ds.representationcoachclubnew.val() != '0' && ds.representationcoachformationnew.val() != ''
                                        && ds.representationcoachheightnew.val() != '' && ds.representationcoachnationalitynew.val() != '' && ds.representationcoachvaluenew.val() != '' 
                                        && ds.representationcoachweightnew.val() != '') {
                                        
                                        var coach = args.coach;       
                                        
                                        with(coach) {
                                            club = ds.representationcoachclubnew.find('option:selected').val();
                                            name = ds.representationcoachnamenew.val();
                                            firstname = ds.representationcoachfirstnamenew.val();
                                            lastname = ds.representationcoachlastnamenew.val();
                                            birth = (ds.representationcoachbirthnew.val() != '') ? ds.representationcoachbirthnew.val() : null;
                                            nationality = ds.representationcoachnationalitynew.val();
                                            height = ds.representationcoachheightnew.val();
                                            weight = ds.representationcoachweightnew.val();
                                            formation = ds.representationcoachformationnew.prev().find('.cs-selected span').html();
                                            value = ds.representationcoachvaluenew.val();
                                            passport = ds.representationcoachpassportnew.val();
                                            passportval = (ds.representationcoachpassportvalnew.val() != '') ? ds.representationcoachpassportvalnew.val() : null;
                                        };

                                        controls.ajax({
                                            functionname: 'insert_coach',
                                            data: {
                                                coach: coach,
                                                attachments: me.datasource.selectedattachments
                                            }
                                        }, function (data) {
                                            if (ifUndefinedOrNull(data.success, false)) {
                                                controls.feedback.bind({ type: 'success', message: 'Treinador adicionado com sucesso.' });
                                                setTimeout(function(){
                                                    $("[data-dismiss=modal]").trigger({ type: "click" });
                                                    window.location.reload();
                                                 }, 2000);
                                            } else {
                                                controls.feedback.bind({ type: 'error', message: 'Não foi possível adicionar o treinador.' });
                                            };
                                        }, function () {
                                            controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                        }, function () {
                                            controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                        });
                                    } else {
                                        controls.feedback.bind({ type: 'warning', message: 'Campos obrigatórios.' });
                                    };
                                });
                            };   
                            
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

                                $.each(ds.representationplayerfootedit.find('option'), function (index, element) {
                                    if ($(element).html() == representation.foot) {
                                        $(element).attr('selected', 'selected');
                                        ds.representationplayerfootedit.prev().find('li[data-value="{0}"]'.format(ds.representationplayerfootedit.val())).addClass('cs-selected');
                                        return false;
                                    }
                                });
    
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
                                if (ds.representationplayernameedit.val() != '' && ds.representationplayerfirstnameedit.val() != '' && ds.representationplayerlastnameedit.val() != ''
                                    && ds.representationplayerbirthedit.val() != '' && ds.representationplayerclubedit.val() != '0' && ds.representationplayerfootedit.val() != ''
                                    && ds.representationplayerheightedit.val() != '' && ds.representationplayernationalityedit.val() != '' && ds.representationplayerpositionedit.val() != ''
                                    && ds.representationplayervalueedit.val() != '' && ds.representationplayerweightedit.val() != '') {
                                    
                                    var player = args.player;       
                                    
                                    with(player) {
                                        id = representation.player;
                                        club = ds.representationplayerclubedit.find('option:selected').val();
                                        name = ds.representationplayernameedit.val();
                                        firstname = ds.representationplayerfirstnameedit.val();
                                        lastname = ds.representationplayerlastnameedit.val();
                                        birth = (ds.representationplayerbirthedit.val() != '') ? ds.representationplayerbirthedit.val() : null; 
                                        nationality = ds.representationplayernationalityedit.val();
                                        height = ds.representationplayerheightedit.val();
                                        weight = ds.representationplayerweightedit.val();
                                        foot = ds.representationplayerfootedit.prev().find('.cs-selected span').html();
                                        position = ds.representationplayerpositionedit.prev().find('.cs-selected span').html();
                                        value = ds.representationplayervalueedit.val();
                                        passport = ds.representationplayerpassportedit.val();
                                        passportval = (ds.representationplayerpassportvaledit.val() != '') ? ds.representationplayerpassportvaledit.val() : null;
                                    };

                                    controls.ajax({
                                        functionname: 'update_player',
                                        data: {
                                            player: player,
                                            attachments: me.datasource.selectedattachments
                                        }
                                    }, function (data) {
                                        if (ifUndefinedOrNull(data.success, false)) {
                                            controls.feedback.bind({ type: 'success', message: 'Jogador editado com sucesso.' });
                                            setTimeout(function(){
                                                $("[data-dismiss=modal]").trigger({ type: "click" });
                                                window.location.reload();
                                             }, 2000);
                                        } else {
                                            controls.feedback.bind({ type: 'error', message: 'Jogador não foi editado com sucesso.' });
                                        };
                                    }, function () {
                                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                    }, function () {
                                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                    });
                                } else {
                                    controls.feedback.bind({ type: 'warning', message: 'Campos obrigatórios.' });
                                }; 
                            });  

                            //EDITAR DADOS DO TREINADOR
                            ds.editcoach.on('click', function(){
                                ds.representationcoachclubedit.val(representation.club);
                                ds.representationcoachclubedit.trigger('change');
                                ds.representationcoachnameedit.val(representation.name);
                                ds.representationcoachfirstnameedit.val(representation.firstname);
                                ds.representationcoachlastnameedit.val(representation.lastname);
                                ds.representationcoachbirthedit.val(representation.birth);
                                ds.representationcoachnationalityedit.val(representation.nationality);
                                ds.representationcoachheightedit.val(representation.height);
                                ds.representationcoachweightedit.val(representation.weight);
                                ds.representationcoachvalueedit.val(representation.value);
                                ds.representationcoachpassportedit.val(representation.passport);
                                ds.representationcoachpassportvaledit.val(representation.passportval);

                                $.each(ds.representationcoachformationedit.find('option'), function (index, element) {
                                    if ($(element).html() == representation.formation) {
                                        $(element).attr('selected', 'selected');
        
                                        ds.representationcoachformationedit.prev().find('li[data-value="{0}"]'.format(ds.representationcoachformationedit.val())).addClass('cs-selected');
        
                                        return false;
                                    }
                                });
    
                                ds.representationcoachformationedit.prev().find('li[data-value="{0}"]'.format(ds.representationcoachformationedit.val())).trigger('click');
                                ds.representationcoachformationedit.prev().prev().trigger('click');
                                ds.representationcoachformationedit.prev().prev().trigger('click');

                            });
    
                            //BOTAO DE SALVAR EDIÇÃO DE TREINADOR
                            ds.saveeditcoach.on('click', function(){
                                if (ds.representationcoachnameedit.val() != '' && ds.representationcoachfirstnameedit.val() != '' && ds.representationcoachlastnameedit.val() != ''
                                    && ds.representationcoachbirthedit.val() != '' && ds.representationcoachclubedit.val() != '0' && ds.representationcoachformationedit.val() != ''
                                    && ds.representationcoachheightedit.val() != '' && ds.representationcoachnationalityedit.val() != '' && ds.representationcoachvalueedit.val() != '' 
                                    && ds.representationcoachweightedit.val() != '') {
                                    
                                    var coach = args.coach;       
                                    
                                    with(coach) {
                                        id = representation.coach;
                                        club = ds.representationcoachclubedit.find('option:selected').val();
                                        name = ds.representationcoachnameedit.val();
                                        firstname = ds.representationcoachfirstnameedit.val();
                                        lastname = ds.representationcoachlastnameedit.val();
                                        birth = (ds.representationcoachbirthedit.val() != '') ? ds.representationcoachbirthedit.val() : null; 
                                        nationality = ds.representationcoachnationalityedit.val();
                                        height = ds.representationcoachheightedit.val();
                                        weight = ds.representationcoachweightedit.val();
                                        formation = ds.representationcoachformationedit.prev().find('.cs-selected span').html();
                                        value = ds.representationcoachvalueedit.val();
                                        passport = ds.representationcoachpassportedit.val();
                                        passportval = (ds.representationcoachpassportvaledit.val() != '') ? ds.representationcoachpassportvaledit.val() : null;
                                    };

                                    controls.ajax({
                                        functionname: 'update_coach',
                                        data: {
                                            coach: coach,
                                            attachments: me.datasource.selectedattachments
                                        }
                                    }, function (data) {
                                        if (ifUndefinedOrNull(data.success, false)) {
                                            controls.feedback.bind({ type: 'success', message: 'Treinador editado com sucesso.' });
                                            setTimeout(function(){
                                                $("[data-dismiss=modal]").trigger({ type: "click" });
                                                window.location.reload();
                                             }, 2000);
                                        } else {
                                            controls.message.bind({ type: 'error', message: 'Treinador não foi editado com sucesso.' });
                                        };
                                    }, function () {
                                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                    }, function () {
                                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                    });
                                } else {
                                    controls.feedback.bind({ type: 'warning', message: 'Campos obrigatórios.' });
                                }; 
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
            ctrfiles: $('.ctrFiles'),
            ctruploader: $('.ctrUploader'),

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

            //NOVO TREINADOR
            clubcoachclubnew: $('.ddlCoachClubNewClub'),
            clubcoachnamenew: $('.txtCoachNameNewClub'),
            clubcoachfirstnamenew: $('.txtCoachFirstNameNewClub'),
            clubcoachlastnamenew: $('.txtCoachLastNameNewClub'),
            clubcoachbirthnew: $('.txtCoachBirthNewClub'),
            clubcoachnationalitynew: $('.txtCoachNationalityNewClub'),
            clubcoachheightnew: $('.txtCoachHeightNewClub'),
            clubcoachweightnew: $('.txtCoachWeightNewClub'),
            clubcoachformationnew: $('select.ddlCoachFormationNewClub'),
            clubcoachvaluenew: $('.txtCoachValueNewClub'),
            clubcoachpassportnew: $('.txtCoachPassportNewClub'),
            clubcoachpassportvalnew: $('.txtCoachPassportValNewClub'),

            //EDITAR TREINADOR
            clubcoachclubedit: $('.ddlCoachClubEditClub'),
            clubcoachnameedit: $('.txtCoachNameEditClub'),
            clubcoachfirstnameedit: $('.txtCoachFirstNameEditClub'),
            clubcoachlastnameedit: $('.txtCoachLastNameEditClub'),
            clubcoachbirthedit: $('.txtCoachBirthEditClub'),
            clubcoachnationalityedit: $('.txtCoachNationalityEditClub'),
            clubcoachheightedit: $('.txtCoachHeightEditClub'),
            clubcoachweightedit: $('.txtCoachWeightEditClub'),
            clubcoachformationedit: $('select.ddlCoachFormationEditClub'),
            clubcoachvalueedit: $('.txtCoachValueEditClub'),
            clubcoachpassportedit: $('.txtCoachPassportEditClub'),
            clubcoachpassportvaledit: $('.txtCoachPassportValEditClub'),

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
            saveeditcoachclub: $('.btnSaveCoachEditClub'),
            savenewcoachclub: $('.btnSaveCoachNewClub'),
            addnewcoachclub: $('.addNewCoachClub'),
            editcoachclub: $('.editCoachClub'),
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
            attachments: new Array(),
            selectedattachments: new Array()
        },
        methods: {
            base: undefined,
            getclub: function (after) {
                var me = this.base;

                //[ GET CLUB ]
                if (ifUndefinedOrNull(me.datasource.id, 0) > 0) {
                    controls.ajax({
                        functionname: 'club',
                        data: {
                            club_id: ifUndefinedOrNull(me.datasource.id, 0)
                        }
                    }, function (data) {
                        //[ SET LIST_CLUB LIST ]
                        me.datasource.club = data.club;
                        me.datasource.attachments = data.attachments;

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
                    //[ SET LIST_CLUBS LIST ]
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
                    //[ SET LIST_PLAYER LIST ]
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
                    //[ SET LIST_COACH LIST ]
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
                            
                            ds.clubplayerclubedit.append('<option value="0">Selecionar</option>');
                            $.each(list_clubs.SingleFieldDistinct('country'), function (index, country) {
                                var group = $('<optgroup label="{0}"></optgroup>'.format(country)),
                                    countryclubs = list_clubs.filter(function(c){ return (c.country == country); });

                                $.each(countryclubs, function (index, club) {
                                    group.append('<option value="{0}">{1}</option>'.format(club.id, club.name_club));
                                });

                                ds.clubplayerclubedit.append(group);
                            });

                            ds.clubcoachclubedit.append('<option value="0">Selecionar</option>');
                            $.each(list_clubs.SingleFieldDistinct('country'), function (index, country) {
                                var group = $('<optgroup label="{0}"></optgroup>'.format(country)),
                                    countryclubs = list_clubs.filter(function(c){ return (c.country == country); });

                                $.each(countryclubs, function (index, club) {
                                    group.append('<option value="{0}">{1}</option>'.format(club.id, club.name_club));
                                });

                                ds.clubcoachclubedit.append(group);
                            });

                            //ANEXOS
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

                            //DADOS DO CONTRATO JOGADOR
                            if (clubs.id > 0) {
                                ds.clubplayer.val(clubs.player);
                                ds.clubplayer.trigger('change');
                                ds.clubcoach.val(clubs.coach);
                                ds.clubcoach.trigger('change');
                                ds.clubclub.val(clubs.club);
                                ds.clubclub.trigger('change');
                                ds.clubdatestart.val(clubs.datestart);
                                ds.clubdateend.val(clubs.dateend);
                                ds.clubvalue.val(clubs.valuecontract);
                                ds.clubclause.val(clubs.clause);
                                ds.clubbonus.val(clubs.bonus);
                                ds.clubcourt.val(clubs.court);
                                ds.clubobs.val(clubs.obs);
                                $('.titleClub').html('EDITAR CONTRATO DE CLUBES');

                                //ANEXOS
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

                                //EDITAR CONTRATO CLUBES JOGADORES
                                ds.saveclub.on('click', function(){
                                    if (ds.clubplayer.val() != '0' && ds.clubdatestart.val() != '' && ds.clubclause.val() != ''
                                        && ds.clubdateend.val() != '' && ds.clubvalue.val() != '' && ds.clubcourt.val() != ''
                                        && ds.clubbonus.val() != '' && ds.clubclub.val() != '0') {
                                        
                                        var club = me.datasource.club,
                                            startdate = (ds.clubdatestart.val() != '') ? new Date(ds.clubdatestart.val()) : new Date(),
                                            enddate = (ds.clubdateend.val() != '') ? new Date(ds.clubdateend.val()) : new Date();

                                        if (ds.clubdatestart.val() != '' && ds.clubdateend.val() != '' && startdate > enddate) {
                                            controls.feedback.bind({ type: 'warning', message: 'Data de início inferior à data do fim.' });
                                        } else {

                                            with(club) {
                                                player = ds.clubplayer.find('option:selected').val();
                                                club = ds.clubclub.find('option:selected').val();
                                                datestart = (ds.clubdatestart.val() != '') ? ds.clubdatestart.val() : null;
                                                dateend = (ds.clubdateend.val() != '') ? ds.clubdateend.val() : null;
                                                valuecontract = ds.clubvalue.val();
                                                clause = ds.clubclause.val();
                                                bonus = ds.clubbonus.val();
                                                court = ds.clubcourt.val();
                                                obs = ds.clubobs.val();
                                            };

                                            //ANEXOS
                                            if (ifUndefinedOrNull(me.datasource.selectedattachments, new Array()).length > 0) {
                                                $.each(me.datasource.selectedattachments, function (index, attachment) {
                                                    attachment.ClubID = club.id;
                                                });
                                            };

                                            controls.ajax({
                                                functionname: 'update_club',
                                                data: {
                                                    club: club,
                                                    attachments: me.datasource.selectedattachments
                                                }
                                            }, function (data) {
                                                if (ifUndefinedOrNull(data.success, false)) {
                                                    controls.feedback.bind({ type: 'success', message: 'Contrato de clube editado com sucesso.' });
                                                    setTimeout(function(){
                                                        window.open('clubs_list.php', '_self');
                                                    }, 2000);
                                                } else {
                                                    controls.feedback.bind({ type: 'error', message: 'Não foi possível editar o contrato de clube.' });
                                                };
                                            }, function () {
                                                controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                            }, function () {
                                                controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                            });
                                        };
                                    } else {
                                        controls.feedback.bind({ type: 'warning', message: 'Campos obrigatórios.' });
                                    };
                                });

                                //EDITAR CONTRATO CLUBES TREINADORE
                                ds.saveclubcoach.on('click', function(){
                                    if (ds.clubcoach.val() != '0' && ds.clubdatestart.val() != '' && ds.clubclause.val() != ''
                                        && ds.clubdateend.val() != '' && ds.clubvalue.val() != '' && ds.clubcourt.val() != ''
                                        && ds.clubbonus.val() != '' && ds.clubclub.val() != '0') {
                                        
                                        var club = me.datasource.club,
                                            startdate = (ds.clubdatestart.val() != '') ? new Date(ds.clubdatestart.val()) : new Date(),
                                            enddate = (ds.clubdateend.val() != '') ? new Date(ds.clubdateend.val()) : new Date();

                                        if (ds.clubdatestart.val() != '' && ds.clubdateend.val() != '' && startdate > enddate) {
                                            controls.feedback.bind({ type: 'warning', message: 'Data de início inferior à data do fim.' });
                                        } else {                                   

                                            with(club) {
                                                coach = ds.clubcoach.find('option:selected').val();
                                                club = ds.clubclub.find('option:selected').val();
                                                datestart = (ds.clubdatestart.val() != '') ? ds.clubdatestart.val() : null;
                                                dateend = (ds.clubdateend.val() != '') ? ds.clubdateend.val() : null;
                                                valuecontract = ds.clubvalue.val();
                                                clause = ds.clubclause.val();
                                                bonus = ds.clubbonus.val();
                                                court = ds.clubcourt.val();
                                                obs = ds.clubobs.val();
                                            };

                                            //ANEXOS
                                            if (ifUndefinedOrNull(me.datasource.selectedattachments, new Array()).length > 0) {
                                                $.each(me.datasource.selectedattachments, function (index, attachment) {
                                                    attachment.ClubID = club.id;
                                                });
                                            };

                                            controls.ajax({
                                                functionname: 'update_club_coach',
                                                data: {
                                                    club: club,
                                                    attachments: me.datasource.selectedattachments
                                                }
                                            }, function (data) {
                                                if (ifUndefinedOrNull(data.success, false)) {
                                                    controls.feedback.bind({ type: 'success', message: 'Contrato de clube editado com sucesso.' });
                                                    setTimeout(function(){
                                                        window.open('clubs_list.php', '_self');
                                                    }, 2000);
                                                } else {
                                                    controls.feedback.bind({ type: 'error', message: 'Não foi possível editar o contrato de clube.' });
                                                };
                                            }, function () {
                                                controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                            }, function () {
                                                controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                            });
                                        };
                                    } else {
                                        controls.feedback.bind({ type: 'warning', message: 'Campos obrigatórios.' });
                                    };
                                });

                                ds.addnewplayerclub.remove();
                                ds.addnewcoachclub.remove();
                            } else {
                                ds.ctrfiles.remove();
                                ds.editplayerclub.remove();
                                ds.editcoachclub.remove();

                                //INSERIR NOVO CONTRATO CLUBES JOGADORES
                                ds.saveclub.on('click', function(){
                                    if (ds.clubplayer.val() != '0' && ds.clubdatestart.val() != '' && ds.clubclause.val() != ''
                                        && ds.clubdateend.val() != '' && ds.clubvalue.val() != '' && ds.clubcourt.val() != ''
                                        && ds.clubbonus.val() != '' && ds.clubclub.val() != '0') {
                                        
                                        var club = me.datasource.club,
                                            startdate = (ds.clubdatestart.val() != '') ? new Date(ds.clubdatestart.val()) : new Date(),
                                            enddate = (ds.clubdateend.val() != '') ? new Date(ds.clubdateend.val()) : new Date();

                                        if (ds.clubdatestart.val() != '' && ds.clubdateend.val() != '' && startdate > enddate) {
                                            controls.feedback.bind({ type: 'warning', message: 'Data de início inferior à data do fim.' });
                                        } else {                                                                        

                                            with(club) {
                                                player = ds.clubplayer.find('option:selected').val();
                                                club = ds.clubclub.find('option:selected').val();
                                                datestart = (ds.clubdatestart.val() != '') ? ds.clubdatestart.val() : null;
                                                dateend = (ds.clubdateend.val() != '') ? ds.clubdateend.val() : null;
                                                valuecontract = ds.clubvalue.val();
                                                clause = ds.clubclause.val();
                                                bonus = ds.clubbonus.val();
                                                court = ds.clubcourt.val();
                                                obs = ds.clubobs.val();
                                            };

                                            controls.ajax({
                                                functionname: 'insert_club',
                                                data: {
                                                    club: club,
                                                    attachments: me.datasource.selectedattachments
                                                }
                                            }, function (data) {
                                                if (ifUndefinedOrNull(data.success, false)) {
                                                    controls.feedback.bind({ type: 'success', message: 'Contrato de clube adicionado com sucesso.' });
                                                    setTimeout(function(){
                                                        window.open('clubs_list.php', '_self');
                                                    }, 2000);
                                                } else {
                                                    controls.feedback.bind({ type: 'error', message: 'Nao foi possível adicionar o contrato de clube.' });
                                                };
                                            }, function () {
                                                controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                            }, function () {
                                                controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                            });
                                        };
                                    } else {
                                        controls.feedback.bind({ type: 'warning', message: 'Campos obrigatórios.' });
                                    };
                                });

                                //INSERIR NOVO CONTRATO CLUBES TREINADOR
                                ds.saveclubcoach.on('click', function(){
                                    if (ds.clubcoach.val() != '0' && ds.clubdatestart.val() != '' && ds.clubclause.val() != ''
                                        && ds.clubdateend.val() != '' && ds.clubvalue.val() != '' && ds.clubcourt.val() != ''
                                        && ds.clubbonus.val() != '' && ds.clubclub.val() != '0') {
                                        
                                        var club = me.datasource.club,
                                            startdate = (ds.clubdatestart.val() != '') ? new Date(ds.clubdatestart.val()) : new Date(),
                                            enddate = (ds.clubdateend.val() != '') ? new Date(ds.clubdateend.val()) : new Date();

                                        if (ds.clubdatestart.val() != '' && ds.clubdateend.val() != '' && startdate > enddate) {
                                            controls.feedback.bind({ type: 'warning', message: 'Data de início inferior à data do fim.' });
                                        } else {      

                                            with(club) {
                                                coach = ds.clubcoach.find('option:selected').val();
                                                club = ds.clubclub.find('option:selected').val();
                                                datestart = (ds.clubdatestart.val() != '') ? ds.clubdatestart.val() : null;
                                                dateend = (ds.clubdateend.val() != '') ? ds.clubdateend.val() : null;
                                                valuecontract = ds.clubvalue.val();
                                                clause = ds.clubclause.val();
                                                bonus = ds.clubbonus.val();
                                                court = ds.clubcourt.val();
                                                obs = ds.clubobs.val();
                                            };

                                            controls.ajax({
                                                functionname: 'insert_club_coach',
                                                data: {
                                                    club: club,
                                                    attachments: me.datasource.selectedattachments
                                                }
                                            }, function (data) {
                                                if (ifUndefinedOrNull(data.success, false)) {
                                                    controls.feedback.bind({ type: 'success', message: 'Contrato de clube adicionado com sucesso.' });
                                                    setTimeout(function(){
                                                        window.open('clubs_list.php', '_self');
                                                    }, 2000);
                                                } else {
                                                    controls.feedback.bind({ type: 'error', message: 'Nao foi possível adicionar o contrato de clube.' });
                                                };
                                            }, function () {
                                                controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                            }, function () {
                                                controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                            });
                                        };
                                    } else {
                                        controls.feedback.bind({ type: 'warning', message: 'Campos obrigatórios.' });
                                    };
                                });

                                ds.clubplayerclubnew.append('<option value="0">Selecionar</option>');
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
                                    ds.clubplayerclubnew.find('option:selected').val();
                                    ds.clubplayernamenew.val('');
                                    ds.clubplayerfirstnamenew.val('');
                                    ds.clubplayerlastnamenew.val('');
                                    ds.clubplayerbirthnew.val('');
                                    ds.clubplayernationalitynew.val('');
                                    ds.clubplayerheightnew.val('');
                                    ds.clubplayerweightnew.val('');
                                    ds.clubplayerfootnew.prev().find('.cs-selected span').html();
                                    ds.clubplayerpositionnew.prev().find('.cs-selected span').html();
                                    ds.clubplayervaluenew.val('');
                                    ds.clubplayerpassportnew.val('');
                                    ds.clubplayerpassportvalnew.val('');
                                });

                                //BOTAO DE SALVAR ADICIONAR JOGADOR
                                ds.savenewplayerclub.on('click', function(){
                                    if (ds.clubplayernamenew.val() != '' && ds.clubplayerfirstnamenew.val() != '' && ds.clubplayerlastnamenew.val() != ''
                                        && ds.clubplayerbirthnew.val() != '' && ds.clubplayerclubnew.val() != '0' && ds.clubplayerfootnew.val() != ''
                                        && ds.clubplayerheightnew.val() != '' && ds.clubplayernationalitynew.val() != '' && ds.clubplayerpositionnew.val() != ''
                                        && ds.clubplayervaluenew.val() != '' && ds.clubplayerweightnew.val() != '') {
                                        
                                        var player = args.player;       
                                        
                                        with(player) {
                                            name = ds.clubplayernamenew.val();
                                            club = ds.clubplayerclubnew.find('option:selected').val();
                                            firstname = ds.clubplayerfirstnamenew.val();
                                            lastname = ds.clubplayerlastnamenew.val();
                                            birth = (ds.clubplayerbirthnew.val() != '') ? ds.clubplayerbirthnew.val() : null;
                                            nationality = ds.clubplayernationalitynew.val();
                                            height = ds.clubplayerheightnew.val();
                                            weight = ds.clubplayerweightnew.val();
                                            foot = ds.clubplayerfootnew.prev().find('.cs-selected span').html();
                                            position = ds.clubplayerpositionnew.prev().find('.cs-selected span').html();
                                            value = ds.clubplayervaluenew.val();
                                            passport = ds.clubplayerpassportnew.val();
                                            passportval = (ds.clubplayerpassportvalnew.val() != '') ? ds.clubplayerpassportvalnew.val() : null;
                                        };

                                        controls.ajax({
                                            functionname: 'insert_player',
                                            data: {
                                                player: player,
                                                attachments: me.datasource.selectedattachments
                                            }
                                        }, function (data) {
                                            if (ifUndefinedOrNull(data.success, false)) {                                            
                                                controls.feedback.bind({ type: 'success', message: 'Jogador adicionado com sucesso.' });
                                                setTimeout(function(){
                                                    $("[data-dismiss=modal]").trigger({ type: "click" });
                                                    window.location.reload();
                                                 }, 2000);
                                            } else {
                                                controls.feedback.bind({ type: 'error', message: 'Não foi possível adicionar o jogador.' });
                                            };
                                        }, function () {
                                            controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                        }, function () {
                                            controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                        });
                                    } else {
                                        controls.feedback.bind({ type: 'warning', message: 'Campos obrigatórios.' });
                                    };
                                });

                                ds.clubcoachclubnew.append('<option value="0">Selecionar</option>');
                                $.each(list_clubs.SingleFieldDistinct('country'), function (index, country) {
                                    var group = $('<optgroup label="{0}"></optgroup>'.format(country)),
                                        countryclubs = list_clubs.filter(function(c){ return (c.country == country); });
            
                                    $.each(countryclubs, function (index, club) {
                                        group.append('<option value="{0}">{1}</option>'.format(club.id, club.name_club));
                                    });
            
                                    ds.clubcoachclubnew.append(group);
                                });

                                //ADICIONAR TREINADOR
                                ds.addnewcoachclub.on('click', function(){
                                    ds.clubcoachclubnew.find('option:selected').val();
                                    ds.clubcoachclubnew.trigger('change');
                                    ds.clubcoachnamenew.val('');
                                    ds.clubcoachfirstnamenew.val('');
                                    ds.clubcoachlastnamenew.val('');
                                    ds.clubcoachbirthnew.val('');
                                    ds.clubcoachnationalitynew.val('');
                                    ds.clubcoachheightnew.val('');
                                    ds.clubcoachweightnew.val('');
                                    ds.clubcoachformationnew.prev().find('.cs-selected span').html();
                                    ds.clubcoachvaluenew.val('');
                                    ds.clubcoachpassportnew.val('');
                                    ds.clubcoachpassportvalnew.val('');
                                });

                                //BOTAO DE SALVAR ADICIONAR TREINADOR
                                ds.savenewcoachclub.on('click', function(){
                                    if (ds.clubcoachnamenew.val() != '' && ds.clubcoachfirstnamenew.val() != '' && ds.clubcoachlastnamenew.val() != ''
                                        && ds.clubcoachbirthnew.val() != '' && ds.clubcoachclubnew.val() != '0' && ds.clubcoachformationnew.val() != ''
                                        && ds.clubcoachheightnew.val() != '' && ds.clubcoachnationalitynew.val() != '' && ds.clubcoachvaluenew.val() != '' 
                                        && ds.clubcoachweightnew.val() != '') {
                                        
                                        var coach = args.coach;       
                                        
                                        with(coach) {
                                            name = ds.clubcoachnamenew.val();
                                            club = ds.clubcoachclubnew.find('option:selected').val();
                                            firstname = ds.clubcoachfirstnamenew.val();
                                            lastname = ds.clubcoachlastnamenew.val();
                                            birth = (ds.clubcoachbirthnew.val() != '') ? ds.clubcoachbirthnew.val() : null;
                                            nationality = ds.clubcoachnationalitynew.val();
                                            height = ds.clubcoachheightnew.val();
                                            weight = ds.clubcoachweightnew.val();
                                            formation = ds.clubcoachformationnew.prev().find('.cs-selected span').html();
                                            value = ds.clubcoachvaluenew.val();
                                            passport = ds.clubcoachpassportnew.val();
                                            passportval = (ds.clubcoachpassportvalnew.val() != '') ? ds.clubcoachpassportvalnew.val() : null;
                                        };

                                        controls.ajax({
                                            functionname: 'insert_coach',
                                            data: {
                                                coach: coach,
                                                attachments: me.datasource.selectedattachments
                                            }
                                        }, function (data) {
                                            if (ifUndefinedOrNull(data.success, false)) {                                            
                                                controls.feedback.bind({ type: 'success', message: 'Treinador adicionado com sucesso' });
                                                setTimeout(function(){
                                                    $("[data-dismiss=modal]").trigger({ type: "click" });
                                                    window.location.reload();
                                                 }, 2000);
                                            } else {
                                                controls.feedback.bind({ type: 'error', message: 'Não foi possível adicionar o treinador.' });
                                            };
                                        }, function () {
                                            controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                        }, function () {
                                            controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                        });
                                    } else {
                                        controls.feedback.bind({ type: 'warning', message: 'Campos obrigatórios.' });
                                    };
                                });
                                
                                
                            };             

                            //EDITAR DADOS DO JOGADOR
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
                                ds.clubplayervalueedit.val(clubs.value);
                                ds.clubplayerpassportedit.val(clubs.passport);
                                ds.clubplayerpassportvaledit.val(clubs.passportval);

                                $.each(ds.clubplayerfootedit.find('option'), function (index, element) {
                                    if ($(element).html() == clubs.foot) {
                                        $(element).attr('selected', 'selected');
                                        ds.clubplayerfootedit.prev().find('li[data-value="{0}"]'.format(ds.clubplayerfootedit.val())).addClass('cs-selected');
                                        return false;
                                    }
                                });
    
                                ds.clubplayerfootedit.prev().find('li[data-value="{0}"]'.format(ds.clubplayerfootedit.val())).trigger('click');
                                ds.clubplayerfootedit.prev().prev().trigger('click');
        
                                $.each(ds.clubplayerpositionedit.find('option'), function (index, element) {
                                    if ($(element).html() == clubs.position) {
                                        $(element).attr('selected', 'selected');
                                        ds.clubplayerpositionedit.prev().find('li[data-value="{0}"]'.format(ds.clubplayerpositionedit.val())).addClass('cs-selected');
                                        return false;
                                    }
                                });
        
                                ds.clubplayerpositionedit.prev().find('li[data-value="{0}"]'.format(ds.clubplayerpositionedit.val())).trigger('click');
                                ds.clubplayerpositionedit.prev().prev().trigger('click');
                            });

                            //BOTAO DE SALVAR EDIÇÃO DE JOGADOR
                            ds.saveeditplayerclub.on('click', function(){
                                if (ds.clubplayernameedit.val() != '' && ds.clubplayerfirstnameedit.val() != '' && ds.clubplayerlastnameedit.val() != ''
                                    && ds.clubplayerbirthedit.val() != '' && ds.clubplayerclubedit.val() != '0' && ds.clubplayerfootedit.val() != ''
                                    && ds.clubplayerheightedit.val() != '' && ds.clubplayernationalityedit.val() != '' && ds.clubplayerpositionedit.val() != ''
                                    && ds.clubplayervalueedit.val() != '' && ds.clubplayerweightedit.val() != '') {
                                    
                                    var player = args.player;       
                                    
                                    with(player) {
                                        id = clubs.player;
                                        club = ds.clubplayerclubedit.find('option:selected').val();
                                        name = ds.clubplayernameedit.val();
                                        firstname = ds.clubplayerfirstnameedit.val();
                                        lastname = ds.clubplayerlastnameedit.val();
                                        birth = (ds.clubplayerbirthedit.val() != '') ? ds.clubplayerbirthedit.val() : null;
                                        nationality = ds.clubplayernationalityedit.val();
                                        height = ds.clubplayerheightedit.val();
                                        weight = ds.clubplayerweightedit.val();
                                        foot = ds.clubplayerfootedit.prev().find('.cs-selected span').html();
                                        position = ds.clubplayerpositionedit.prev().find('.cs-selected span').html();
                                        value = ds.clubplayervalueedit.val();
                                        passport = ds.clubplayerpassportedit.val();
                                        passportval = (ds.clubplayerpassportvaledit.val() != '') ? ds.clubplayerpassportvaledit.val() : null;
                                    };

                                    controls.ajax({
                                        functionname: 'update_player',
                                        data: {
                                            player: player,
                                            attachments: me.datasource.selectedattachments
                                        }
                                    }, function (data) {
                                        if (ifUndefinedOrNull(data.success, false)) {                                        
                                            controls.feedback.bind({ type: 'success', message: 'Jogador editado com sucesso.' });
                                            setTimeout(function(){
                                                $("[data-dismiss=modal]").trigger({ type: "click" });
                                                window.location.reload();
                                             }, 2000);
                                        } else {
                                            controls.feedback.bind({ type: 'error', message: 'Jogador não foi editado com sucesso.' });
                                        };
                                    }, function () {
                                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                    }, function () {
                                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                    });
                                } else {
                                    controls.feedback.bind({ type: 'warning', message: 'Campos obrigatórios.' });
                                };
                            });
                            
                            //EDITAR DADOS DO TREINADOR
                            ds.editcoachclub.on('click', function(){
                                ds.clubcoachclubedit.val(clubs.club);
                                ds.clubcoachclubedit.trigger('change');
                                ds.clubcoachnameedit.val(clubs.name);
                                ds.clubcoachfirstnameedit.val(clubs.firstname);
                                ds.clubcoachlastnameedit.val(clubs.lastname);
                                ds.clubcoachbirthedit.val(clubs.birth);
                                ds.clubcoachnationalityedit.val(clubs.nationality);
                                ds.clubcoachheightedit.val(clubs.height);
                                ds.clubcoachweightedit.val(clubs.weight);
                                ds.clubcoachvalueedit.val(clubs.value);
                                ds.clubcoachpassportedit.val(clubs.passport);
                                ds.clubcoachpassportvaledit.val(clubs.passportval);

                                $.each(ds.clubcoachformationedit.find('option'), function (index, element) {
                                    if ($(element).html() == clubs.formation) {
                                        $(element).attr('selected', 'selected');
                                        ds.clubcoachformationedit.prev().find('li[data-value="{0}"]'.format(ds.clubcoachformationedit.val())).addClass('cs-selected');  
                                        return false;
                                    }
                                });
                                ds.clubcoachformationedit.prev().find('li[data-value="{0}"]'.format(ds.clubcoachformationedit.val())).trigger('click');
                                ds.clubcoachformationedit.prev().prev().trigger('click');
                            });

                            //BOTAO DE SALVAR EDIÇÃO DE TREINADOR
                            ds.saveeditcoachclub.on('click', function(){
                                if (ds.clubcoachnameedit.val() != '' && ds.clubcoachfirstnameedit.val() != '' && ds.clubcoachlastnameedit.val() != ''
                                    && ds.clubcoachbirthedit.val() != '' && ds.clubcoachclubedit.val() != '0' && ds.clubcoachformationedit.val() != ''
                                    && ds.clubcoachheightedit.val() != '' && ds.clubcoachnationalityedit.val() != '' && ds.clubcoachvalueedit.val() != '' 
                                    && ds.clubcoachweightedit.val() != '') {

                                    var coach = args.coach;       
                                    
                                    with(coach) {
                                        id = clubs.coach;
                                        club = ds.clubcoachclubedit.find('option:selected').val();
                                        name = ds.clubcoachnameedit.val();
                                        firstname = ds.clubcoachfirstnameedit.val();
                                        lastname = ds.clubcoachlastnameedit.val();
                                        birth = (ds.clubcoachbirthedit.val() != '') ? ds.clubcoachbirthedit.val() : null; 
                                        nationality = ds.clubcoachnationalityedit.val();
                                        height = ds.clubcoachheightedit.val();
                                        weight = ds.clubcoachweightedit.val();
                                        formation = ds.clubcoachformationedit.prev().find('.cs-selected span').html();
                                        value = ds.clubcoachvalueedit.val();
                                        passport = ds.clubcoachpassportedit.val();
                                        passportval = (ds.clubcoachpassportvaledit.val() != '') ? ds.clubcoachpassportvaledit.val() : null;
                                    };

                                    controls.ajax({
                                        functionname: 'update_coach',
                                        data: {
                                            coach: coach,
                                            attachments: me.datasource.selectedattachments
                                        }
                                    }, function (data) {
                                        if (ifUndefinedOrNull(data.success, false)) {                                        
                                            controls.feedback.bind({ type: 'success', message: 'Treinador editado com sucesso.' });
                                            setTimeout(function(){
                                                $("[data-dismiss=modal]").trigger({ type: "click" });
                                                window.location.reload();
                                             }, 2000);
                                        } else {
                                            controls.feedback.bind({ type: 'error', message: 'Treinador não foi editado com sucesso.' });
                                        };
                                    }, function () {
                                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                    }, function () {
                                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                    });
                                } else {
                                    controls.feedback.bind({ type: 'warning', message: 'Campos obrigatórios.' });
                                }; 
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
            //NOVO JOGADOR
            mandateplayerclubnew: $('.ddlPlayerMandateNew'),
            mandateplayernamenew: $('.txtPlayerNameNewMandate'),
            mandateplayerfirstnamenew: $('.txtPlayerFirstNameNewMandate'),
            mandateplayerlastnamenew: $('.txtPlayerLastNameNewMandate'),
            mandateplayerbirthnew: $('.txtPlayerBirthNewMandate'),
            mandateplayernationalitynew: $('.txtPlayerNationalityNewMandate'),
            mandateplayerheightnew: $('.txtPlayerHeightNewMandate'),
            mandateplayerweightnew: $('.txtPlayerWeightNewMandate'),
            mandateplayerpositionnew: $('select.ddlPlayerPositionNewMandate'),
            mandateplayerfootnew: $('select.ddlPlayerFootNewMandate'),
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
            mandateplayerpositionedit: $('select.ddlPlayerPositionEditMandate'),
            mandateplayerfootedit: $('select.ddlPlayerFootEditMandate'),
            mandateplayerclubedit: $('.ddlPlayerMandateEdit'),
            mandateplayervalueedit: $('.txtPlayerValueEditMandate'),
            mandateplayerpassportedit: $('.txtPlayerPassportEditMandate'),
            mandateplayerpassportvaledit: $('.txtPlayerPassportValEditMandate'),

            //NOVO TREINADOR
            mandatecoachclubnew: $('.ddlCoachMandateNew'),
            mandatecoachnamenew: $('.txtCoachNameNewMandate'),
            mandatecoachfirstnamenew: $('.txtCoachFirstNameNewMandate'),
            mandatecoachlastnamenew: $('.txtCoachLastNameNewMandate'),
            mandatecoachbirthnew: $('.txtCoachBirthNewMandate'),
            mandatecoachnationalitynew: $('.txtCoachNationalityNewMandate'),
            mandatecoachheightnew: $('.txtCoachHeightNewMandate'),
            mandatecoachweightnew: $('.txtCoachWeightNewMandate'),
            mandatecoachformationnew: $('select.ddlCoachFormationNewMandate'),
            mandatecoachvaluenew: $('.txtCoachValueNewMandate'),
            mandatecoachpassportnew: $('.txtCoachPassportNewMandate'),
            mandatecoachpassportvalnew: $('.txtCoachPassportValNewMandate'),

            //EDITAR TREINADOR
            mandatecoachnameedit: $('.txtCoachNameEditMandate'),
            mandatecoachfirstnameedit: $('.txtCoachFirstNameEditMandate'),
            mandatecoachlastnameedit: $('.txtCoachLastNameEditMandate'),
            mandatecoachbirthedit: $('.txtCoachBirthEditMandate'),
            mandatecoachnationalityedit: $('.txtCoachNationalityEditMandate'),
            mandatecoachheightedit: $('.txtCoachHeightEditMandate'),
            mandatecoachweightedit: $('.txtCoachWeightEditMandate'),
            mandatecoachformationedit: $('select.ddlCoachFormationEditMandate'),
            mandatecoachclubedit: $('.ddlCoachMandateEdit'),
            mandatecoachvalueedit: $('.txtCoachValueEditMandate'),
            mandatecoachpassportedit: $('.txtCoachPassportEditMandate'),
            mandatecoachpassportvaledit: $('.txtCoachPassportValEditMandate'),

            //NOVO AGENTE
            mandateagentclubnew: $('.ddlAgentClubNewMandate'),
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
            mandateagentclubedit: $('.ddlAgentClubEditMandate'),
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
            
            //MANDATO
            mandateplayer: $('select.ddlMandatePlayer'),
            mandatecoach: $('select.ddlMandateCoach'),
            mandateagent: $('select.ddlMandateAgent'),
            mandatedatestart: $('.txtMandatesDateStart'),
            mandatedateend: $('.txtMandatesDateEnd'),
            mandatecompany: $('.txtMandatesCompany'),
            mandatecountry: $('.txtMandatesCountry'),
            mandateclub: $('.txtMandatesClub'),
            mandateobs: $('.txtMandatesObs'),
            ctrfiles: $('.ctrFiles'), 
            ctruploader: $('.ctrUploader'), 

            //BOTÕES
            ctragentslist: $('.ctrAgentsList'),
            btnaddagent: $('.btnAddAgent'),
            btndeleteagent: $('.btnDeleteAgent'),

            savemandates: $('.btnSaveMandates'),
            savecoachmandates: $('.btnSaveCoachMandates'),

            saveeditplayermandate: $('.btnSavePlayerEditMandate'),
            savenewplayermandate: $('.btnSavePlayerNewMandate'),
            addnewplayermandate: $('.addNewPlayer'),
            editplayermandate: $('.editPlayer'),
            
            saveeditcoachmandate: $('.btnSaveCoachEdit'),
            savenewcoachmandate: $('.btnSaveCoachNew'),
            addnewcoachmandate: $('.addNewCoach'),
            editcoachmandate: $('.editCoach'),

            saveeditagentmandate: $('.btnSaveAgentEditMandate'),
            savenewagentmandate: $('.btnSaveAgentNewMandate'),
            addnewagentmandate: $('.addNewAgentMandate'),
            editagentmandate: $('.editAgentMandate'),
            ctrclubslistnew: $('.ctrClubsListNew'),
            btnaddclubnew: $('.btnAddClubNew'),
            btndeleteclubnew: $('.btnDeleteClubNew'),
            ctrclubslistedit: $('.ctrClubsListEdit'),
            btnaddclubedit: $('.btnAddClubEdit'),
            btndeleteclubedit: $('.btnDeleteClubEdit')
        },
        datasource: {
            base: undefined,
            id: ifUndefinedOrNull(args.data.mandates_id, 0),
            mandates: undefined,
            clubs: new Array(),
            agents_clubs: new Array(),
            agent_clubs: new Array(),
            attachments: new Array(),
            selectedattachments: new Array()
        },
        methods: {
            base: undefined,
            getmandates: function (after) {
                var me = this.base;

                //[ GET MANDATES ]
                if (ifUndefinedOrNull(me.datasource.id, 0) > 0) {
                    controls.ajax({
                        functionname: 'mandate',
                        data: {
                            mandates_id: ifUndefinedOrNull(me.datasource.id, 0)
                        }
                    }, function (data) {
                        //[ SET LIST_MANDATES LIST ]
                        me.datasource.mandates = data.mandate;
                        me.datasource.attachments = data.attachments;
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
                    controls.ajax({
                        functionname: 'all_clubs'
                    }, function (data) {
                        //[ SET LIST_MANDATES LIST ]
                        me.datasource.mandates = args.mandates;
                        me.datasource.all_clubs = ifUndefinedOrNull(data.all_clubs, new Array());

                        if (!isUndefinedOrNull(after)) { after(); };
                    }, function () {
                        //[ ERROR ]
                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                    }, function () {
                        //[ ERROR ]
                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                    });
                };
            },
            getclubs: function (after) {
                var me = this.base;

                controls.ajax({
                    functionname: 'clubs_list',
                }, function (data) {
                    //[ SET LIST_CLUBS LIST ]
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
                    //[ SET LIST_PLAYERS LIST ]
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
                    //[ SET LIST_AGENTS LIST ]
                    me.datasource.agents = data.agents;
                    me.datasource.agent_clubs = data.agent_clubs;

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

                                ds.mandateplayerclubedit.append('<option value="0">Selecionar</option>');
                                $.each(clubs.SingleFieldDistinct('country'), function (index, country) {
                                    var group = $('<optgroup label="{0}"></optgroup>'.format(country)),
                                        countryclubs = clubs.filter(function(c){ return (c.country == country); });
    
                                    $.each(countryclubs, function (index, club) {
                                        group.append('<option value="{0}">{1}</option>'.format(club.id, club.name_club));
                                    });
    
                                    ds.mandateplayerclubedit.append(group);
                                });
    
                                ds.mandatecoachclubedit.append('<option value="0">Selecionar</option>');
                                $.each(clubs.SingleFieldDistinct('country'), function (index, country) {
                                    var group = $('<optgroup label="{0}"></optgroup>'.format(country)),
                                        countryclubs = clubs.filter(function(c){ return (c.country == country); });
    
                                    $.each(countryclubs, function (index, club) {
                                        group.append('<option value="{0}">{1}</option>'.format(club.id, club.name_club));
                                    });
    
                                    ds.mandatecoachclubedit.append(group);
                                });

                                //ADIONAR MAIS AGENTES AO MANDATO
                                if (ds.ctragentslist.find('.form-group').length == 1) {
                                    ds.btndeleteagent.hide();
                                };
            
                                ds.btnaddagent.on('click', function(){
                                    var element = $('<div class="form-group "><select class="full-width ddlMandateAgent" style="z-index: auto;" style="z-index: auto;" data-init-plugin="select2"></select></div>');
            
                                    element.find('select').append('<option value="0">Selecionar</option>');
            
                                    $.each(me.datasource.agents, function (index, agents) {
                                        element.find('select').append('<option value="{0}">{1} {2}</option>'.format(agents.id, agents.firstname, agents.lastname));
                                    });
                                    element.find('select').select2();
                                    ds.ctragentslist.append(element);
            
                                    if (ds.ctragentslist.find('.form-group').length > 1) {
                                        ds.btndeleteagent.show();
                                    }
                                });
                
                                ds.btndeleteagent.on('click', function() {
                                    ds.ctragentslist.find('.form-group').last().remove();
            
                                    if (ds.ctragentslist.find('.form-group').length == 1) {
                                        $(this).hide();
                                    }
                                });

                                //ANEXOS
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

                                //DADOS DO MANDATO
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
                                    ds.mandatecountry.val(country);
                                    ds.mandateclub.val(club);

                                    ds.mandatecompany.val((!isUndefinedOrNull(agent_club[0])) ? agent_club[0].a_company : '')
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
                                    ds.mandatecoach.val(mandates.coach);
                                    ds.mandatecoach.trigger('change');  
                                    ds.mandateagent.val(mandates.agentid);
                                    ds.mandateagent.trigger('change'); 
                                    ds.mandatedatestart.val(mandates.datestart);
                                    ds.mandatedateend.val(mandates.dateend);
                                    ds.mandatecompany.val(mandates.agentcompany);
                                    ds.mandatecountry.val(country);
                                    ds.mandateclub.val(club);
                                    ds.mandateobs.val(mandates.obs);
                                    $('.titleMandate').html('EDITAR MANDATO');

                                    //ANEXOS
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

                                    //DADOS MANDATO JOGADOR
                                    ds.savemandates.on('click', function(){
                                        if (ds.mandateplayer.val() != '0' && ds.mandateagent.val() != '0' && ds.mandatedatestart.val() != '' 
                                            && ds.mandatedateend.val() != '') {
                                            
                                            var mandates = me.datasource.mandates,
                                                agents = new Array(),
                                                startdate = (ds.mandatedatestart.val() != '') ? new Date(ds.mandatedatestart.val()) : new Date(),
                                                enddate = (ds.mandatedateend.val() != '') ? new Date(ds.mandatedateend.val()) : new Date();

                                            if (ds.mandatedatestart.val() != '' && ds.mandatedateend.val() != '' && startdate > enddate) {
                                                controls.feedback.bind({ type: 'warning', message: 'Data de início inferior à data do fim.' });
                                            } else { 
                        
                                                with(mandates) {
                                                    id = mandates.id;
                                                    player = ds.mandateplayer.find('option:selected').val();
                                                    agentid = ds.mandateagent.find('option:selected').val();
                                                    datestart = (ds.mandatedatestart.val() != '') ? ds.mandatedatestart.val() : null;
                                                    dateend = (ds.mandatedateend.val() != '') ? ds.mandatedateend.val() : null;
                                                    obs = ds.mandateobs.val();
                                                };

                                                //ANEXOS
                                                if (ifUndefinedOrNull(me.datasource.selectedattachments, new Array()).length > 0) {
                                                    $.each(me.datasource.selectedattachments, function (index, attachment) {
                                                        attachment.MandateID = mandates.id;
                                                    });
                                                };

                                                $.each(ds.ctragentslist.find('.ddlMandateAgent'), function (index, element) {
                                                    var value = $(element).find('option:selected').val();
                                                    
                                                    if (parseInt(value) > 0) {
                                                        var clubs = me.datasource.all_clubs.filter(function(ac) { return parseInt(ac.id_agent) == parseInt(value); });

                                                        if (ifUndefinedOrNull(clubs, new Array()).length > 0){
                                                            $.each(clubs, function (index, club) {
                                                                agents.push({
                                                                    agent_id: parseInt(value),
                                                                    agent_club_id: club.agent_club_id
                                                                });
                                                            });
                                                        };
                                                    }
                                                });

                                                controls.ajax({
                                                    functionname: 'update_mandates',
                                                    data: {
                                                        mandates: mandates,
                                                        agents: agents,
                                                        attachments: me.datasource.selectedattachments
                                                    }
                                                }, function (data) {
                                                    if (ifUndefinedOrNull(data.success, false)) {
                                                        controls.feedback.bind({ type: 'success', message: 'Mandato editado com sucesso.' });
                                                        setTimeout(function(){
                                                            window.open('mandates_list.php', '_self');
                                                        }, 2000);
                                                    } else {
                                                        controls.feedback.bind({ type: 'error', message: 'Não foi possível editar o mandato.' });
                                                    };
                                                }, function () {
                                                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                                }, function () {
                                                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                                });
                                            };
                                        } else {
                                            controls.feedback.bind({ type: 'warning', message: 'Campos obrigatórios.' });
                                        };
                                    });

                                    //DADOS MANDATO TREINADOR
                                    ds.savecoachmandates.on('click', function(){
                                        if (ds.mandatecoach.val() != '0' && ds.mandateagent.val() != '0' && ds.mandatedatestart.val() != '' 
                                            && ds.mandatedateend.val() != '') {

                                            var mandates = me.datasource.mandates,
                                                agents = new Array(),
                                                startdate = (ds.mandatedatestart.val() != '') ? new Date(ds.mandatedatestart.val()) : new Date(),
                                                enddate = (ds.mandatedateend.val() != '') ? new Date(ds.mandatedateend.val()) : new Date();

                                            if (ds.mandatedatestart.val() != '' && ds.mandatedateend.val() != '' && startdate > enddate) {
                                                controls.feedback.bind({ type: 'warning', message: 'Data de início inferior à data do fim.' });
                                            } else { 
                        
                                                with(mandates) {
                                                    id = mandates.id;
                                                    coach = ds.mandatecoach.find('option:selected').val();
                                                    agentid = ds.mandateagent.find('option:selected').val();
                                                    datestart = (ds.mandatedatestart.val() != '') ? ds.mandatedatestart.val() : null;
                                                    dateend = (ds.mandatedateend.val() != '') ? ds.mandatedateend.val() : null;
                                                    obs = ds.mandateobs.val();
                                                };

                                                //ANEXOS
                                                if (ifUndefinedOrNull(me.datasource.selectedattachments, new Array()).length > 0) {
                                                    $.each(me.datasource.selectedattachments, function (index, attachment) {
                                                        attachment.MandateID = mandates.id;
                                                    });
                                                };

                                                $.each(ds.ctragentslist.find('.ddlMandateAgent'), function (index, element) {
                                                    var value = $(element).find('option:selected').val();
                                                    
                                                    if (parseInt(value) > 0) {
                                                        var clubs = me.datasource.all_clubs.filter(function(ac) { return parseInt(ac.id_agent) == parseInt(value); });

                                                        if (ifUndefinedOrNull(clubs, new Array()).length > 0){
                                                            $.each(clubs, function (index, club) {
                                                                agents.push({
                                                                    agent_id: parseInt(value),
                                                                    agent_club_id: club.agent_club_id
                                                                });
                                                            });
                                                        };
                                                    }
                                                });

                                                controls.ajax({
                                                    functionname: 'update_mandates_coach',
                                                    data: {
                                                        mandates: mandates,
                                                        agents: agents,
                                                        attachments: me.datasource.selectedattachments
                                                    }
                                                }, function (data) {
                                                    if (ifUndefinedOrNull(data.success, false)) {
                                                        controls.feedback.bind({ type: 'success', message: 'Mandato editado com sucesso.' });
                                                        setTimeout(function(){
                                                            window.open('mandates_list.php', '_self');
                                                        }, 2000);
                                                    } else {
                                                        controls.feedback.bind({ type: 'error', message: 'Não foi possível editar o mandato.' });
                                                    };
                                                }, function () {
                                                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                                }, function () {
                                                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                                });
                                            };
                                    } else {
                                        controls.feedback.bind({ type: 'warning', message: 'Campos obrigatórios.' });
                                    };
                                    });

                                    ds.addnewplayermandate.remove();
                                    ds.addnewcoachmandate.remove();
                                    ds.addnewagentmandate.remove();
                                } else {
                                    ds.ctrfiles.remove();
                                    ds.editplayermandate.remove();
                                    ds.editagentmandate.remove();
                                    ds.editcoachmandate.remove();

                                    //INSERIR NOVO MANDATO JOGADOR
                                    ds.savemandates.on('click', function(){
                                        if (ds.mandateplayer.val() != '0' && ds.mandateagent.val() != '0' && ds.mandatedatestart.val() != '' 
                                            && ds.mandatedateend.val() != '') {

                                            var mandates = me.datasource.mandates,
                                                agents = new Array(),
                                                startdate = (ds.mandatedatestart.val() != '') ? new Date(ds.mandatedatestart.val()) : new Date(),
                                                enddate = (ds.mandatedateend.val() != '') ? new Date(ds.mandatedateend.val()) : new Date();

                                            if (ds.mandatedatestart.val() != '' && ds.mandatedateend.val() != '' && startdate > enddate) {
                                                controls.feedback.bind({ type: 'warning', message: 'Data de início inferior à data do fim.' });
                                            } else { 
                        
                                                with(mandates) {
                                                    player = ds.mandateplayer.find('option:selected').val();
                                                    agentid = ds.mandateagent.find('option:selected').val();
                                                    datestart = (ds.mandatedatestart.val() != '') ? ds.mandatedatestart.val() : null;
                                                    dateend = (ds.mandatedateend.val() != '') ? ds.mandatedateend.val() : null;
                                                    obs = ds.mandateobs.val();
                                                };

                                                $.each(ds.ctragentslist.find('.ddlMandateAgent'), function (index, element) {
                                                    var value = $(element).find('option:selected').val();
                                                    
                                                    if (parseInt(value) > 0) {
                                                        var clubs = me.datasource.all_clubs.filter(function(ac) { return parseInt(ac.id_agent) == parseInt(value); });

                                                        if (ifUndefinedOrNull(clubs, new Array()).length > 0){
                                                            $.each(clubs, function (index, club) {
                                                                agents.push({
                                                                    agent_id: parseInt(value),
                                                                    agent_club_id: club.agent_club_id
                                                                });
                                                            });
                                                        };
                                                    }
                                                });
                            
                                                controls.ajax({
                                                    functionname: 'insert_mandates',
                                                    data: {
                                                        mandates: mandates,
                                                        agents: agents,
                                                        attachments: me.datasource.selectedattachments
                                                    }
                                                }, function (data) {
                                                    if (ifUndefinedOrNull(data.success, false)) {
                                                        controls.feedback.bind({ type: 'success', message: 'Mandato adicionado com sucesso.' });
                                                        setTimeout(function(){
                                                            window.open('mandates_list.php', '_self');
                                                        }, 2000);
                                                    } else {
                                                        controls.feedback.bind({ type: 'error', message: 'Nao foi possível adicionar o mandato.' });
                                                    };
                                                }, function () {
                                                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                                }, function () {
                                                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                                });
                                            };
                                        } else {
                                            controls.feedback.bind({ type: 'warning', message: 'Campos obrigatórios.' });
                                        };
                                    });
                                    
                                    //INSERIR NOVO MANDATO TREINADOR
                                    ds.savecoachmandates.on('click', function(){
                                        if (ds.mandatecoach.val() != '0' && ds.mandateagent.val() != '0' && ds.mandatedatestart.val() != '' 
                                            && ds.mandatedateend.val() != '') {

                                                var mandates = me.datasource.mandates,
                                                agents = new Array(),
                                                startdate = (ds.mandatedatestart.val() != '') ? new Date(ds.mandatedatestart.val()) : new Date(),
                                                enddate = (ds.mandatedateend.val() != '') ? new Date(ds.mandatedateend.val()) : new Date();

                                            if (ds.mandatedatestart.val() != '' && ds.mandatedateend.val() != '' && startdate > enddate) {
                                                controls.feedback.bind({ type: 'warning', message: 'Data de início inferior à data do fim.' });
                                            } else {
                        
                                                with(mandates) {
                                                    coach = ds.mandatecoach.find('option:selected').val();
                                                    agentid = ds.mandateagent.find('option:selected').val();
                                                    datestart = (ds.mandatedatestart.val() != '') ? ds.mandatedatestart.val() : null;
                                                    dateend = (ds.mandatedateend.val() != '') ? ds.mandatedateend.val() : null;
                                                    obs = ds.mandateobs.val();
                                                };

                                                $.each(ds.ctragentslist.find('.ddlMandateAgent'), function (index, element) {
                                                    var value = $(element).find('option:selected').val();
                                                    
                                                    if (parseInt(value) > 0) {
                                                        var clubs = me.datasource.all_clubs.filter(function(ac) { return parseInt(ac.id_agent) == parseInt(value); });

                                                        if (ifUndefinedOrNull(clubs, new Array()).length > 0){
                                                            $.each(clubs, function (index, club) {
                                                                agents.push({
                                                                    agent_id: parseInt(value),
                                                                    agent_club_id: club.agent_club_id
                                                                });
                                                            });
                                                        };
                                                    }
                                                });
                            
                                                controls.ajax({
                                                    functionname: 'insert_mandates_coach',
                                                    data: {
                                                        mandates: mandates,
                                                        agents: agents,
                                                        attachments: me.datasource.selectedattachments
                                                    }
                                                }, function (data) {
                                                    if (ifUndefinedOrNull(data.success, false)) {
                                                        controls.feedback.bind({ type: 'success', message: 'Mandato adicionado com sucesso.' });
                                                        setTimeout(function(){
                                                            window.open('mandates_list.php', '_self');
                                                        }, 2000);
                                                    } else {
                                                        controls.feedback.bind({ type: 'error', message: 'Nao foi possível adicionar o mandato.' });
                                                    };
                                                }, function () {
                                                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                                }, function () {
                                                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                                });
                                            };
                                        } else {
                                            controls.feedback.bind({ type: 'warning', message: 'Campos obrigatórios.' });
                                        };
                                    });

                                    ds.mandatesplayerclubnew.append('<option value="0">Selecionar</option>');
                                    $.each(clubs.SingleFieldDistinct('country'), function (index, country) {
                                        var group = $('<optgroup label="{0}"></optgroup>'.format(country)),
                                            countryclubs = clubs.filter(function(c){ return (c.country == country); });
                
                                        $.each(countryclubs, function (index, club) {
                                            group.append('<option value="{0}">{1}</option>'.format(club.id, club.name_club));
                                        });
                
                                        ds.mandatesplayerclubnew.append(group);
                                    });

                                    //ADICIONAR JOGADOR
                                    ds.addnewplayermandate.on('click', function(){
                                        ds.mandateplayerclubnew.find('option:selected').val();
                                        ds.mandateplayernamenew.val('');
                                        ds.mandateplayerfirstnamenew.val('');
                                        ds.mandateplayerlastnamenew.val('');
                                        ds.mandateplayerbirthnew.val('');
                                        ds.mandateplayernationalitynew.val('');
                                        ds.mandateplayerheightnew.val('');
                                        ds.mandateplayerweightnew.val('');
                                        ds.mandateplayerfootnew.prev().find('.cs-selected span').html();
                                        ds.mandateplayerpositionnew.prev().find('.cs-selected span').html();
                                        ds.mandateplayervaluenew.val('');
                                        ds.mandateplayerpassportnew.val('');
                                        ds.mandateplayerpassportvalnew.val('');
                                    });

                                    //BOTAO DE SALVAR ADICIONAR JOGADOR
                                    ds.savenewplayermandate.on('click', function(){
                                        if (ds.mandateplayernamenew.val() != '' && ds.mandateplayerfirstnamenew.val() != '' && ds.mandateplayerlastnamenew.val() != ''
                                            && ds.mandateplayerbirthnew.val() != '' && ds.mandateplayerclubnew.val() != '0' && ds.mandateplayerfootnew.val() != ''
                                            && ds.mandateplayerheightnew.val() != '' && ds.mandateplayernationalitynew.val() != '' && ds.mandateplayerpositionnew.val() != ''
                                            && ds.mandateplayervaluenew.val() != '' && ds.mandateplayerweightnew.val() != '') {
                                         
                                            var player = args.player;       
                                            
                                            with(player) {
                                                name = ds.mandateplayernamenew.val();
                                                club = ds.mandateplayerclubnew.find('option:selected').val();
                                                firstname = ds.mandateplayerfirstnamenew.val();
                                                lastname = ds.mandateplayerlastnamenew.val();
                                                birth = (ds.mandateplayerbirthnew.val() != '') ? ds.mandateplayerbirthnew.val() : null;
                                                nationality = ds.mandateplayernationalitynew.val();
                                                height = ds.mandateplayerheightnew.val();
                                                weight = ds.mandateplayerweightnew.val();
                                                foot = ds.mandateplayerfootnew.prev().find('.cs-selected span').html();
                                                position = ds.mandateplayerpositionnew.prev().find('.cs-selected span').html();
                                                value = ds.mandateplayervaluenew.val();
                                                passport = ds.mandateplayerpassportnew.val();
                                                passportval = (ds.mandateplayerpassportvalnew.val() != '') ? ds.mandateplayerpassportvalnew.val() : null;
                                            };

                                            controls.ajax({
                                                functionname: 'insert_player',
                                                data: {
                                                    player: player,
                                                    attachments: me.datasource.selectedattachments
                                                }
                                            }, function (data) {
                                                if (ifUndefinedOrNull(data.success, false)) {
                                                    controls.feedback.bind({ type: 'success', message: 'Jogador adicionado com sucesso.' });
                                                    setTimeout(function(){
                                                        $("[data-dismiss=modal]").trigger({ type: "click" });
                                                        window.location.reload();
                                                     }, 2000);
                                                } else {
                                                    controls.feedback.bind({ type: 'error', message: 'Não foi possível adicionar o jogador.' });
                                                };
                                            }, function () {
                                                controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                            }, function () {
                                                controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                            });
                                        } else {
                                            controls.feedback.bind({ type: 'warning', message: 'Campos obrigatórios.' });
                                        };
                                    });

                                    ds.mandatecoachclubnew.append('<option value="0">Selecionar</option>');
                                    $.each(clubs.SingleFieldDistinct('country'), function (index, country) {
                                        var group = $('<optgroup label="{0}"></optgroup>'.format(country)),
                                            countryclubs = clubs.filter(function(c){ return (c.country == country); });
                
                                        $.each(countryclubs, function (index, club) {
                                            group.append('<option value="{0}">{1}</option>'.format(club.id, club.name_club));
                                        });
                
                                        ds.mandatecoachclubnew.append(group);
                                    });

                                     //ADICIONAR TREINADOR
                                     ds.addnewcoachmandate.on('click', function(){
                                        ds.mandatecoachclubnew.find('option:selected').val();
                                        ds.mandatecoachnamenew.val('');
                                        ds.mandatecoachfirstnamenew.val('');
                                        ds.mandatecoachlastnamenew.val('');
                                        ds.mandatecoachbirthnew.val('');
                                        ds.mandatecoachnationalitynew.val('');
                                        ds.mandatecoachheightnew.val('');
                                        ds.mandatecoachweightnew.val('');
                                        ds.mandatecoachformationnew.prev().find('.cs-selected span').html();
                                        ds.mandatecoachvaluenew.val('');
                                        ds.mandatecoachpassportnew.val('');
                                        ds.mandatecoachpassportvalnew.val('');
                                    });

                                    //BOTAO DE SALVAR ADICIONAR TREINADOR
                                    ds.savenewcoachmandate.on('click', function(){
                                        if (ds.mandatecoachnamenew.val() != '' && ds.mandatecoachfirstnamenew.val() != '' && ds.mandatecoachlastnamenew.val() != ''
                                            && ds.mandatecoachbirthnew.val() != '' && ds.mandatecoachclubnew.val() != '0' && ds.mandatecoachformationnew.val() != ''
                                            && ds.mandatecoachheightnew.val() != '' && ds.mandatecoachnationalitynew.val() != ''
                                            && ds.mandatecoachvaluenew.val() != '' && ds.mandatecoachweightnew.val() != '') {
                                           
                                            var coach = args.coach;       
                                            
                                            with(player) {
                                                name = ds.mandatecoachnamenew.val();
                                                club = ds.mandatecoachclubnew.find('option:selected').val();
                                                firstname = ds.mandatecoachfirstnamenew.val();
                                                lastname = ds.mandatecoachlastnamenew.val();
                                                birth = (ds.mandatecoachbirthnew.val() != '') ? ds.mandatecoachbirthnew.val() : null;
                                                nationality = ds.mandatecoachnationalitynew.val();
                                                height = ds.mandatecoachheightnew.val();
                                                weight = ds.mandatecoachweightnew.val();
                                                formation = ds.mandatecoachformationnew.prev().find('.cs-selected span').html();
                                                value = ds.mandatecoachvaluenew.val();
                                                passport = ds.mandatecoachpassportnew.val();
                                                passportval = (ds.mandatecoachpassportvalnew.val() != '') ? ds.mandatecoachpassportvalnew.val() : null;
                                            };

                                            controls.ajax({
                                                functionname: 'insert_coach',
                                                data: {
                                                    coach: coach,
                                                    attachments: me.datasource.selectedattachments
                                                }
                                            }, function (data) {
                                                if (ifUndefinedOrNull(data.success, false)) {

                                                    controls.feedback.bind({ type: 'success', message: 'Treinador adicionado com sucesso.' });
                                                    setTimeout(function(){
                                                        $("[data-dismiss=modal]").trigger({ type: "click" });
                                                        window.location.reload();
                                                     }, 2000);
                                                } else {
                                                    controls.feedback.bind({ type: 'error', message: 'Não foi possível adicionar o treinador.' });
                                                };
                                            }, function () {
                                                controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                            }, function () {
                                                controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                            });
                                        } else {
                                            controls.feedback.bind({ type: 'warning', message: 'Campos obrigatórios.' });
                                        };
                                    });

                                    if (ds.ctrclubslistnew.find('.form-group').length == 1) {
                                        ds.btndeleteclubnew.hide();
                                    };
                
                                    ds.btnaddclubnew.on('click', function(){
                                        var element = $('<div class="form-group "><select class="full-width ddlAgentClubNewMandate" style="z-index: auto;" style="z-index: auto;" data-init-plugin="select2"></select></div>');
                
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
                                        ds.ctrclubslistnew.append(element);
                                        if (ds.ctrclubslistnew.find('.form-group').length > 1) {
                                            ds.btndeleteclubnew.show();
                                        }
                                    });
                    
                                    ds.btndeleteclubnew.on('click', function() {
                                        ds.ctrclubslistnew.find('.form-group').last().remove();
                
                                        if (ds.ctrclubslistnew.find('.form-group').length == 1) {
                                            $(this).hide();
                                        }
                                    });
                                    
                                    //ADICIONAR AGENTE
                                    ds.addnewagentmandate.on('click', function(){
                                        ds.mandateagentclubnew.find('option:selected').val();
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
                                        if (ds.mandateagentnamenew.val() != '' && ds.mandateagentfirstnamenew.val() != '' && ds.mandateagentlastnamenew.val() != ''
                                            && ds.mandateagentbirthnew.val() != '' && ds.mandateagentclubnew.val() != '0' && ds.mandateagentcontactnew.val() != '' 
                                            && ds.mandateagentnationalitynew.val() != ''&& ds.mandateagentcompanynew.val() != '' && ds.mandateagentcountrynew.val() != '') {
                                            
                                            var agent = args.agent;       
                                            
                                            with(agent) {
                                                name = ds.mandateagentnamenew.val();
                                                club = ds.mandateagentclubnew.find('option:selected').val();
                                                firstname = ds.mandateagentfirstnamenew.val();
                                                lastname = ds.mandateagentlastnamenew.val();
                                                birth = (ds.mandateagentbirthnew.val() != '') ? ds.mandateagentbirthnew.val() : null;
                                                nationality = ds.mandateagentnationalitynew.val();
                                                passport = ds.mandateagentpassportnew.val();
                                                passportval = (ds.mandateagentpassportvalnew.val() != '') ? ds.mandateagentpassportvalnew.val() : null;
                                                agentcompany = ds.mandateagentcompanynew.val();
                                                country = ds.mandateagentcountrynew.val();
                                                contacts = ds.mandateagentcontactnew.val();
                                                obs = ds.mandateagentobsnew.val();
                                            };

                                            controls.ajax({
                                                functionname: 'insert_agent',
                                                data: {
                                                    agent: agent,
                                                    attachments: me.datasource.selectedattachments
                                                }
                                            }, function (data) {
                                                if (ifUndefinedOrNull(data.success, false)) {

                                                    controls.feedback.bind({ type: 'success', message: 'Agente adicionado com sucesso.' });
                                                    setTimeout(function(){
                                                        $("[data-dismiss=modal]").trigger({ type: "click" });
                                                        window.location.reload();
                                                     }, 2000);
                                                } else {
                                                    controls.feedback.bind({ type: 'error', message: 'Não foi possível adicionar o agente.' });
                                                };
                                            }, function () {
                                                controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                            }, function () {
                                                controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                            });
                                        } else {
                                            controls.feedback.bind({ type: 'warning', message: 'Campos obrigatórios.' });
                                        };
                                    });
                                };

                                //EDITAR DADOS DO JOGADOR
                                ds.editplayermandate.on('click', function(){
                                    ds.mandateplayerclubedit.val(mandates.club);
                                    ds.mandateplayerclubedit.trigger('change');
                                    ds.mandateplayernameedit.val(mandates.name);
                                    ds.mandateplayerfirstnameedit.val(mandates.firstname);
                                    ds.mandateplayerlastnameedit.val(mandates.lastname);
                                    ds.mandateplayerbirthedit.val(mandates.birth);
                                    ds.mandateplayernationalityedit.val(mandates.nationality);
                                    ds.mandateplayerheightedit.val(mandates.height);
                                    ds.mandateplayerweightedit.val(mandates.weight);
                                    ds.mandateplayervalueedit.val(mandates.value);
                                    ds.mandateplayerpassportedit.val(mandates.passport);
                                    ds.mandateplayerpassportvaledit.val(mandates.passportval);

                                    $.each(ds.mandateplayerfootedit.find('option'), function (index, element) {
                                        if ($(element).html() == mandates.foot) {
                                            $(element).attr('selected', 'selected');
                                            ds.mandateplayerfootedit.prev().find('li[data-value="{0}"]'.format(ds.mandateplayerfootedit.val())).addClass('cs-selected');
                                            return false;
                                        }
                                    });
        
                                    ds.mandateplayerfootedit.prev().find('li[data-value="{0}"]'.format(ds.mandateplayerfootedit.val())).trigger('click');
                                    ds.mandateplayerfootedit.prev().prev().trigger('click');
            
                                    $.each(ds.mandateplayerpositionedit.find('option'), function (index, element) {
                                        if ($(element).html() == mandates.position) {
                                            $(element).attr('selected', 'selected');
                                            ds.mandateplayerpositionedit.prev().find('li[data-value="{0}"]'.format(ds.mandateplayerpositionedit.val())).addClass('cs-selected');
                                            return false;
                                        }
                                    });
            
                                    ds.mandateplayerpositionedit.prev().find('li[data-value="{0}"]'.format(ds.mandateplayerpositionedit.val())).trigger('click');
                                    ds.mandateplayerpositionedit.prev().prev().trigger('click');
                                });

                                //BOTAO DE SALVAR EDIÇÃO DE JOGADOR
                                ds.saveeditplayermandate.on('click', function(){
                                    if (ds.mandateplayernameedit.val() != '' && ds.mandateplayerfirstnameedit.val() != '' && ds.mandateplayerlastnameedit.val() != ''
                                        && ds.mandateplayerbirthedit.val() != '' && ds.mandateplayerclubedit.val() != '0' && ds.mandateplayerfootedit.val() != ''
                                        && ds.mandateplayerheightedit.val() != '' && ds.mandateplayernationalityedit.val() != '' && ds.mandateplayerpositionedit.val() != ''
                                        && ds.mandateplayervalueedit.val() != '' && ds.mandateplayerweightedit.val() != '') {
                                      
                                        var player = args.player;       
                                        
                                        with(player) {
                                            id = mandates.player;
                                            name = ds.mandateplayernameedit.val();
                                            club = ds.mandateplayerclubedit.find('option:selected').val();
                                            firstname = ds.mandateplayerfirstnameedit.val();
                                            lastname = ds.mandateplayerlastnameedit.val();
                                            birth = (ds.mandateplayerbirthedit.val() != '') ? ds.mandateplayerbirthedit.val() : null; 
                                            nationality = ds.mandateplayernationalityedit.val();
                                            height = ds.mandateplayerheightedit.val();
                                            weight = ds.mandateplayerweightedit.val();
                                            foot = ds.mandateplayerfootedit.prev().find('.cs-selected span').html();
                                            position = ds.mandateplayerpositionedit.prev().find('.cs-selected span').html();
                                            value = ds.mandateplayervalueedit.val();
                                            passport = ds.mandateplayerpassportedit.val();
                                            passportval = (ds.mandateplayerpassportvaledit.val() != '') ? ds.mandateplayerpassportvaledit.val() : null;
                                        };

                                        controls.ajax({
                                            functionname: 'update_player',
                                            data: {
                                                player: player,
                                                attachments: me.datasource.selectedattachments
                                            }
                                        }, function (data) {
                                            if (ifUndefinedOrNull(data.success, false)) {

                                                controls.feedback.bind({ type: 'success', message: 'Jogador editado com sucesso.' });
                                                setTimeout(function(){
                                                    $("[data-dismiss=modal]").trigger({ type: "click" });
                                                    window.location.reload();
                                                 }, 2000);
                                            } else {
                                                controls.feedback.bind({ type: 'error', message: 'Jogador não foi editado com sucesso.' });
                                            };
                                        }, function () {
                                            controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                        }, function () {
                                            controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                        });
                                    } else {
                                        controls.feedback.bind({ type: 'warning', message: 'Campos obrigatórios.' });
                                    }; 
                                });  

                                //EDITAR DADOS DO TREINADOR
                                ds.editcoachmandate.on('click', function(){
                                    ds.mandatecoachclubedit.val(mandates.club);
                                    ds.mandatecoachclubedit.trigger('change');
                                    ds.mandatecoachnameedit.val(mandates.name);
                                    ds.mandatecoachfirstnameedit.val(mandates.firstname);
                                    ds.mandatecoachlastnameedit.val(mandates.lastname);
                                    ds.mandatecoachbirthedit.val(mandates.birth);
                                    ds.mandatecoachnationalityedit.val(mandates.nationality);
                                    ds.mandatecoachheightedit.val(mandates.height);
                                    ds.mandatecoachweightedit.val(mandates.weight);
                                    ds.mandatecoachvalueedit.val(mandates.value);
                                    ds.mandatecoachpassportedit.val(mandates.passport);
                                    ds.mandatecoachpassportvaledit.val(mandates.passportval);

                                    $.each(ds.mandatecoachformationedit.find('option'), function (index, element) {
                                        if ($(element).html() == mandates.formation) {
                                            $(element).attr('selected', 'selected');
                                            ds.mandatecoachformationedit.prev().find('li[data-value="{0}"]'.format(ds.mandatecoachformationedit.val())).addClass('cs-selected');
                                            return false;
                                        }
                                    });
        
                                    ds.mandatecoachformationedit.prev().find('li[data-value="{0}"]'.format(ds.mandatecoachformationedit.val())).trigger('click');
                                    ds.mandatecoachformationedit.prev().prev().trigger('click');
                                });

                                //BOTAO DE SALVAR EDIÇÃO DE TREINADOR
                                ds.saveeditcoachmandate.on('click', function(){
                                    if (ds.mandatecoachnameedit.val() != '' && ds.mandatecoachfirstnameedit.val() != '' && ds.mandatecoachlastnameedit.val() != ''
                                        && ds.mandatecoachbirthedit.val() != '' && ds.mandatecoachclubedit.val() != '0' && ds.mandatecoachformationedit.val() != ''
                                        && ds.mandatecoachheightedit.val() != '' && ds.mandatecoachnationalityedit.val() != ''
                                        && ds.mandatecoachvalueedit.val() != '' && ds.mandatecoachweightedit.val() != '') {
                                       
                                        var coach = args.coach;       
                                        
                                        with(coach) {
                                            id = mandates.coach;
                                            name = ds.mandatecoachnameedit.val();
                                            club = ds.mandatecoachclubedit.find('option:selected').val();
                                            firstname = ds.mandatecoachfirstnameedit.val();
                                            lastname = ds.mandatecoachlastnameedit.val();
                                            birth = (ds.mandatecoachbirthedit.val() != '') ? ds.mandatecoachbirthedit.val() : null;
                                            nationality = ds.mandatecoachnationalityedit.val();
                                            height = ds.mandatecoachheightedit.val();
                                            weight = ds.mandatecoachweightedit.val();
                                            formation = ds.mandatecoachformationedit.prev().find('.cs-selected span').html();
                                            value = ds.mandatecoachvalueedit.val();
                                            passport = ds.mandatecoachpassportedit.val();
                                            passportval = (ds.mandatecoachpassportvaledit.val() != '') ? ds.mandatecoachpassportvaledit.val() : null;
                                        };

                                        controls.ajax({
                                            functionname: 'update_coach',
                                            data: {
                                                coach: coach,
                                                attachments: me.datasource.selectedattachments
                                            }
                                        }, function (data) {
                                            if (ifUndefinedOrNull(data.success, false)) {
                                                controls.feedback.bind({ type: 'success', message: 'Treinador editado com sucesso.' });
                                                setTimeout(function(){
                                                    $("[data-dismiss=modal]").trigger({ type: "click" });
                                                    window.location.reload();
                                                 }, 2000);
                                            } else {
                                                controls.feedback.bind({ type: 'error', message: 'Treinador não foi editado com sucesso.' });
                                            };
                                        }, function () {
                                            controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                        }, function () {
                                            controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                        });
                                    } else {
                                        controls.feedback.bind({ type: 'warning', message: 'Campos obrigatórios.' });
                                    }; 
                                });

                                //EDITAR DADOS DO AGENTE
                                ds.editagentmandate.on('click', function(){
                                    ds.mandateagentclubedit.val(mandates.agentclub);
                                    ds.mandateagentclubedit.trigger('change');
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

                                    if (ifUndefinedOrNull(me.datasource.agents_clubs, new Array()).length > 0) {
                                        $.each(me.datasource.agents_clubs, function (index, club) {
                                            if (index > 0) {
                                                var element = $('<div class="form-group "><select class="full-width ddlAgentClubEditMandate" style="z-index: auto;" data-init-plugin="select2"></select></div>');
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
                                                ds.ctrclubslistedit.append(element);
            
                                                if (ds.ctrclubslistedit.find('.form-group').length > 1) {
                                                    ds.btndeleteclubedit.show();
                                                }
                                            }
                                        });
                                    };
                                });

                                //BOTAO DE SALVAR EDIÇÃO DE AGENTE
                                ds.saveeditagentmandate.on('click', function(){
                                    if (ds.mandateagentnameedit.val() != '' && ds.mandateagentfirstnameedit.val() != '' && ds.mandateagentlastnameedit.val() != ''
                                        && ds.mandateagentbirthedit.val() != '' && ds.mandateagentclubedit.val() != '0' && ds.mandateagentcontactedit.val() != '' 
                                        && ds.mandateagentnationalityedit.val() != ''&& ds.mandateagentcompanyedit.val() != '' && ds.mandateagentcountryedit.val() != '') {
                                        
                                        var agent = args.agent;
                                            agentclubs = me.datasource.agents_clubs.filter(function(ac){ return ac.id_agent ==  agent.id; }),
                                            clubs = new Array();       
                                        
                                        with(agent) {
                                            id = mandates.agentid;
                                            name = ds.mandateagentnameedit.val();
                                            club = ds.mandateagentclubedit.find('option:selected').val();
                                            firstname = ds.mandateagentfirstnameedit.val();
                                            lastname = ds.mandateagentlastnameedit.val();
                                            birth = (ds.mandateagentbirthedit.val() != '') ? ds.mandateagentbirthedit.val() : null;
                                            nationality = ds.mandateagentnationalityedit.val();
                                            passport = ds.mandateagentpassportedit.val();
                                            passportval = (ds.mandateagentpassportvaledit.val() != '') ? ds.mandateagentpassportvaledit.val() : null;
                                            agentcompany = ds.mandateagentcompanyedit.val();
                                            country = ds.mandateagentcountryedit.val();
                                            contacts = ds.mandateagentcontactedit.val();
                                            obs = ds.mandateagentobsedit.val();
                                        };

                                        $.each(ds.ctrclubslistedit.find('.ddlAgentClub'), function (index, element) {
                                            var value = $(element).find('option:selected').val();
                                            if (parseInt(value) > 0 && !agentclubs.containsWithField('id_club', parseInt(value))) {
                                                clubs.push(parseInt(value));
                                            }
                                        });

                                        controls.ajax({
                                            functionname: 'update_agent',
                                            data: {
                                                agent: agent,
                                                clubs: clubs,
                                                attachments: me.datasource.selectedattachments
                                            }
                                        }, function (data) {
                                            if (ifUndefinedOrNull(data.success, false)) {
                                                controls.feedback.bind({ type: 'success', message: 'Agente editado com sucesso.' });
                                                setTimeout(function(){
                                                    $("[data-dismiss=modal]").trigger({ type: "click" });
                                                    window.location.reload();
                                                 }, 2000);
                                            } else {
                                                controls.message.bind({ type: 'error', message: 'Agente não foi editado com sucesso.' });
                                            };
                                        }, function () {
                                            controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                        }, function () {
                                            controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                                        });
                                    } else {
                                        controls.feedback.bind({ type: 'warning', message: 'Campos obrigatórios.' });
                                    }; 
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
                                row.append(itemcolumn.format((list_player.value > 0) ? list_player.value :  ''));
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
                    var me = this.base,
                        datasource = me.datasource.list_representation;

                    if (ifUndefinedOrNull(list_representationid, 0) > 0) {
                        var obj = datasource.filter(function(d) { return (d.id == list_representationid) })[0],
                            iscoach = false;

                        if (!isUndefinedOrNull(obj)){
                            iscoach = obj.iscoach;
                        }

                        controls.post((!iscoach) ? me.datasource.detailpage :  me.datasource.coachdetailpage, { representation_id: list_representationid });
                    }
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
                        me.datasource.coachdetailpage = ifUndefinedOrNull(data.coach_detail_page, '');

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
                                row.append(itemcolumn.format(ifUndefinedOrNull((list_representation.child) ? 'Sim' : 'Não', '')));
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
                    datasource = me.datasource.list_club;

                    if (ifUndefinedOrNull(list_clubid, 0) > 0) {
                        var obj = datasource.filter(function(d) { return (d.id == list_clubid) })[0],
                            iscoach = false;

                        if (!isUndefinedOrNull(obj)){
                            iscoach = obj.iscoach;
                        }

                        controls.post((!iscoach) ? me.datasource.detailpage :  me.datasource.coachdetailpage, { club_id: list_clubid });
                    }

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
                        me.datasource.coachdetailpage = ifUndefinedOrNull(data.coach_detail_page, '');

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
                                row.append(itemcolumn.format(ifUndefinedOrNull(list_club.valuecontract, '')));
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
            agents_clubs: new Array(),
            total: 0
        },
        methods: {
            base: undefined,
            actions: {
                base: undefined,
                edit: function (list_mandateid) {
                    var me = this.base;
                        datasource = me.datasource.list_mandate;

                        if (ifUndefinedOrNull(list_mandateid, 0) > 0) {
                            var obj = datasource.filter(function(d) { return (d.id == list_mandateid) })[0],
                                iscoach = false;
    
                            if (!isUndefinedOrNull(obj)){
                                iscoach = obj.iscoach;
                            }
    
                            controls.post((!iscoach) ? me.datasource.detailpage :  me.datasource.coachdetailpage, { mandates_id: list_mandateid });
                        }
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
                        me.datasource.agents = ifUndefinedOrNull(data.agents, new Array());
                        me.datasource.coachdetailpage = ifUndefinedOrNull(data.coach_detail_page, '');

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

                                var agent_club = me.datasource.agents_clubs.filter(function(ac){ return (ac.id_mandate == list_mandate.id); }),
                                    agent_info = me.datasource.agents.filter(function(ac){ return (ac.id_mandate == list_mandate.id); }),
                                    club = '',
                                    country = '',
                                    name = '',
                                    company = '';

                                if (ifUndefinedOrNull(agent_club, new Array).length > 0) {
                                    $.each(agent_club, function (index, ac) {
                                        if (club.indexOf(ac.club_name) == -1) {
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

                                if (ifUndefinedOrNull(agent_info, new Array).length > 0) {
                                    $.each(agent_info, function (index, ac) {
                                        if (company.indexOf(ac.a_company) == -1) {
                                            if(index > 0) {
                                                company += ', ';
                                            }

                                            company += ac.a_company;
                                        };

                                        if (name.indexOf(ac.a_first_name) == -1) {
                                            if(index > 0) {
                                                name += ', ';
                                            }

                                            name += ac.a_first_name + ' ' + ac.a_last_name;
                                        };
                                    });
                                }

                                //[ OTHER COLUMNS ]
                                row.append(itemcolumn.format('<div class="checkbox text-center"><input type="checkbox" id="ckmandate{0}" data="{0}"><label for="ckmandate{0}" class="no-padding no-margin"></label></div>'.format(list_mandate.id)));
                                row.append(itemcolumn.format('{0} {1}'.format(list_mandate.firstname, list_mandate.lastname)));
                                row.append(itemcolumn.format('{0}'.format(name)));
                                row.append(itemcolumn.format(ifUndefinedOrNull(company, '')));
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
                contractstoexpire: function (after) {
                    var me = this.base;

                    controls.ajax({
                        functionname: 'contracts_to_expire'
                    }, function (data) {
                        if (!isUndefinedOrNull(after)) { after(data); };
                    }, function () {
                        //[ ERROR ]
                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                    }, function () {
                        //[ ERROR ]
                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                    });
                }
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

            me.methods.actions.contractstoexpire(function(){
                console.log('cccc');

                //[ BIND list_value GRID ]
                me.methods.grid.bind();
                me.methods.grid.nationality.bind();
                me.methods.grid.clubs_index.bind();
                me.methods.grid.birth.bind();
                me.methods.grid.league.bind();
                me.methods.grid.position.bind();
            });
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

