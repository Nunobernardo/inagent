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
                          VALUES (NULL, '1', '', '$player->firstname', '$player->lastname', '$player->name', '$player->nationality', '$birthPlayer', '$player->height', 
                          '$player->weight', '$player->foot', '$player->position', '$player->value', '$player->passport', '$passportvalPlayer');";


                //[ EXECUTE QUERY ]
                $result = mysqli_query($conn, $query);

                //[ CHECK RESULTS ]
                if ($result) {
                    $feedback['player_id'] = $conn->insert_id;
                    $feedback['success'] = true;
                } else {
                    $feedback['success'] = false;
                    $feedback['error'] = 'ERRO_INSERT_PLAYER';
                };
                break;

            case 'update_player':
                $player = $object->{'player'};
                $birthPlayer = date("Y-m-d", strtotime($player->birth));
                $passportvalPlayer = date("Y-m-d", strtotime($player->passportval));

                //[ SET QUERY TO INSERT NEW PUBLICATION ]
                $query = "UPDATE players 
                          SET 
                          id_club = '2', 
                          first_name = '$player->firstname', 
                          last_name = '$player->lastname', 
                          name = '$player->name', 
                          nationality = '$player->nationality', 
                          birth_date = '$birthPlayer', 
                          height = '$player->height', 
                          weight = '$player->weight', 
                          foot = '$player->foot', 
                          position = '$player->position', 
                          value = '$player->value', 
                          documents = '$player->passport', 
                          documents_val = '$passportvalPlayer'
                          WHERE id_player = $player->id ";

                //[ EXECUTE QUERY ]
                $result = mysqli_query($conn, $query);

                //[ CHECK RESULTS ]
                if ($result) {
                    $feedback['player_id'] = $conn->insert_id;
                    $feedback['success'] = true;
                } else {
                    $feedback['success'] = false;
                    $feedback['error'] = 'ERRO_UPDATE_PLAYER';
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

            case 'update_representation':
                $representation = $object->{'representation'};
                $repdatestart = date("Y-m-d", strtotime($representation->datestart));
                $repdateend = date("Y-m-d", strtotime($representation->dateend));

                //[ SET PAGED QUERY TO GET PUBLICATIONS ]
                $query = "UPDATE contract_representation SET 
                            id_player = '50',
                            child = '$representation->child',
                            father_name = '$representation->father',
                            mother_name = '$representation->mother',
                            date_start = '$repdatestart',
                            date_end = '$repdateend',
                            commission = '$representation->commission'
                            WHERE id_contract_rep = " . $representation->id;

                //[ EXECUTE QUERY ]
                $result = mysqli_query($conn, $query);

                //[ CHECK RESULTS ]
                if ($result) {
                    $feedback['representation_id'] = $conn->insert_id;

                    $feedback['success'] = true;
                } else {
                    $feedback['success'] = false;
                    $feedback['error'] = 'ERRO_UPDATE_REPRESENTATION';
                };
                break;

            case 'insert_agent':
                $agent = $object->{'agent'};
                $birthagent = date("Y-m-d", strtotime($agent->birth));
                $passportvalsagent = date("Y-m-d", strtotime($agent->passportval));

                //[ SET QUERY TO INSERT NEW PUBLICATION ]
                $query = "INSERT INTO agent (id_agent, name, first_name, last_name, birth_date, nationality, company, documents, documents_val, contacts, obs)
                            VALUES (NULL, '$agent->name', '$agent->firstname', '$agent->lastname', '$birthagent', '$agent->nationality', '$agent->agentcompany', '$agent->passport', '$passportvalsagent', '$agent->contacts', '$agent->obs');";

                //[ EXECUTE QUERY ]
                $result = mysqli_query($conn, $query);

                //[ CHECK RESULTS ]
                if ($result) {
                    $feedback['agent_id'] = $conn->insert_id;

                    $feedback['success'] = true;
                } else {
                    $feedback['success'] = false;
                    $feedback['error'] = 'ERRO_INSERT_AGENT';
                    $feedback['XX'] = $query;
                };
                break;

            case 'update_agent':
                $agent = $object->{'agent'};
                $birthagent = date("Y-m-d", strtotime($agent->birth));
                $passportvalagent = date("Y-m-d", strtotime($agent->passportval));

                //[ SET QUERY TO INSERT NEW PUBLICATION ]
                $query = "UPDATE agent 
                            SET   
                            name = '$agent->name', 
                            first_name = '$agent->firstname', 
                            last_name = '$agent->lastname',
                            nationality = '$agent->nationality', 
                            birth_date = '$birthagent', 
                            documents = '$agent->passport', 
                            documents_val = '$passportvalagent',
                            company = '$agent->agentcompany',
                            contacts = '$agent->contacts',
                            obs = '$agent->obs'
                            WHERE id_agent = $agent->id ";

                //[ EXECUTE QUERY ]
                $result = mysqli_query($conn, $query);
                $feedback['XXXXXXXXXX'] = $query;

                //[ CHECK RESULTS ]
                if ($result) {
                    $feedback['agent_id'] = $conn->insert_id;
                    $feedback['success'] = true;
                } else {
                    $feedback['success'] = false;
                    $feedback['error'] = 'ERRO_UPDATE_PLAYER';
                };
                break;

            case 'insert_club':
                $club = $object->{'club'};
                $cdatestart = date("Y-m-d", strtotime($club->datestart));
                $cdateend = date("Y-m-d", strtotime($club->dateend));

                //[ SET QUERY TO INSERT NEW PUBLICATION ]
                $query = "INSERT INTO contract_club (id_contract_club, id_player, id_club, date_start, date_end, value, clause, court, bonus, obs)
                            VALUES (NULL, '44', '1', '$cdatestart', '$cdateend', '$club->value', '$club->clause', '$club->court', '$club->bonus', '$club->obs');";

                //[ EXECUTE QUERY ]
                $result = mysqli_query($conn, $query);

                //[ CHECK RESULTS ]
                if ($result) {
                    $feedback['club_id'] = $conn->insert_id;

                    $feedback['success'] = true;
                } else {
                    $feedback['success'] = false;
                    $feedback['error'] = 'ERRO_INSERT_CLUB';
                    $feedback['XX'] = $query;
                };
                break;

            case 'update_club':
                $club = $object->{'club'};
                $clubdatestart = date("Y-m-d", strtotime($club->datestart));
                $clubdateend = date("Y-m-d", strtotime($club->dateend));

                //[ SET PAGED QUERY TO GET PUBLICATIONS ]
                $query = "UPDATE contract_club SET 
                            id_player = '50',
                            id_club = '3',
                            value = '$club->value',
                            date_start = '$clubdatestart',
                            date_end = '$clubdateend',
                            clause = '$club->clause',
                            court = '$club->court',
                            bonus = '$club->bonus',
                            obs = '$club->obs'
                            WHERE id_contract_club = " . $club->id;

                //[ EXECUTE QUERY ]
                $result = mysqli_query($conn, $query);
                $feedback['XXXXX'] = $result;

                //[ CHECK RESULTS ]
                if ($result) {
                    $feedback['club_id'] = $conn->insert_id;
                    $feedback['success'] = true;
                } else {
                    $feedback['success'] = false;
                    $feedback['error'] = 'ERRO_UPDATE_CLUB';
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
            
            case 'players':
                    $players = array();
                    $page = (isset($object->{'page'})) ? urldecode($object->{'page'}) : 1;
                    $records = (isset($object->{'records'})) ? urldecode($object->{'records'}) : 10;
                    $offset = ($page - 1) * $records;
                    
                    //[ SET NOT PAGED QUERY TO GET TOTAL PUBLICATIONS ]
                    $total_pages_query = "SELECT COUNT(*) AS total_records 
                                          FROM players p
                                          INNER JOIN club c ON p.id_club = c.id_club";
    
                    $result = mysqli_query($conn, $total_pages_query);
    
                    //[ TOTAL VALUES ]
                    $total_records = intval($result->fetch_array(MYSQLI_ASSOC)['total_records']);
                    $total_pages = ceil($total_records / $records);
    
                    //[ SET PAGED QUERY TO GET PUBLICATIONS ]
                    $query = "SELECT p.id_player, p.first_name, p.last_name, p.birth_date, p.nationality, p.position, c.name_club as club_name, p.value 
                              FROM players p
                              INNER JOIN club c ON p.id_club = c.id_club
                              LIMIT $offset, $records";
    
                    //[ EXECUTE QUERY ]
                    $result = mysqli_query($conn, $query);

                    //[ CHECK RESULTS ]
                    if ($result->num_rows > 0) {   
                        while($row = $result->fetch_assoc()) {
                            array_push($players, new player($row));
                        };
                        
                        //[ SET TOTAL ]
                        $total = $result->num_rows;
                    };
    
                    $feedback['success'] = true;
                    $feedback['players'] = $players;
                    $feedback['current_page'] = $page;
                    $feedback['detail_page'] = "players_new.php";
                    $feedback['total'] = $total_records;
                    $feedback['total_pages'] = $total_pages;
                    break;
            
            case 'player':
                $playerid = intval(urldecode($object->{'player_id'}));

                //[ SET PAGED QUERY TO GET PUBLICATIONS ]
                $query = "SELECT p.id_player, p.name, p.first_name, p.last_name, p.height, p.weight, p.birth_date, p.nationality, p.foot, p.position, p.value, p.documents, p.documents_val,  c.name_club as club_name
                            FROM players p
                            INNER JOIN club c ON p.id_club = c.id_club
                            WHERE
                            p.id_player = " . $playerid;

                //[ EXECUTE QUERY ]
                $result = mysqli_query($conn, $query);

                //[ CHECK RESULTS ]
                if ($result->num_rows > 0) {   
                    $player = new player($result->fetch_array(MYSQLI_ASSOC));
                };

                $feedback['success'] = true;
                $feedback['player'] = $player;
                break;

            case 'delete_player':
                $playerid = json_encode($object->{'players_ids'});
                $playerid = str_replace("[","(", $playerid);
                $playerid = str_replace("]", ")", $playerid);

                //[ SET QUERY TO DELETE PUBLICATIONS HISTORY ASSOCIATED TO SELECTED PUBLICATION ]
                $query = "DELETE cr
                            FROM players p
                            INNER JOIN contract_representation cr ON cr.id_player = p.id_player
                            WHERE p.id_player in " . $playerid;

                //[ EXECUTE QUERY ]
                $result = mysqli_query($conn, $query);

                //[ CHECK RESULTS ]
                if ($result) {
                    //[ SET QUERY TO DELETE PUBLICATIONS USERS ASSOCIATED TO SELECTED PUBLICATION ]
                    $query = "DELETE cc
                                FROM players p
                                INNER JOIN contract_club cc ON cc.id_player = p.id_player
                                WHERE p.id_player in " . $playerid;
                    
                    //[ EXECUTE QUERY ]
                    $result = mysqli_query($conn, $query);

                    //[ CHECK RESULTS ]
                    if ($result) {
                        //[ SET QUERY TO DELETE SELECTED PUBLICATION ]
                        $query = "DELETE m
                                    FROM players p
                                    INNER JOIN mandates m ON m.id_player = p.id_player
                                    WHERE p.id_player in " . $playerid;

                        //[ EXECUTE QUERY ]
                        $result = mysqli_query($conn, $query);
        
                        if ($result) {
                            //[ SET QUERY TO DELETE SELECTED PUBLICATION ]
                            $query = "DELETE p
                                        FROM players p
                                        WHERE p.id_player in " . $playerid;
    
                            //[ EXECUTE QUERY ]
                            $result = mysqli_query($conn, $query);
            
                            //[ CHECK RESULTS ]
                            if ($result) {
                                $feedback['success'] = true;
                            } else {
                                $feedback['success'] = false;
                                $feedback['error'] = "ERROR_REMOVING_PLAYERS";
                            };
                        } 
                    } else {
                        $feedback['success'] = false;
                        $feedback['error'] = "ERROR_REMOVING_PLAYERS";
                    };
                } else {
                    $feedback['success'] = false;
                    $feedback['error'] = "ERROR_REMOVING_PLAYERS";
                };
                break;

            case 'coaches':
                $coaches = array();
                $page = (isset($object->{'page'})) ? urldecode($object->{'page'}) : 1;
                $records = (isset($object->{'records'})) ? urldecode($object->{'records'}) : 10;
                $offset = ($page - 1) * $records;
                
                //[ SET NOT PAGED QUERY TO GET TOTAL PUBLICATIONS ]
                $total_pages_query = "SELECT COUNT(*) AS total_records 
                                        FROM coach co
                                        INNER JOIN club c ON co.id_club = c.id_club";

                $result = mysqli_query($conn, $total_pages_query);

                //[ TOTAL VALUES ]
                $total_records = intval($result->fetch_array(MYSQLI_ASSOC)['total_records']);
                $total_pages = ceil($total_records / $records);

                //[ SET PAGED QUERY TO GET PUBLICATIONS ]
                $query = "SELECT co.id_coach, co.first_name, co.last_name, co.birth_date, co.nationality, co.formation, c.name_club as club_name, co.value 
                            FROM coach co
                            INNER JOIN club c ON co.id_club = c.id_club
                            LIMIT $offset, $records";

                //[ EXECUTE QUERY ]
                $result = mysqli_query($conn, $query);

                //[ CHECK RESULTS ]
                if ($result->num_rows > 0) {   
                    while($row = $result->fetch_assoc()) {
                        array_push($coaches, new coach($row));
                    };
                    
                    //[ SET TOTAL ]
                    $total = $result->num_rows;
                };

                $feedback['success'] = true;
                $feedback['coaches'] = $coaches;
                $feedback['current_page'] = $page;
                $feedback['detail_page'] = "coaches_new.php";
                $feedback['total'] = $total_records;
                $feedback['total_pages'] = $total_pages;
                break;

            case 'coach':
                $coachid = intval(urldecode($object->{'coach_id'}));

                //[ SET PAGED QUERY TO GET PUBLICATIONS ]
                $query = "SELECT co.id_coach, co.name, co.first_name, co.last_name, co.birth_date, co.nationality, co.height, co. weight, co.formation, co.value, co.documents, co.documents_val, c.name_club as club_name 
                            FROM coach co
                            INNER JOIN club c ON co.id_club = c.id_club
                            WHERE
                            co.id_coach = " . $coachid;

                //[ EXECUTE QUERY ]
                $result = mysqli_query($conn, $query);

                //[ CHECK RESULTS ]
                if ($result->num_rows > 0) {   
                    $coach = new coach($result->fetch_array(MYSQLI_ASSOC));
                };

                $feedback['temp'] = $query;

                $feedback['success'] = true;
                $feedback['coach'] = $coach;
                break;

            case 'delete_coach':
                $text = json_encode($object->{'coaches_ids'});
                $text = str_replace("[","", $text);
                $text = str_replace("]", "", $text);

                // //[ SET QUERY TO DELETE PUBLICATIONS HISTORY ASSOCIATED TO SELECTED PUBLICATION ]
                // $query = "DELETE ph.*
                //             FROM publications p
                //             INNER JOIN publications_users pu ON pu.publication_id = p.id
                //             INNER JOIN publications_history ph ON ph.publication_id = p.id
                //             WHERE p.id in (" . $text . ")";

                // //[ EXECUTE QUERY ]
                // $result = mysqli_query($conn, $query);

                // //[ CHECK RESULTS ]
                // if ($result) {
                //     //[ SET QUERY TO DELETE PUBLICATIONS USERS ASSOCIATED TO SELECTED PUBLICATION ]
                //     $query = "DELETE pu.*
                //                 FROM publications p
                //                 INNER JOIN publications_users pu ON pu.publication_id = p.id
                //                 WHERE p.id = " . $publicationid;
                    
                //     //[ EXECUTE QUERY ]
                //     $result = mysqli_query($conn, $query);

                //     //[ CHECK RESULTS ]
                //     if ($result) {
                //         //[ SET QUERY TO DELETE SELECTED PUBLICATION ]
                //         $query = "DELETE FROM publications WHERE id = " . $publicationid;

                //         //[ EXECUTE QUERY ]
                //         $result = mysqli_query($conn, $query);
        
                //         //[ CHECK RESULTS ]
                //         if ($result) {
                //             $feedback['success'] = true;
                //         } else {
                //             $feedback['success'] = false;
                //             $feedback['error'] = "ERROR_REMOVING_COACHES";
                //         };
                //     } else {
                //         $feedback['success'] = false;
                //         $feedback['error'] = "ERROR_REMOVING_COACHES";
                //     };
                // } else {
                //     $feedback['success'] = false;
                //     $feedback['error'] = "ERROR_REMOVING_COACHES";
                // };
                break;

            
            case 'representations':
                $representations = array();
                $page = (isset($object->{'page'})) ? urldecode($object->{'page'}) : 1;
                $records = (isset($object->{'records'})) ? urldecode($object->{'records'}) : 10;
                $offset = ($page - 1) * $records;
                
                //[ SET NOT PAGED QUERY TO GET TOTAL PUBLICATIONS ]
                $total_pages_query = "SELECT COUNT(*) AS total_records 
                                        FROM contract_representation cr
                                        INNER JOIN players p ON cr.id_player = p.id_player";

                $result = mysqli_query($conn, $total_pages_query);

                //[ TOTAL VALUES ]
                $total_records = intval($result->fetch_array(MYSQLI_ASSOC)['total_records']);
                $total_pages = ceil($total_records / $records);

                //[ SET PAGED QUERY TO GET PUBLICATIONS ]
                $query = "SELECT cr.id_contract_rep, cr.date_start, cr.date_end, cr.child, cr.commission, p.first_name, p.last_name 
                            FROM contract_representation cr 
                            INNER JOIN players p ON cr.id_player = p.id_player
                            LIMIT $offset, $records";

                //[ EXECUTE QUERY ]
                $result = mysqli_query($conn, $query);

                //[ CHECK RESULTS ]
                if ($result->num_rows > 0) {   
                    while($row = $result->fetch_assoc()) {
                        array_push($representations, new representation($row));
                    };
                    
                    //[ SET TOTAL ]
                    $total = $result->num_rows;
                };

                $feedback['success'] = true;
                $feedback['representations'] = $representations;
                $feedback['current_page'] = $page;
                $feedback['detail_page'] = "representation_new.php";
                $feedback['total'] = $total_records;
                $feedback['total_pages'] = $total_pages;
                break;

            case 'representation':
                $representationid = intval(urldecode($object->{'representation_id'}));

                //[ SET PAGED QUERY TO GET PUBLICATIONS ]
                $query = "SELECT cr.id_contract_rep, p.id_player, cr.date_start, cr.date_end, cr.child,  cr.father_name, cr.mother_name, 
                            cr.commission, p.name, p.first_name, p.last_name, p.birth_date, p.nationality, p.height, p.weight, p.value, p.documents, 
                            p.documents_val, c.name_club
                            FROM contract_representation cr
                            INNER JOIN players p ON cr.id_player = p.id_player
                            INNER JOIN club c ON p.id_club = c.id_club
                            WHERE
                            cr.id_contract_rep = " . $representationid;

                //[ EXECUTE QUERY ]
                $result = mysqli_query($conn, $query);

                //[ CHECK RESULTS ]
                if ($result->num_rows > 0) {   
                    $representation = new representation($result->fetch_array(MYSQLI_ASSOC));
                };

                $feedback['success'] = true;
                $feedback['representation'] = $representation;
                break;

            case 'delete_representation':
                $representationid = json_encode($object->{'representations_ids'});
                $representationid = str_replace("[","(", $representationid);
                $representationid = str_replace("]", ")", $representationid);

                //[ SET QUERY TO DELETE PUBLICATIONS HISTORY ASSOCIATED TO SELECTED PUBLICATION ]
                $query = "DELETE 
                            FROM contract_representation 
                            WHERE contract_representation.id_contract_rep = " . $representationid;

                //[ EXECUTE QUERY ]
                $result = mysqli_query($conn, $query);

                //[ CHECK RESULTS ]
                if ($result) {
                    $feedback['success'] = true;
                } else {
                    $feedback['success'] = false;
                    $feedback['error'] = "ERROR_REMOVING_PLAYERS";
                };

                break;
    
            case 'clubs':
                $clubs = array();
                $page = (isset($object->{'page'})) ? urldecode($object->{'page'}) : 1;
                $records = (isset($object->{'records'})) ? urldecode($object->{'records'}) : 10;
                $offset = ($page - 1) * $records;
                
                //[ SET NOT PAGED QUERY TO GET TOTAL PUBLICATIONS ]
                $total_pages_query = "SELECT COUNT(*) AS total_records 
                                        FROM contract_club cc 
                                        INNER JOIN club c ON cc.id_club = c.id_club 
                                        INNER JOIN players p ON cc.id_player = p.id_player";

                $result = mysqli_query($conn, $total_pages_query);

                //[ TOTAL VALUES ]
                $total_records = intval($result->fetch_array(MYSQLI_ASSOC)['total_records']);
                $total_pages = ceil($total_records / $records);

                //[ SET PAGED QUERY TO GET PUBLICATIONS ]
                $query = "SELECT cc.id_contract_club, cc.date_start, cc.date_end, c.name_club as club_name,
                             cc.value, cc.clause, p.first_name, p.last_name
                            FROM contract_club cc 
                            INNER JOIN club c ON cc.id_club = c.id_club 
                            INNER JOIN players p ON cc.id_player = p.id_player
                            LIMIT $offset, $records";

                //[ EXECUTE QUERY ]
                $result = mysqli_query($conn, $query);

                //[ CHECK RESULTS ]
                if ($result->num_rows > 0) {   
                    while($row = $result->fetch_assoc()) {
                        array_push($clubs, new club($row));
                    };
                    
                    //[ SET TOTAL ]
                    $total = $result->num_rows;
                };

                $feedback['success'] = true;
                $feedback['clubs'] = $clubs;
                $feedback['current_page'] = $page;
                $feedback['detail_page'] = "clubs_new.php";
                $feedback['total'] = $total_records;
                $feedback['total_pages'] = $total_pages;
                break;
        
            case 'club':
                $clubid = intval(urldecode($object->{'club_id'}));

                //[ SET PAGED QUERY TO GET PUBLICATIONS ]
                $query = "SELECT cc.id_contract_club, p.id_player, cc.date_start, cc.date_end, cc.value,  cc.clause, cc.court, 
                            cc.bonus, cc.obs, p.name, p.first_name, p.last_name, p.birth_date, p.nationality, p.height, p.weight, 
                            p.value as value_player, p.documents, p.documents_val, c.name_club as club_name
                            FROM contract_club cc
                            INNER JOIN players p ON cc.id_player = p.id_player
                            INNER JOIN club c ON cc.id_club = c.id_club
                            WHERE cc.id_contract_club = " . $clubid;

                //[ EXECUTE QUERY ]
                $result = mysqli_query($conn, $query);

                //[ CHECK RESULTS ]
                if ($result->num_rows > 0) {   
                    $club = new club($result->fetch_array(MYSQLI_ASSOC));
                };

                $feedback['success'] = true;
                $feedback['club'] = $club;
                break;

            case 'delete_club':
                $clubid = json_encode($object->{'clubs_ids'});
                $clubid = str_replace("[","(", $clubid);
                $clubid = str_replace("]", ")", $clubid);

                //[ SET QUERY TO DELETE PUBLICATIONS HISTORY ASSOCIATED TO SELECTED PUBLICATION ]
                $query = "DELETE 
                            FROM contract_club 
                            WHERE contract_club.id_contract_club = " . $clubid;

                //[ EXECUTE QUERY ]
                $result = mysqli_query($conn, $query);

                //[ CHECK RESULTS ]
                if ($result) {
                    $feedback['success'] = true;
                } else {
                    $feedback['success'] = false;
                    $feedback['error'] = "ERROR_REMOVING_PLAYERS";
                };

                break;
               
            case 'mandates':
                $mandates = array();
                $page = (isset($object->{'page'})) ? urldecode($object->{'page'}) : 1;
                $records = (isset($object->{'records'})) ? urldecode($object->{'records'}) : 10;
                $offset = ($page - 1) * $records;
                
                //[ SET NOT PAGED QUERY TO GET TOTAL PUBLICATIONS ]
                $total_pages_query = "SELECT COUNT(*) AS total_records 
                                        FROM mandates m 
                                        INNER JOIN players p ON p.id_player = m.id_player
                                        INNER JOIN mandates_agent ma ON m.id_mandates = ma.id_mandate 
                                        INNER JOIN agent_club ac ON ma.id_agent_club = ac.id_agent_club
                                        INNER JOIN agent a ON a.id_agent = ac.id_agent
                                        INNER JOIN club c ON c.id_club = ac.id_club";

                $result = mysqli_query($conn, $total_pages_query);

                //[ TOTAL VALUES ]
                $total_records = intval($result->fetch_array(MYSQLI_ASSOC)['total_records']);
                $total_pages = ceil($total_records / $records);

                //[ SET PAGED QUERY TO GET PUBLICATIONS ]
                $query = "SELECT m.id_mandates, m.date_start AS m_date_start, m.date_end AS m_date_end,
                            p.first_name AS p_first_name, p.last_name AS p_last_name, 
                            a.company AS a_company, a.first_name AS a_first_name, a.last_name AS a_last_name, 
                            c.name_club as club_name_agent, c.country as country_name_agent
                            FROM mandates m 
                            INNER JOIN players p ON p.id_player = m.id_player
                            INNER JOIN mandates_agent ma ON m.id_mandates = ma.id_mandate 
                            INNER JOIN agent_club ac ON ma.id_agent_club = ac.id_agent_club
                            INNER JOIN agent a ON a.id_agent = ac.id_agent
                            INNER JOIN club c ON c.id_club = ac.id_club
                            LIMIT $offset, $records";

                //[ EXECUTE QUERY ]
                $result = mysqli_query($conn, $query);

                //[ CHECK RESULTS ]
                if ($result->num_rows > 0) {   
                    while($row = $result->fetch_assoc()) {
                        array_push($mandates, new mandates($row));
                    };
                    
                    //[ SET TOTAL ]
                    $total = $result->num_rows;
                };

                $feedback['success'] = true;
                $feedback['mandates'] = $mandates;
                $feedback['current_page'] = $page;
                $feedback['detail_page'] = "mandates_new.php";
                $feedback['total'] = $total_records;
                $feedback['total_pages'] = $total_pages;
                break;
        
            case 'mandate':
                $mandateid = intval(urldecode($object->{'mandates_id'}));

                //[ SET PAGED QUERY TO GET PUBLICATIONS ]
                $query = "SELECT m.id_mandates, m.date_start AS m_date_start, m.date_end AS m_date_end, m.obs AS m_obs,
                            p.id_player, p.name AS p_name, p.first_name AS p_first_name, p.last_name AS p_last_name, p.nationality AS p_nationality,
                            p.birth_date AS p_birth_date, p.height AS p_height, p.weight AS p_weight, p.position AS p_position, 
                            p.foot AS p_foot, p.value AS p_value, p.documents AS p_documents, p.documents_val AS p_documentsval, p.id_club, cp.name_club as club_name_player,
                            ac.id_agent, a.name AS a_name, a.company AS a_company, a.first_name AS a_first_name, a.last_name AS a_last_name, 
                            a.nationality As a_nationality, a.birth_date AS a_birth_date, a.documents AS a_documents, 
                            a.documents_val AS a_documents_val, a.contacts AS a_contacts, a.obs AS a_obs,
                            c.name_club as club_name_agent, c.country as country_name_agent
                            FROM mandates m 
                            INNER JOIN players p ON p.id_player = m.id_player
                            INNER JOIN mandates_agent ma ON m.id_mandates = ma.id_mandate 
                            INNER JOIN agent_club ac ON ma.id_agent_club = ac.id_agent_club AND ac.id_agent = ma.id_agent
                            INNER JOIN agent a ON a.id_agent = ac.id_agent
                            INNER JOIN club c ON c.id_club = ac.id_club
                            INNER JOIN club cp ON cp.id_club = p.id_club
                            WHERE m.id_mandates = " . $mandateid;

                //[ EXECUTE QUERY ]
                $result = mysqli_query($conn, $query);

                //[ CHECK RESULTS ]
                if ($result->num_rows > 0) {   
                    $mandate = new mandates($result->fetch_array(MYSQLI_ASSOC));
                };

                $feedback['success'] = true;
                $feedback['mandate'] = $mandate;
                break;

            case 'delete_mandate':
                $text = json_encode($object->{'mandates_id'});
                $text = str_replace("[","", $text);
                $text = str_replace("]", "", $text);

                // //[ SET QUERY TO DELETE PUBLICATIONS HISTORY ASSOCIATED TO SELECTED PUBLICATION ]
                // $query = "DELETE ph.*
                //             FROM publications p
                //             INNER JOIN publications_users pu ON pu.publication_id = p.id
                //             INNER JOIN publications_history ph ON ph.publication_id = p.id
                //             WHERE p.id in (" . $text . ")";

                // //[ EXECUTE QUERY ]
                // $result = mysqli_query($conn, $query);

                // //[ CHECK RESULTS ]
                // if ($result) {
                //     //[ SET QUERY TO DELETE PUBLICATIONS USERS ASSOCIATED TO SELECTED PUBLICATION ]
                //     $query = "DELETE pu.*
                //                 FROM publications p
                //                 INNER JOIN publications_users pu ON pu.publication_id = p.id
                //                 WHERE p.id = " . $publicationid;
                    
                //     //[ EXECUTE QUERY ]
                //     $result = mysqli_query($conn, $query);

                //     //[ CHECK RESULTS ]
                //     if ($result) {
                //         //[ SET QUERY TO DELETE SELECTED PUBLICATION ]
                //         $query = "DELETE FROM publications WHERE id = " . $publicationid;

                //         //[ EXECUTE QUERY ]
                //         $result = mysqli_query($conn, $query);
        
                //         //[ CHECK RESULTS ]
                //         if ($result) {
                //             $feedback['success'] = true;
                //         } else {
                //             $feedback['success'] = false;
                //             $feedback['error'] = "ERROR_REMOVING_CLUBS";
                //         };
                //     } else {
                //         $feedback['success'] = false;
                //         $feedback['error'] = "ERROR_REMOVING_CLUBS";
                //     };
                // } else {
                //     $feedback['success'] = false;
                //     $feedback['error'] = "ERROR_REMOVING_CLUBS";
                // };
                break;

            case 'agents':
                $agents = array();
                $page = (isset($object->{'page'})) ? urldecode($object->{'page'}) : 1;
                $records = (isset($object->{'records'})) ? urldecode($object->{'records'}) : 10;
                $offset = ($page - 1) * $records;
                
                //[ SET NOT PAGED QUERY TO GET TOTAL PUBLICATIONS ]
                $total_pages_query = "SELECT COUNT(*) AS total_records 
                                        FROM agent a
                                        INNER JOIN agent_club ac ON ac.id_agent = a.id_agent
                                        INNER JOIN club c ON c.id_club = ac.id_club";

                $result = mysqli_query($conn, $total_pages_query);

                //[ TOTAL VALUES ]
                $total_records = intval($result->fetch_array(MYSQLI_ASSOC)['total_records']);
                $total_pages = ceil($total_records / $records);

                //[ SET PAGED QUERY TO GET PUBLICATIONS ]
                $query = "SELECT a.id_agent, a.name, a.company, a.contacts, c.name_club as club_name, c.country as country_name
                            FROM agent a
                            INNER JOIN agent_club ac ON ac.id_agent = a.id_agent
                            INNER JOIN club c ON c.id_club = ac.id_club
                            LIMIT $offset, $records";

                //[ EXECUTE QUERY ]
                $result = mysqli_query($conn, $query);

                //[ CHECK RESULTS ]
                if ($result->num_rows > 0) {   
                    while($row = $result->fetch_assoc()) {
                        array_push($agents, new agent($row));
                    };
                    
                    //[ SET TOTAL ]
                    $total = $result->num_rows;
                };

                $feedback['success'] = true;
                $feedback['agents'] = $agents;
                $feedback['current_page'] = $page;
                $feedback['detail_page'] = "agents_new.php";
                $feedback['total'] = $total_records;
                $feedback['total_pages'] = $total_pages;
                break;
        
            case 'agent':
                $agentid = intval(urldecode($object->{'agent_id'}));

                //[ SET PAGED QUERY TO GET PUBLICATIONS ]
                $query = "SELECT a.id_agent, a.name, a.first_name, a.last_name, a.birth_date, a.nationality, a.documents, 
                            a.documents_val, a.company, a.contacts, a.obs, c.name_club as club_name, c.country as country_name
                            FROM agent a
                            INNER JOIN agent_club ac ON ac.id_agent = a.id_agent
                            INNER JOIN club c ON c.id_club = ac.id_club
                            WHERE a.id_agent = " . $agentid;

                //[ EXECUTE QUERY ]
                $result = mysqli_query($conn, $query);

                //[ CHECK RESULTS ]
                if ($result->num_rows > 0) {   
                    $agent = new agent($result->fetch_array(MYSQLI_ASSOC));
                };

                $feedback['success'] = true;
                $feedback['agent'] = $agent;
                break;

            case 'delete_agent':
                $text = json_encode($object->{'agents_ids'});
                $text = str_replace("[","", $text);
                $text = str_replace("]", "", $text);

                // //[ SET QUERY TO DELETE PUBLICATIONS HISTORY ASSOCIATED TO SELECTED PUBLICATION ]
                // $query = "DELETE ph.*
                //             FROM publications p
                //             INNER JOIN publications_users pu ON pu.publication_id = p.id
                //             INNER JOIN publications_history ph ON ph.publication_id = p.id
                //             WHERE p.id in (" . $text . ")";

                // //[ EXECUTE QUERY ]
                // $result = mysqli_query($conn, $query);

                // //[ CHECK RESULTS ]
                // if ($result) {
                //     //[ SET QUERY TO DELETE PUBLICATIONS USERS ASSOCIATED TO SELECTED PUBLICATION ]
                //     $query = "DELETE pu.*
                //                 FROM publications p
                //                 INNER JOIN publications_users pu ON pu.publication_id = p.id
                //                 WHERE p.id = " . $publicationid;
                    
                //     //[ EXECUTE QUERY ]
                //     $result = mysqli_query($conn, $query);

                //     //[ CHECK RESULTS ]
                //     if ($result) {
                //         //[ SET QUERY TO DELETE SELECTED PUBLICATION ]
                //         $query = "DELETE FROM publications WHERE id = " . $publicationid;

                //         //[ EXECUTE QUERY ]
                //         $result = mysqli_query($conn, $query);
        
                //         //[ CHECK RESULTS ]
                //         if ($result) {
                //             $feedback['success'] = true;
                //         } else {
                //             $feedback['success'] = false;
                //             $feedback['error'] = "ERROR_REMOVING_CLUBS";
                //         };
                //     } else {
                //         $feedback['success'] = false;
                //         $feedback['error'] = "ERROR_REMOVING_CLUBS";
                //     };
                // } else {
                //     $feedback['success'] = false;
                //     $feedback['error'] = "ERROR_REMOVING_CLUBS";
                // };
                break;
    
            case 'values':
                $values = array();
                $page = (isset($object->{'page'})) ? urldecode($object->{'page'}) : 1;
                $records = (isset($object->{'records'})) ? urldecode($object->{'records'}) : 10;
                $offset = ($page - 1) * $records;
                
                //[ SET NOT PAGED QUERY TO GET TOTAL PUBLICATIONS ]
                $total_pages_query = "SELECT COUNT(*) AS total_records 
                                        FROM players p";

                $result = mysqli_query($conn, $total_pages_query);

                //[ TOTAL VALUES ]
                $total_records = intval($result->fetch_array(MYSQLI_ASSOC)['total_records']);
                $total_pages = ceil($total_records / $records);

                //[ SET PAGED QUERY TO GET PUBLICATIONS ]
                $query = "SELECT p.id_player, p.first_name, p.last_name, p.value
                            FROM players p
                            LIMIT $offset, $records";

                //[ EXECUTE QUERY ]
                $result = mysqli_query($conn, $query);

                //[ CHECK RESULTS ]
                if ($result->num_rows > 0) {   
                    while($row = $result->fetch_assoc()) {
                        array_push($values, new value($row));
                    };
                    
                    //[ SET TOTAL ]
                    $total = $result->num_rows;
                };

                $feedback['success'] = true;
                $feedback['values'] = $values;
                $feedback['current_page'] = $page;
                $feedback['detail_page'] = "players_list.php";
                $feedback['total'] = $total_records;
                $feedback['total_pages'] = $total_pages;
                break; 

            case 'nationality':
                $nationality = array();
                $page = (isset($object->{'page'})) ? urldecode($object->{'page'}) : 1;
                $records = (isset($object->{'records'})) ? urldecode($object->{'records'}) : 10;
                $offset = ($page - 1) * $records;
                
                //[ SET NOT PAGED QUERY TO GET TOTAL PUBLICATIONS ]
                $total_pages_query = "SELECT COUNT(*) AS total_records 
                                        FROM players p";

                $result = mysqli_query($conn, $total_pages_query);

                //[ TOTAL VALUES ]
                $total_records = intval($result->fetch_array(MYSQLI_ASSOC)['total_records']);
                $total_pages = ceil($total_records / $records);

                //[ SET PAGED QUERY TO GET PUBLICATIONS ]
                $query = "SELECT p.id_player, p.first_name, p.last_name, p.nationality
                            FROM players p
                            LIMIT $offset, $records";

                //[ EXECUTE QUERY ]
                $result = mysqli_query($conn, $query);

                //[ CHECK RESULTS ]
                if ($result->num_rows > 0) {   
                    while($row = $result->fetch_assoc()) {
                        array_push($nationality, new nationality($row));
                    };
                    
                    //[ SET TOTAL ]
                    $total = $result->num_rows;
                };

                $feedback['success'] = true;
                $feedback['nationality'] = $nationality;
                $feedback['current_page'] = $page;
                $feedback['detail_page'] = "players_new.php";
                $feedback['total'] = $total_records;
                $feedback['total_pages'] = $total_pages;
                break; 
            case 'clubs_index':
                $clubs_index = array();
                $page = (isset($object->{'page'})) ? urldecode($object->{'page'}) : 1;
                $records = (isset($object->{'records'})) ? urldecode($object->{'records'}) : 10;
                $offset = ($page - 1) * $records;
                
                //[ SET NOT PAGED QUERY TO GET TOTAL PUBLICATIONS ]
                $total_pages_query = "SELECT COUNT(*) AS total_records 
                                        FROM players p";

                $result = mysqli_query($conn, $total_pages_query);

                //[ TOTAL VALUES ]
                $total_records = intval($result->fetch_array(MYSQLI_ASSOC)['total_records']);
                $total_pages = ceil($total_records / $records);

                //[ SET PAGED QUERY TO GET PUBLICATIONS ]
                $query = "SELECT COUNT(c.id_club) AS total_records, c.name_club
                            FROM players p
                            INNER JOIN club c ON c.id_club = p.id_club
                            GROUP BY c.id_club
                            LIMIT $offset, $records";

                //[ EXECUTE QUERY ]
                $result = mysqli_query($conn, $query);

                //[ CHECK RESULTS ]
                if ($result->num_rows > 0) {   
                    while($row = $result->fetch_assoc()) {
                        array_push($clubs_index, new clubs_index($row));
                    };
                    
                    //[ SET TOTAL ]
                    $total = $result->num_rows;
                };

                $feedback['success'] = true;
                $feedback['clubs_index'] = $clubs_index;
                $feedback['current_page'] = $page;
                $feedback['total'] = $total_records;
                $feedback['total_pages'] = $total_pages;
                break; 
            case 'birth':
                $birth = array();
                $page = (isset($object->{'page'})) ? urldecode($object->{'page'}) : 1;
                $records = (isset($object->{'records'})) ? urldecode($object->{'records'}) : 10;
                $offset = ($page - 1) * $records;
                
                //[ SET NOT PAGED QUERY TO GET TOTAL PUBLICATIONS ]
                $total_pages_query = "SELECT COUNT(*) AS total_records 
                                        FROM players p";

                $result = mysqli_query($conn, $total_pages_query);

                //[ TOTAL VALUES ]
                $total_records = intval($result->fetch_array(MYSQLI_ASSOC)['total_records']);
                $total_pages = ceil($total_records / $records);

                //[ SET PAGED QUERY TO GET PUBLICATIONS ]
                $query = "SELECT p.id_player, p.first_name, p.last_name, p.birth_date
                            FROM players p
                            ORDER BY p.birth_date DESC
                            LIMIT $offset, $records";

                //[ EXECUTE QUERY ]
                $result = mysqli_query($conn, $query);

                //[ CHECK RESULTS ]
                if ($result->num_rows > 0) {   
                    while($row = $result->fetch_assoc()) {
                        array_push($birth, new birth($row));
                    };
                    
                    //[ SET TOTAL ]
                    $total = $result->num_rows;
                };

                $feedback['success'] = true;
                $feedback['birth'] = $birth;
                $feedback['detail_page'] = "players_new.php";
                $feedback['current_page'] = $page;
                $feedback['total'] = $total_records;
                $feedback['total_pages'] = $total_pages;
                break;  
            case 'league':
                $league = array();
                $page = (isset($object->{'page'})) ? urldecode($object->{'page'}) : 1;
                $records = (isset($object->{'records'})) ? urldecode($object->{'records'}) : 10;
                $offset = ($page - 1) * $records;
                
                //[ SET NOT PAGED QUERY TO GET TOTAL PUBLICATIONS ]
                $total_pages_query = "SELECT COUNT(*) AS total_records 
                                        FROM players p";

                $result = mysqli_query($conn, $total_pages_query);

                //[ TOTAL VALUES ]
                $total_records = intval($result->fetch_array(MYSQLI_ASSOC)['total_records']);
                $total_pages = ceil($total_records / $records);

                //[ SET PAGED QUERY TO GET PUBLICATIONS ]
                $query = "SELECT cr.id_contract_rep, p.first_name, p.last_name, cr.date_end
                            FROM contract_representation cr
                            INNER JOIN players p ON cr.id_player = p.id_player
                            ORDER BY cr.date_end ASC
                            LIMIT $offset, $records";

                //[ EXECUTE QUERY ]
                $result = mysqli_query($conn, $query);

                //[ CHECK RESULTS ]
                if ($result->num_rows > 0) {   
                    while($row = $result->fetch_assoc()) {
                        array_push($league, new league($row));
                    };
                    
                    //[ SET TOTAL ]
                    $total = $result->num_rows;
                };

                $feedback['success'] = true;
                $feedback['league'] = $league;
                $feedback['detail_page'] = "players_new.php";
                $feedback['current_page'] = $page;
                $feedback['total'] = $total_records;
                $feedback['total_pages'] = $total_pages;
                break;   
            case 'position':
                $position = array();
                $page = (isset($object->{'page'})) ? urldecode($object->{'page'}) : 1;
                $records = (isset($object->{'records'})) ? urldecode($object->{'records'}) : 10;
                $offset = ($page - 1) * $records;
                
                //[ SET NOT PAGED QUERY TO GET TOTAL PUBLICATIONS ]
                $total_pages_query = "SELECT COUNT(*) AS total_records 
                                        FROM players p";

                $result = mysqli_query($conn, $total_pages_query);

                //[ TOTAL VALUES ]
                $total_records = intval($result->fetch_array(MYSQLI_ASSOC)['total_records']);
                $total_pages = ceil($total_records / $records);

                //[ SET PAGED QUERY TO GET PUBLICATIONS ]
                $query = "SELECT COUNT(p.id_player) AS total_records, p.position
                            FROM players p 
                            GROUP BY p.position
                            LIMIT $offset, $records";

                //[ EXECUTE QUERY ]
                $result = mysqli_query($conn, $query);

                //[ CHECK RESULTS ]
                if ($result->num_rows > 0) {   
                    while($row = $result->fetch_assoc()) {
                        array_push($position, new position($row));
                    };
                    
                    //[ SET TOTAL ]
                    $total = $result->num_rows;
                };

                $feedback['success'] = true;
                $feedback['position'] = $position;
                $feedback['detail_page'] = "players_new.php";
                $feedback['current_page'] = $page;
                $feedback['total'] = $total_records;
                $feedback['total_pages'] = $total_pages;
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