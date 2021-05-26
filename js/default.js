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
            playerfoot: $('.txtPlayerFoot'),
            playerposition: $('div.ddlPlayerPosition'),
            playerclub: $('.txtPlayerClub'),
            playervalue: $('.txtPlayerValue'),
            playerpassport: $('.txtPlayerPassport'),
            playerpassportval: $('.txtPlayerPassportVal'),
            saveplayer: $('.btnSavePlayer')
        },
        datasource: {
            base: undefined,
            id: args.id,
            player: args.player
        },
        load: function() {
            var me = this,
                ds = me.design;            

            ds.saveplayer.on('click', function(){
                var player = me.datasource.player;

                with(player) {
                    age = ds.playerage.val();
                    birth = ds.playerbirth.val();
                    club = ds.playerclub.val();
                    firstname = ds.playerfirstname.val();
                    foot = ds.playerfoot.val();
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
        },
        init: function() {
            var me = this;
            me.datasource.base = this;
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
