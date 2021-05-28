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
                    $feedback['error'] = 'ERRO_INSERT_club';
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
                $query = "SELECT p.id_player, p.first_name, p.last_name, p.birth_date, p.nationality, p.position, c.name_club as club_name, p.value 
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
                $text = json_encode($object->{'players_ids'});
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
                //             $feedback['error'] = "ERROR_REMOVING_PLAYERS";
                //         };
                //     } else {
                //         $feedback['success'] = false;
                //         $feedback['error'] = "ERROR_REMOVING_PLAYERS";
                //     };
                // } else {
                //     $feedback['success'] = false;
                //     $feedback['error'] = "ERROR_REMOVING_PLAYERS";
                // };
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
                $query = "SELECT co.id_coach, co.first_name, co.last_name, co.birth_date, co.nationality, co.formation, c.name_club as club_name, co.value 
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
                $query = "SELECT cr.id_contract_rep, cr.date_start, cr.date_end, cr.child, cr.commission, p.name as player_name 
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
                $query = "SELECT cr.id_contract_rep, cr.date_start, cr.date_end, cr.child, cr.commission, p.name as player_name 
                            FROM contract_representation cr
                            INNER JOIN players p ON cr.id_player = p.id_player
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
                $text = json_encode($object->{'representations_ids'});
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
                //             $feedback['error'] = "ERROR_REMOVING_REPRESENTATIONS";
                //         };
                //     } else {
                //         $feedback['success'] = false;
                //         $feedback['error'] = "ERROR_REMOVING_REPRESENTATIONS";
                //     };
                // } else {
                //     $feedback['success'] = false;
                //     $feedback['error'] = "ERROR_REMOVING_REPRESENTATIONS";
                // };
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
                $query = "SELECT cc.id_contract_club, cc.date_start, cc.date_end, c.name_club as club_name, cc.value, cc.clause, p.name as name_player 
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
                $query = "SELECT cc.id_contract_club, cc.date_start, cc.date_end, c.name_club as club_name, cc.value, cc.clause, p.name as name_player 
                            FROM contract_club cc 
                            INNER JOIN club c ON cc.id_club = c.id_club 
                            INNER JOIN players p ON cc.id_player = p.id_player
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
                $text = json_encode($object->{'clubs_ids'});
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