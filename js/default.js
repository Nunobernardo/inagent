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

                        if (!isUndefinedOrNull(after)) { after(data); };
                    }, function () {
                        //[ ERROR ]
                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                    }, function () {
                        //[ ERROR ]
                        controls.feedback.bind({ type: 'error', message: controls.resources.generic_error });
                    });
                } else {
                    me.datasource.player = args.player;
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
            id: args.id,
            coach: args.coach
        },
        load: function() {
            var me = this,
                ds = me.design;            

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
        },
        init: function() {
            var me = this;
            me.datasource.base = this;
            me.load();
        }
    };
    coach.init();
};

function representation(args) {
    var representation = {
        design: {
            representationplayer: $('div.ddlRepresentationPlayer'),
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
            id: args.id,
            representation: args.representation
        },
        load: function() {
            var me = this,
                ds = me.design;            

            ds.saverepresentation.on('click', function(){
                var representation = me.datasource.representation;

                with(representation) {
                    player = ds.representationplayer.find('span.cs-placeholder').html();
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
        },
        init: function() {
            var me = this;
            me.datasource.base = this;
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

function cclub(args) {
    var cclub = {
        design: {
            cclubplayer: $('div.ddlCclubPlayer'),
            cclubdatestart: $('.txtCclubDateStart'),
            cclubdateend: $('.txtCclubDateEnd'),
            cclubvalue: $('.txtCclubValue'),
            cclubclause: $('.txtCclubClause'),
            cclubbonus: $('.txtCclubBonus'),
            cclubcourt: $('.txtCclubCourt'),
            cclubobs: $('.txtCclubObs'),
            savecclub: $('.btnSaveCclub')
        },
        datasource: {
            base: undefined,
            id: args.id,
            cclub: args.cclub
        },
        load: function() {
            var me = this,
                ds = me.design;            

            ds.savecclub.on('click', function(){
                var cclub = me.datasource.cclub;

                with(cclub) {
                    player = ds.cclubplayer.find('span.cs-placeholder').html();
                    datestart = ds.cclubdatestart.val();
                    dateend = ds.cclubdateend.val();
                    value = ds.cclubvalue.val();
                    clause = ds.cclubclause.val();
                    bonus = ds.cclubbonus.val();
                    court = ds.cclubcourt.val();
                    obs = ds.cclubobs.val();
                };

                controls.ajax({
                    functionname: 'insert_cclub',
                    data: {
                        cclub: cclub
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
    cclub.init();
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
                                    functionname: 'delete_list_player',
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
                                row.append(itemcolumn.format(ifUndefinedOrNull(list_player.nationality, '')));
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



