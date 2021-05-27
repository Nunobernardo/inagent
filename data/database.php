<?php
    include('connection.php');
    include('session.php');
    include('objects.php');

    header('Content-Type: application/json');

    $object;
    $feedback = array();

    //[ GET DATA SENT BY POST ]
    if(isset($_POST['data']) ) {
        $object = json_decode(urldecode($_POST['data']));
    };

    //[ CHECK IF FUNCTION NAME IS SET ]
    if(isset($_POST['functionname'])) {
        //[ CHECK SELECTED FUNCTION ]
        switch(strtolower($_POST['functionname'])) {
            case 'insert_player':
                $player = $object->{'player'};
                $birthPlayer = date("Y-m-d", strtotime($player->birth));
                $passportvalPlayer = date("Y-m-d", strtotime($player->passportval));

                //[ SET QUERY TO INSERT NEW PUBLICATION ]
                $query = "INSERT INTO players (id_player, id_club, image, first_name, last_name, name, nationality, birth_date, height, weight, foot, position, value, documents, documents_val)
                          VALUES (NULL, '1', '', '$player->firstname', '$player->lastname', '$player->name', '$player->nationality', '$birthPlayer', '$player->height', '$player->weight', '$player->foot', '$player->position', '$player->value', '$player->passport', '$passportvalPlayer');";


                //[ EXECUTE QUERY ]
                $result = mysqli_query($conn, $query);

                //[ CHECK RESULTS ]
                if ($result) {
                    $feedback['player_id'] = $conn->insert_id;

                    $feedback['success'] = true;
                } else {
                    $feedback['success'] = false;
                    $feedback['error'] = 'ERRO_INSERT_PLAYER';
                    $feedback['XX'] = date("Y-m-d H:i", strtotime($player->birth));
                };
                break;

            case 'insert_coach':
                $coach = $object->{'coach'};
                $birthCoach = date("Y-m-d", strtotime($coach->birth));
                $passportvalCoach = date("Y-m-d", strtotime($coach->passportval));

                //[ SET QUERY TO INSERT NEW PUBLICATION ]
                $query = "INSERT INTO coach (id_coach, id_club, first_name, last_name, name, nationality, birth_date, height, weight, formation, value, documents, documents_val)
                            VALUES (NULL, '1', '$coach->firstname', '$coach->lastname', '$coach->name', '$coach->nationality', '$birthCoach', '$coach->height', '$coach->weight', '$coach->formation', '$coach->value', '$coach->passport', '$passportvalCoach');";

                //[ EXECUTE QUERY ]
                $result = mysqli_query($conn, $query);

                //[ CHECK RESULTS ]
                if ($result) {
                    $feedback['coach_id'] = $conn->insert_id;

                    $feedback['success'] = true;
                } else {
                    $feedback['success'] = false;
                    $feedback['error'] = 'ERRO_INSERT_COACH';
                    $feedback['XX'] = $query;
                };
                break;

            case 'insert_representation':
                $representation = $object->{'representation'};
                $repdatestart = date("Y-m-d", strtotime($representation->datestart));
                $repdateend = date("Y-m-d", strtotime($representation->dateend));

                //[ SET QUERY TO INSERT NEW PUBLICATION ]
                $query = "INSERT INTO contract_representation (id_contract_rep, id_player, child, father_name, mother_name, date_start, date_end, commission)
                            VALUES (NULL, '44', '', '$representation->father', '$representation->mother', '$repdatestart', '$repdateend', '$representation->commission');";

                //[ EXECUTE QUERY ]
                $result = mysqli_query($conn, $query);

                //[ CHECK RESULTS ]
                if ($result) {
                    $feedback['representation_id'] = $conn->insert_id;

                    $feedback['success'] = true;
                } else {
                    $feedback['success'] = false;
                    $feedback['error'] = 'ERRO_INSERT_REPRESENTATION';
                    $feedback['XX'] = $query;
                };
                break;

            case 'insert_agent':
                $agent = $object->{'agent'};
                $birthagent = date("Y-m-d", strtotime($agent->birth));
                $documentsagent = date("Y-m-d", strtotime($agent->documentsval));

                //[ SET QUERY TO INSERT NEW PUBLICATION ]
                $query = "INSERT INTO agent (id_agent, name, first_name, last_name, birth_date, nationality, company, documents, documents_val, contacts, obs)
                            VALUES (NULL, '$agent->name', '$agent->firstname', '$agent->lastname', $birthagent, '$agent->nationality', '$agent->company', '$agent->documents', $documentsagent, '$agent->contacts', '$agent->obs');";

                //[ EXECUTE QUERY ]
                $result = mysqli_query($conn, $query);

                //[ CHECK RESULTS ]
                if ($result) {
                    $feedback['agent_id'] = $conn->insert_id;

                    $feedback['success'] = true;
                } else {
                    $feedback['success'] = false;
                    $feedback['error'] = 'ERRO_INSERT_agent';
                    $feedback['XX'] = $query;
                };
                break;

            case 'insert_cclub':
                $cclub = $object->{'cclub'};
                $ccdatestart = date("Y-m-d", strtotime($cclub->datestart));
                $ccdateend = date("Y-m-d", strtotime($cclub->dateend));

                //[ SET QUERY TO INSERT NEW PUBLICATION ]
                $query = "INSERT INTO contract_club (id_contract_club, id_player, id_club, date_start, date_end, value, clause, court, bonus, obs)
                            VALUES (NULL, '44', '1', '$ccdatestart', '$ccdateend', '$cclub->value', '$cclub->clause', '$cclub->court', '$cclub->bonus', '$cclub->obs');";

                //[ EXECUTE QUERY ]
                $result = mysqli_query($conn, $query);

                //[ CHECK RESULTS ]
                if ($result) {
                    $feedback['cclub_id'] = $conn->insert_id;

                    $feedback['success'] = true;
                } else {
                    $feedback['success'] = false;
                    $feedback['error'] = 'ERRO_INSERT_cclub';
                    $feedback['XX'] = $query;
                };
                break;
            case 'insert_mandates':
                $mandates = $object->{'mandates'};
                $mandatesdatestart = date("Y-m-d", strtotime($mandates->datestart));
                $mandatesdateend = date("Y-m-d", strtotime($mandates->dateend));

                //[ SET QUERY TO INSERT NEW PUBLICATION ]
                $query = "INSERT INTO mandates (id_mandates, id_player, date_start, date_end, obs)
                            VALUES (NULL, '44', '$mandatesdatestart', '$mandatesdateend', '$mandates->obs');";

                //[ EXECUTE QUERY ]
                $result = mysqli_query($conn, $query);

                //[ CHECK RESULTS ]
                if ($result) {
                    $feedback['mandates_id'] = $conn->insert_id;

                    $feedback['success'] = true;
                } else {
                    $feedback['success'] = false;
                    $feedback['error'] = 'ERRO_INSERT_mandates';
                    $feedback['XX'] = $query;
                };
                break;
            case '':
                break;

            default:
                $feedback['error'] = Feedback::FUNCTION_NAME_IS_NOT_SET . $_POST['functionname'];
                break;
        };

        //$feedback['login_page'] = CommonPages::LOGIN;
    } else {
        $feedback['error'] = Feedback::FUNCTION_NAME_IS_NOT_SET; 
    };

    //[ RETURN JSON ]
    echo json_encode($feedback);
?>