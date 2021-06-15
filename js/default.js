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
                    $('.titlePlayer').html('Editar Jogador');

                    //EDITAR JOGADOR
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
                            functionname: 'update_player',
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
                }else{
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
                };
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
            }
        },
        load: function() {
            var me = this,
                ds = me.design;            

            me.methods.getcoach(function(){
                var coach = me.datasource.coach;

                if (coach.id > 0) {
                    ds.coachname.val(coach.name);
                    ds.coachfirstname.val(coach.firstname);
                    ds.coachlastname.val(coach.lastname);
                    ds.coachbirth.val(coach.birth);
                    ds.coachnationality.val(coach.nationality);
                    ds.coachheight.val(coach.height);
                    ds.coachweight.val(coach.weight);
                    //ds.coachclub.val(coach.formation);
                    ds.coachvalue.val(coach.value);
                    ds.coachpassport.val(coach.passport);
                    ds.coachpassportval.val(coach.passportval);
                    $('.titleCoach').html('Editar Treinador');
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

function agent(args) {
    var agent = {
        design: {
            agentname: $('.txtAgentName'),
            agentclub: $('.txtAgentClub'),
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
            saveagent: $('.btnSaveAgent')
        },
        datasource: {
            base: undefined,
            id: ifUndefinedOrNull(args.data.agent_id, 0),
            agent: undefined
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
            }
        },
        load: function() {
            var me = this,
                ds = me.design;            

            me.methods.getagent(function(){
                var agent = me.datasource.agent;

                if (agent.id > 0) {
                    ds.agentname.val(agent.name);
                    ds.agentclub.val(agent.clubname);
                    ds.agentcountry.val(agent.country);
                    ds.agentfirstname.val(agent.firstname);
                    ds.agentlastname.val(agent.lastname);
                    ds.agentbirth.val(agent.birth);
                    ds.agentnationality.val(agent.nationality);
                    ds.agentdocuments.val(agent.passport);
                    ds.agentdocumentsval.val(agent.passportval);
                    ds.agentcompany.val(agent.agentcompany);
                    ds.agentcontacts.val(agent.contacts);
                    ds.agentobs.val(agent.obs);
                };

                ds.saveagent.on('click', function(){
                    var agent = me.datasource.agent;                   

                    with(agent) {
                        name = ds.agentname.val();
                        club = ds.agentclub.val();
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
                            agent: agent
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
            representationplayer: $('.div.ddlRepresentationPlayer'),
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

            //NOVO JOGADOR
            representationplayerclubnew: $('.txtPlayerClubNew'),
            representationplayernamenew: $('.txtPlayerNameNew'),
            representationplayerfirstnamenew: $('.txtPlayerFirstNameNew'),
            representationplayerlastnamenew: $('.txtPlayerLastNameNew'),
            representationplayerbirthnew: $('.txtPlayerBirthNew'),
            representationplayernationalitynew: $('.txtPlayerNationalityNew'),
            representationplayerheightnew: $('.txtPlayerHeightNew'),
            representationplayerweightnew: $('.txtPlayerWeightNew'),
            representationplayerpositionnew: $('div.ddlPlayerPositionNew'),
            representationplayerfootnew: $('div.ddlPlayerFootNew'),
            representationplayervaluenew: $('.txtPlayerValueNew'),
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
            representationplayerpositionedit: $('div.ddlPlayerPositionEdit'),
            representationplayerfootedit: $('div.ddlPlayerFootEdit'),
            representationplayerclubedit: $('.txtPlayerClubEdit'),
            representationplayervalueedit: $('.txtPlayerValueEdit'),
            representationplayerpassportedit: $('.txtPlayerPassportEdit'),
            representationplayerpassportvaledit: $('.txtPlayerPassportValEdit'),

            //NOVO CONTRATO DE REPRESENTAÇÃO
            representationfather: $('.txtRepresentationFather'),
            representationmother: $('.txtRepresentationMother'),
            representationdatestart: $('.txtRepresentationDateStart'),
            representationdateend: $('.txtRepresentationDateEnd'),
            representationcommission: $('.txtRepresentationCommission'),

            //BOTÕES
            saverepresentation: $('.btnSaveRepresentation'),
            saveeditplayer: $('.btnSavePlayerEdit'),
            savenewplayer: $('.btnSavePlayerNew'),
            addnewplayer: $('.addNewPlayer'),
            editplayer: $('.editPlayer')
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
            }
        },
        load: function() {
            var me = this,
                ds = me.design;            

            me.methods.getrepresentation(function(){
                var representation = me.datasource.representation;

                //DADOS DO CONTRATO E JOGADOR
                if (representation.id > 0) {
                    ds.representationplayer.val(representation.player);
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
                    $('.titleRepresentation').html('Editar contrato de representação');

                    ds.addnewplayer.remove();
                } else {
                    //ADICIONAR JOGADOR
                    ds.addnewplayer.on('click', function(){
                        ds.representationplayerclubnew.val('');
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
                    });

                    //BOTAO DE SALVAR ADICIONAR JOGADOR
                    ds.savenewplayer.on('click', function(){
                        var player = args.player;       
                        
                        with(player) {
                            name = ds.representationplayernamenew.val();
                            firstname = ds.representationplayerfirstnamenew.val();
                            lastname = ds.representationplayerlastnamenew.val();
                            birth = ds.representationplayerbirthnew.val();
                            nationality = ds.representationplayernationalitynew.val();
                            height = ds.representationplayerheightnew.val();
                            weight = ds.representationplayerweightnew.val();
                            foot = ds.representationplayerfootnew.find('span.cs-placeholder').html();
                            position = ds.representationplayerpositionnew.find('span.cs-placeholder').html();
                            value = ds.representationplayervaluenew.val();
                            passport = ds.representationplayerpassportnew.val();
                            passportval = ds.representationplayerpassportvalnew.val();
                        };

                        controls.ajax({
                            functionname: 'insert_player',
                            data: {
                                player: player
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
                };               

                //EDITAR DADOS DO JOGADOR
                ds.editplayer.on('click', function(){
                    ds.representationplayerclubedit.val(representation.clubname);
                    ds.representationplayernameedit.val(representation.name);
                    ds.representationplayerfirstnameedit.val(representation.firstname);
                    ds.representationplayerlastnameedit.val(representation.lastname);
                    ds.representationplayerbirthedit.val(representation.birth);
                    ds.representationplayernationalityedit.val(representation.nationality);
                    ds.representationplayerheightedit.val(representation.height);
                    ds.representationplayerweightedit.val(representation.weight);
                    ds.representationplayerfootedit.find('span.cs-placeholder').html();
                    ds.representationplayerpositionedit.find('span.cs-placeholder').html();
                    ds.representationplayervalueedit.val(representation.value);
                    ds.representationplayerpassportedit.val(representation.passport);
                    ds.representationplayerpassportvaledit.val(representation.passportval);
                });

                //BOTAO DE SALVAR EDIÇÃO DE JOGADOR
                ds.saveeditplayer.on('click', function(){
                    var player = args.player;       
                    
                    with(player) {
                        id = representation.player;
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

                    controls.ajax({
                        functionname: 'update_player',
                        data: {
                            player: player
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

                //INSERIR CONTRATO
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
            clubplayerclub: $('.txtPalyerClubClub'),
            clubplayervalue: $('.txtPLayerValueClub'),
            clubplayerpassport: $('.txtPlayerPassportClub'),
            clubplayerpassportval: $('.txtPlayerPassportValClub'),

            //NOVO JOGADOR
            clubplayerclubnew: $('.txtPlayerClubNewClub'),
            clubplayernamenew: $('.txtPlayerNameNewClub'),
            clubplayerfirstnamenew: $('.txtPlayerFirstNameNewClub'),
            clubplayerlastnamenew: $('.txtPlayerLastNameNewClub'),
            clubplayerbirthnew: $('.txtPlayerBirthNewClub'),
            clubplayernationalitynew: $('.txtPlayerNationalityNewClub'),
            clubplayerheightnew: $('.txtPlayerHeightNewClub'),
            clubplayerweightnew: $('.txtPlayerWeightNewClub'),
            clubplayerpositionnew: $('div.ddlPlayerPositionNewClub'),
            clubplayerfootnew: $('div.ddlPlayerFootNewClub'),
            clubplayervaluenew: $('.txtPlayerValueNewClub'),
            clubplayerpassportnew: $('.txtPlayerPassportNewClub'),
            clubplayerpassportvalnew: $('.txtPlayerPassportValNewClub'),

            //EDITAR JOGADOR
            clubplayernameedit: $('.txtPlayerNameEditClub'),
            clubplayerfirstnameedit: $('.txtPlayerFirstNameEditClub'),
            clubplayerlastnameedit: $('.txtPlayerLastNameEditClub'),
            clubplayerbirthedit: $('.txtPlayerBirthEditClub'),
            clubplayernationalityedit: $('.txtPlayerNationalityEditClub'),
            clubplayerheightedit: $('.txtPlayerHeightEditClub'),
            clubplayerweightedit: $('.txtPlayerWeightEditClub'),
            clubplayerpositionedit: $('div.ddlPlayerPositionEditClub'),
            clubplayerfootedit: $('div.ddlPlayerFootEditClub'),
            clubplayerclubedit: $('.txtPlayerClubEditClub'),
            clubplayervalueedit: $('.txtPlayerValueEditClub'),
            clubplayerpassportedit: $('.txtPlayerPassportEditClub'),
            clubplayerpassportvaledit: $('.txtPlayerPassportValEditClub'),

            //INSERIR CONTRATO
            clubplayer: $('div.ddlCclubPlayer'),
            clubclub: $('.txtCclub'),
            clubdatestart: $('.txtCclubDateStart'),
            clubdateend: $('.txtCclubDateEnd'),
            clubvalue: $('.txtCclubValue'),
            clubclause: $('.txtCclubClause'),
            clubbonus: $('.txtCclubBonus'),
            clubcourt: $('.txtCclubCourt'),
            clubobs: $('.txtCclubObs'),

            //BOTÕES
            saveclub: $('.btnSaveCclub'),
            saveeditplayerclub: $('.btnSavePlayerEditClub'),
            savenewplayerclub: $('.btnSavePlayerNewClub'),
            addnewplayerclub: $('.addNewPlayerClub'),
            editplayerclub: $('.editPlayerClub')
        },
        datasource: {
            base: undefined,
            id: ifUndefinedOrNull(args.data.club_id, 0),
            club: undefined
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
            }
        },
        load: function() {
            var me = this,
                ds = me.design;     
                
            me.methods.getclub(function(){
                var club = me.datasource.club;

                if (club.id > 0) {
                    ds.clubplayername.val(club.name);
                    ds.clubplayerfirstname.val(club.firstname);
                    ds.clubplayerlastname.val(club.lastname);
                    ds.clubplayerbirth.val(club.birth);
                    ds.clubplayernationality.val(club.nationality);
                    ds.clubplayerheight.val(club.height);
                    ds.clubplayerweight.val(club.weight);
                    ds.clubplayerclub.val(club.clubname);
                    ds.clubplayervalue.val(club.valueplayer);
                    ds.clubplayerpassport.val(club.passport);
                    ds.clubplayerpassportval.val(club.passportval);

                    ds.clubplayer.val(club.name);
                    ds.clubclub.val(club.clubname);
                    ds.clubdatestart.val(club.datestart);
                    ds.clubdateend.val(club.dateend);
                    ds.clubvalue.val(club.value);
                    ds.clubclause.val(club.clause);
                    ds.clubbonus.val(club.bonus);
                    ds.clubcourt.val(club.court);
                    ds.clubobs.val(club.obs);
                    $('.titleClub').html('Editar contrato de clubes');

                    ds.addnewplayerclub.remove();
                } else {
                    //ADICIONAR JOGADOR
                    ds.addnewplayerclub.on('click', function(){
                        ds.clubplayerclubnew.val('');
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
                };             

                //EDITAR DADOS DO JOGADOR
                ds.editplayerclub.on('click', function(){
                    ds.clubplayerclubedit.val(club.clubname);
                    ds.clubplayernameedit.val(club.name);
                    ds.clubplayerfirstnameedit.val(club.firstname);
                    ds.clubplayerlastnameedit.val(club.lastname);
                    ds.clubplayerbirthedit.val(club.birth);
                    ds.clubplayernationalityedit.val(club.nationality);
                    ds.clubplayerheightedit.val(club.height);
                    ds.clubplayerweightedit.val(club.weight);
                    ds.clubplayerfootedit.find('span.cs-placeholder').html();
                    ds.clubplayerpositionedit.find('span.cs-placeholder').html();
                    ds.clubplayervalueedit.val(club.value);
                    ds.clubplayerpassportedit.val(club.passport);
                    ds.clubplayerpassportvaledit.val(club.passportval);
                });

                //BOTAO DE SALVAR EDIÇÃO DE JOGADOR
                ds.saveeditplayerclub.on('click', function(){
                    var player = args.player;       
                    
                    with(player) {
                        id = club.player;
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

                //INSERIR CONTRATO CLUBES
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
            mandatesplayername: $('.txtPlayerName'),
            mandatesplayerfirstname: $('.txtPlayerFirstName'),
            mandatesplayerlastname: $('.txtPlayerLastName'),
            mandatesplayerbirth: $('.txtPlayerBirth'),
            mandatesplayernationality: $('.txtPlayerNationality'),
            mandatesplayerheight: $('.txtPlayerHeight'),
            mandatesplayerweight: $('.txtPlayerWeight'),
            mandatesplayerclub: $('.txtPalyerClub'),
            mandatesplayervalue: $('.txtPLayerValue'),
            mandatesplayerpassport: $('.txtPlayerPassport'),
            mandatesplayerpassportval: $('.txtPlayerPassportVal'),

            mandatesplayer: $('div.ddlMandatesPlayer'),
            mandatesagent: $('.ddlMandatesAgent'),
            mandatesdatestart: $('.txtMandatesDateStart'),
            mandatesdateend: $('.txtMandatesDateEnd'),
            mandatesdateend: $('.txtmandatesCompany'),
            mandatesdateend: $('.txtmandatesClub'),
            mandatesdateend: $('.txtmandatesCountry'),
            mandatesobs: $('.txtMandatesObs'),
            savemandates: $('.btnSaveMandates')
        },
        datasource: {
            base: undefined,
            id: ifUndefinedOrNull(args.data.mandates_id, 0),
            mandates: undefined
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
            }
        },
        load: function() {
            var me = this,
                ds = me.design;  
                
            me.methods.getmandates(function(){
                var mandates = me.datasource.mandates;

                if (mandates.id > 0) {
                    ds.mandatesplayer.val(mandates.player);
                    ds.mandatesplayername.val(mandates.name);
                    ds.mandatesplayerfirstname.val(mandates.firstname);
                    ds.mandatesplayerlastname.val(mandates.lastname);
                    ds.mandatesplayerbirth.val(mandates.birth);
                    ds.mandatesplayernationality.val(mandates.nationality);
                    ds.mandatesplayerheight.val(mandates.height);
                    ds.mandatesplayerweight.val(mandates.weight);
                    ds.mandatesplayerclub.val(mandates.clubname);
                    ds.mandatesplayervalue.val(mandates.value);
                    ds.mandatesplayerpassport.val(mandates.passport);
                    ds.mandatesplayerpassportval.val(mandates.passportval);
                    $('.titlePlayer').html('Editar Mandato');

                    ds.mandatesdatestart.val(mandates.datestart);
                    ds.mandatesdatestart.val(mandates.dateend);
                    ds.mandatesdatestart.val(mandates.agentcompany);
                    ds.mandatesdatestart.val(mandates.agentclub);
                    ds.mandatesdatestart.val(mandates.agentcountry);
                    ds.mandatesdatestart.val(mandates.obs);
                };

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
                                            message: 'Os jogadores foram removidos com sucesso',
                                            afterok: function () {
                                                //[ BIND list_mandate GRID ]
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

                                //[ OTHER COLUMNS ]
                                row.append(itemcolumn.format('<div class="checkbox text-center"><input type="checkbox" id="ckmandate{0}" data="{0}"><label for="ckmandate{0}" class="no-padding no-margin"></label></div>'.format(list_mandate.id)));
                                row.append(itemcolumn.format('{0} {1}'.format(list_mandate.playerfirstname, list_mandate.playerlastname)));
                                row.append(itemcolumn.format('{0} {1}'.format(list_mandate.agentfirstname, list_mandate.agentlastname)));
                                row.append(itemcolumn.format(ifUndefinedOrNull(list_mandate.agentcompany, '')));
                                row.append(itemcolumn.format(ifUndefinedOrNull(list_mandate.agentclubname, '')));
                                row.append(itemcolumn.format(ifUndefinedOrNull(list_mandate.agentcountry, '')));
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
                                //[ SAVE list_agent ID ]
                                attr('data', list_agent.id);

                                //[ OTHER COLUMNS ]
                                row.append(itemcolumn.format('<div class="checkbox text-center"><input type="checkbox" id="ckagent{0}" data="{0}"><label for="ckagent{0}" class="no-padding no-margin"></label></div>'.format(list_agent.id)));
                                row.append(itemcolumn.format(ifUndefinedOrNull(list_agent.name, '')));
                                row.append(itemcolumn.format(ifUndefinedOrNull(list_agent.agentcompany, '')));
                                row.append(itemcolumn.format(ifUndefinedOrNull(list_agent.clubname, '')));
                                row.append(itemcolumn.format(ifUndefinedOrNull(list_agent.country, '')));
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

