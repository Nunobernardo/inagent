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
            playerfoot: $('div.ddlPlayerFoot'),
            playerposition: $('div.ddlPlayerPosition'),
            playerclub: $('.txtPlayerClub'),
            playervalue: $('.txtPlayerValue'),
            playerpassport: $('.txtPlayerPassport'),
            playerpassportval: $('.txtPlayerPassportVal'),
            saveplayer: $('.btnSavePlayer')
        },
        datasource: {
            base: undefined,
            id: ifUndefinedOrNull(args.data.player_id, 0),
            player: undefined
        },
        methods: {
            base: undefined,
            getplayer: function (after) {
                var me = this.base;

                //[ GET player ]
                if (ifUndefinedOrNull(me.datasource.id, 0) > 0) {
                    controls.ajax({
                        functionname: 'player',
                        data: {
                            player_id: ifUndefinedOrNull(me.datasource.id, 0)
                        }
                    }, function (data) {
                        //[ SET list_player LIST ]
                        me.datasource.player = data.player;

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
            }
        },
        load: function() {
            var me = this,
                ds = me.design;            

            me.methods.getplayer(function(){
                var player = me.datasource.player;

                if (player.id > 0) {
                    ds.playerfirstname.val(player.firstname);
                    ds.playerlastname.val(player.lastname);
                };

                ds.saveplayer.on('click', function(){
                    var player = me.datasource.player;                   

                    with(player) {
                        age = ds.playerage.val();
                        birth = ds.playerbirth.val();
                        club = ds.playerclub.val();
                        firstname = ds.playerfirstname.val();
                        foot = ds.playerfoot.find('span.cs-placeholder').html();
                        height = ds.playerheight.val();
                        lastname = ds.playerlastname.val();
                        name = ds.playername.val();
                        nationality = ds.playernationality.val();
                        passport = ds.playerpassport.val();
                        passportval = ds.playerpassportval.val();
                        position = ds.playerposition.find('span.cs-placeholder').html();
                        value = ds.playervalue.val();
                        weight = ds.playerweight.val();
                    };

                    controls.ajax({
                        functionname: 'insert_player',
                        data: {
                            player: player
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
            coachformation: $('div.ddlCoachFormation'),
            coachclub: $('.txtCoachClub'),
            coachvalue: $('.txtCoachValue'),
            coachpassport: $('.txtCoachPassaport'),
            coachpassportval: $('.txtCoachPassaportVal'),
            savecoach: $('.btnSaveCoach')
        },
        datasource: {
            base: undefined,
            id: ifUndefinedOrNull(args.data.coach_id, 0),
            coach: undefined
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

                        if (!isUndefinedOrNull(after)) { after(data); };
                    }, function () {
                        //[ ERROR ]
                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                    }, function () {
                        //[ ERROR ]
                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                    });
                } else {
                    me.datasource.coach = args.coach;
                };
            }
        },
        load: function() {
            var me = this,
                ds = me.design;            

            me.methods.getcoach(function(){
                var coach = me.datasource.coach;

                if (coach.id > 0) {
                    ds.coachfirstname.val(coach.firstname);
                    ds.coachlastname.val(coach.lastname);
                };

                ds.savecoach.on('click', function(){
                    var coach = me.datasource.coach;                   

                    with(coach) {
                        age = ds.coachage.val();
                        birth = ds.coachbirth.val();
                        club = ds.coachclub.val();
                        firstname = ds.coachfirstname.val();
                        formation = ds.coachformation.find('span.cs-placeholder').html();
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
                            coach: coach
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

function representation(args) {
    var representation = {
        design: {
            representationplayer: $('.div.ddlRepresentationPlayer'),
            // representationchild: $('.txtrepresentationchild'),
            representationfather: $('.txtRepresentationFather'),
            representationmother: $('.txtRepresentationMother'),
            representationdatestart: $('.txtRepresentationDateStart'),
            representationdateend: $('.txtRepresentationDateEnd'),
            representationcommission: $('.txtRepresentationCommission'),
            saverepresentation: $('.btnSaveRepresentation')
        },
        datasource: {
            base: undefined,
            id: ifUndefinedOrNull(args.data.representation_id, 0),
            representation: undefined
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

                        if (!isUndefinedOrNull(after)) { after(data); };
                    }, function () {
                        //[ ERROR ]
                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                    }, function () {
                        //[ ERROR ]
                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                    });
                } else {
                    me.datasource.representation = args.representation;
                };
            }
        },
        load: function() {
            var me = this,
                ds = me.design;            

            me.methods.getrepresentation(function(){
                var representation = me.datasource.representation;

                // if (representation.id > 0) {
                //     ds.representationfirstname.val(representation.firstname);
                //     ds.representationlastname.val(representation.lastname);
                // };

                ds.saverepresentation.on('click', function(){
                    var representation = me.datasource.representation;                   

                    with(representation) {
                        player = ds.representationplayer.val();
                        father = ds.representationfather.val();
                        mother = ds.representationmother.val();
                        datestart = ds.representationdatestart.val();
                        dateend = ds.representationdateend.val();
                        commission = ds.representationcommission.val();
                    };

                    controls.ajax({
                        functionname: 'insert_representation',
                        data: {
                            representation: representation
                        }
                    }, function (data) {
                        if (ifUndefinedOrNull(data.success, false)) {
                            controls.feedback.bind({ type: 'success', message: 'login com sucesso' });
                            window.open('representation_list.php', '_self');
                        } else {
                            controls.message.bind({ type: 'error', message: 'O utilizador não existe.' });
                        };
                    }, function () {
                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                    }, function () {
                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
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

function agent(args) {
    var agent = {
        design: {
            agentname: $('.txtAgentName'),
            agentclub: $('.txtAgentClub'),
            agentfirstname: $('.txtAgentFirstName'),
            agentlastname: $('.txtAgentLastName'),
            agentbirth: $('.txtAgentBirth'),
            agentnationality: $('.txtAgentNationality'),
            agentdocuments: $('.txtAgentDocuments'),
            agentdocumentsval: $('.txtAgentDocumentsVal'),
            agentcompany: $('.txtAgentCompany'),
            agentcontacts: $('.txtAgentContacts'),
            agentobs: $('.txtAgentObs'),
            saveagent: $('.btnSaveAgent')
        },
        datasource: {
            base: undefined,
            id: args.id,
            agent: args.agent
        },
        load: function() {
            var me = this,
                ds = me.design;            

            ds.saveagent.on('click', function(){
                var agent = me.datasource.agent;

                with(agent) {
                    name = ds.agentname.val();
                    club = ds.agentclub.val();
                    firstname = ds.agentfirstname.val();
                    lastname = ds.agentlastname.val();
                    birth = ds.agentbirth.val();
                    nationality = ds.agentnationality.val();
                    documents = ds.agentdocuments.val();
                    documentsval = ds.agentdocumentsval.val();
                    company = ds.agentcompany.val();
                    contacts = ds.agentcontacts.val();
                    obs = ds.agentobs.val();
                };

                controls.ajax({
                    functionname: 'insert_agent',
                    data: {
                        agent: agent
                    }
                }, function (data) {
                    if (ifUndefinedOrNull(data.success, false)) {
                        controls.feedback.bind({ type: 'success', message: 'login com sucesso' });
                        window.open('agents_list.php', '_self') ;
                    } else {
                        controls.message.bind({ type: 'error', message: 'O utilizador não existe.' });
                    };
                }, function () {
                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                }, function () {
                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                });
            });
        },
        init: function() {
            var me = this;

            me.datasource.base = this;

            me.load();
        }
    };
    agent.init();
};

function club(args) {
    var club = {
        design: {
            clubplayer: $('div.ddlCclubPlayer'),
            clubdatestart: $('.txtCclubDateStart'),
            clubdateend: $('.txtCclubDateEnd'),
            clubvalue: $('.txtCclubValue'),
            clubclause: $('.txtCclubClause'),
            clubbonus: $('.txtCclubBonus'),
            clubcourt: $('.txtCclubCourt'),
            clubobs: $('.txtCclubObs'),
            saveclub: $('.btnSaveCclub')
        },
        datasource: {
            base: undefined,
            id: args.id,
            club: args.club
        },
        load: function() {
            var me = this,
                ds = me.design;            

            ds.saveclub.on('click', function(){
                var club = me.datasource.club;

                with(club) {
                    player = ds.clubplayer.find('span.cs-placeholder').html();
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
                        club: club
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
        },
        init: function() {
            var me = this;
            me.datasource.base = this;
            me.load();
        }
    };
    club.init();
};

function mandates(args) {
    var mandates = {
        design: {
            mandatesplayer: $('div.ddlMandatesPlayer'),
            mandatesagent: $('.ddlMandatesAgent'),
            mandatesdatestart: $('.txtMandatesDateStart'),
            mandatesdateend: $('.txtMandatesDateEnd'),
            mandatesobs: $('.txtMandatesObs'),
            savemandates: $('.btnSaveMandates')
        },
        datasource: {
            base: undefined,
            id: args.id,
            mandates: args.mandates
        },
        load: function() {
            var me = this,
                ds = me.design;            

            ds.savemandates.on('click', function(){
                var mandates = me.datasource.mandates;

                with(mandates) {
                    player = ds.mandatesplayer.find('span.cs-placeholder').html();
                    agent = ds.mandatesagent.find('span.cs-placeholder').html();
                    datestart = ds.mandatesdatestart.val();
                    dateend = ds.mandatesdateend.val();
                    obs = ds.mandatesobs.val();
                };

                controls.ajax({
                    functionname: 'insert_mandates',
                    data: {
                        mandates: mandates
                    }
                }, function (data) {
                    if (ifUndefinedOrNull(data.success, false)) {
                        controls.feedback.bind({ type: 'success', message: 'login com sucesso' });
                        window.open('mandates_list.php', '_self');
                    } else {
                        controls.message.bind({ type: 'error', message: 'O utilizador não existe.' });
                    };
                }, function () {
                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                }, function () {
                    controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                });
            });
        },
        init: function() {
            var me = this;
            me.datasource.base = this;
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
                                            message: 'Os jogadores foram removidos com sucesso',
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
                                row.append(itemcolumn.format(ifUndefinedOrNull(list_representation.playername, '')));
                                row.append(itemcolumn.format(ifUndefinedOrNull(list_representation.datestart, '')));
                                row.append(itemcolumn.format(ifUndefinedOrNull(list_representation.dateend, '')));
                                row.append(itemcolumn.format(ifUndefinedOrNull(list_representation.commission, '')));
                                row.append(itemcolumn.format(ifUndefinedOrNull(list_representation.child, '')));
                                row.append(itemcolumn.format(ifUndefinedOrNull(list_representation.documents, '')));
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
                                row.append(itemcolumn.format(ifUndefinedOrNull(list_club.playername, '')));
                                row.append(itemcolumn.format(ifUndefinedOrNull(list_club.datestart, '')));
                                row.append(itemcolumn.format(ifUndefinedOrNull(list_club.dateend, '')));
                                row.append(itemcolumn.format(ifUndefinedOrNull(list_club.clubname, '')));
                                row.append(itemcolumn.format(ifUndefinedOrNull(list_club.value, '')));
                                row.append(itemcolumn.format(ifUndefinedOrNull(list_club.clause, '')));
                                row.append(itemcolumn.format(ifUndefinedOrNull(list_club.files, '')));
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


