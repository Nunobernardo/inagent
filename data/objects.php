<?php
    class user {
        public $id = 0;
        public $name;
        public $email;
        public $password;

        function __construct($obj) {
            if (isset($obj)) {
                $this->id = intval($obj["id"]);
                $this->name = $obj["name"];
                $this->email = $obj["email"];
            };
        }

        public function get() {
            return $this;
        }

        public function set($id, $name, $email) {
            $this->id = $id;
            $this->name = $name;
            $this->email = $email;
            
            return $this;
        }
    }

    class player {
        public $id = 0;
        public $club;
        public $clubname;
        public $name;
        public $firstname;
        public $lastname;
        public $birth;
        public $nationality;
        public $height;
        public $weight;
        public $foot;
        public $position;
        public $value;
        public $passport;
        public $passportval;
        public $file;

        function __construct($obj) {
            if (isset($obj)) {
                $this->id = (isset($obj["id_player"])) ? intval($obj["id_player"]) : null;
                $this->club = (isset($obj["id_club"])) ? $obj["id_club"] : null;
                $this->clubname = (isset($obj["club_name"])) ? $obj["club_name"] : null;
                $this->name = (isset($obj["name"])) ? $obj["name"] : null;
                $this->firstname = (isset($obj["first_name"])) ? $obj["first_name"] : null;
                $this->lastname = (isset($obj["last_name"])) ? $obj["last_name"] : null;
                $this->birth = (isset($obj["birth_date"])) ? $obj["birth_date"] : null;
                $this->nationality = (isset($obj["nationality"])) ? $obj["nationality"] : null;
                $this->height = (isset($obj["height"])) ? $obj["height"] : null;
                $this->weight = (isset($obj["weight"])) ? $obj["weight"] : null;
                $this->foot = (isset($obj["foot"])) ? $obj["foot"] : null;
                $this->position = (isset($obj["position"])) ? $obj["position"] : null;
                $this->value = (isset($obj["value"])) ? $obj["value"] : null;
                $this->passport = (isset($obj["documents"])) ? $obj["documents"] : null;
                $this->passportval = (isset($obj["documents_val"])) ? $obj["documents_val"] : null;
                $this->file = (isset($obj["file"])) ? $obj["file"] : null;
            };
        }

        public function get() {
            return $this;
        }

        public function set($id, $club, $clubname, $name, $firstname, $lastname, $birth, $nationality, $height, $weight, $foot, $position, $value, $passport, $passportval) {
            $this->id = $id;
            $this->club = $club;
            $this->clubname = $clubname;
            $this->name = $name;
            $this->firstname = $firstname;
            $this->lastname = $lastname;
            $this->birth = $birth;
            $this->nationality = $nationality;
            $this->height = $height;
            $this->weight = $weight;
            $this->foot = $foot;
            $this->position = $position;
            $this->value = $value;
            $this->passport = $passport;
            $this->passportval = $passportval;
            
            return $this;
        }
    }

    class coach {
        public $id = 0;
        public $club;
        public $clubname;
        public $name;
        public $firstname;
        public $lastname;
        public $birth;
        public $nationality;
        public $height;
        public $weight;
        public $formation;
        public $value;
        public $passport;
        public $passportval;
        public $file;

        function __construct($obj) {
            if (isset($obj)) {
                $this->id = (isset($obj["id_coach"])) ? intval($obj["id_coach"]) : null;
                $this->club = (isset($obj["id_club"])) ? $obj["id_club"] : null;
                $this->clubname = (isset($obj["club_name"])) ? $obj["club_name"] : null;
                $this->name = (isset($obj["name"])) ? $obj["name"] : null;
                $this->firstname = (isset($obj["first_name"])) ? $obj["first_name"] : null;
                $this->lastname = (isset($obj["last_name"])) ? $obj["last_name"] : null;
                $this->birth = (isset($obj["birth_date"])) ? $obj["birth_date"] : null;
                $this->nationality = (isset($obj["nationality"])) ? $obj["nationality"] : null;
                $this->height = (isset($obj["height"])) ? $obj["height"] : null;
                $this->weight = (isset($obj["weight"])) ? $obj["weight"] : null;
                $this->formation = (isset($obj["formation"])) ? $obj["formation"] : null;
                $this->value = (isset($obj["value"])) ? $obj["value"] : null;
                $this->passport = (isset($obj["documents"])) ? $obj["documents"] : null;
                $this->passportval = (isset($obj["documents_val"])) ? $obj["documents_val"] : null;
                $this->file = (isset($obj["file"])) ? $obj["file"] : null;
            };
        }

        public function get() {
            return $this;
        }

        public function set($id, $club, $clubname, $name, $firstname, $lastname, $birth, $age, $nationality, $height, $weight, $foot, $formation, $value, $passport, $passportval) {
            $this->id = $id;
            $this->club = $club;
            $this->clubname = $clubname;
            $this->name = $name;
            $this->firstname = $firstname;
            $this->lastname = $lastname;
            $this->birth = $birth;
            $this->age = $age;
            $this->nationality = $nationality;
            $this->height = $height;
            $this->weight = $weight;
            $this->foot = $foot;
            $this->formation = $formation;
            $this->value = $value;
            $this->passport = $passport;
            $this->passportval = $passportval;
            
            return $this;
        }
    }

    class representation {
        public $id = 0;
        public $player;
        public $club;
        public $clubname;
        public $name;
        public $firstname;
        public $lastname;
        public $birth;
        public $nationality;
        public $height;
        public $weight;
        public $foot;
        public $position;
        public $value;
        public $passport;
        public $passportval;

        public $child;
        public $father;
        public $mother;
        public $datestart;
        public $dateend;
        public $commission;
        public $file;

        function __construct($obj) {
            if (isset($obj)) {
                $this->id = (isset($obj["id_contract_rep"])) ? intval($obj["id_contract_rep"]) : null;
                $this->player = (isset($obj["id_player"])) ? $obj["id_player"] : null;
                $this->name = (isset($obj["name"])) ? $obj["name"] : null;
                $this->club = (isset($obj["id_club"])) ? $obj["id_club"] : null;
                $this->clubname = (isset($obj["name_club"])) ? $obj["name_club"] : null;
                $this->firstname = (isset($obj["first_name"])) ? $obj["first_name"] : null;
                $this->lastname = (isset($obj["last_name"])) ? $obj["last_name"] : null;
                $this->birth = (isset($obj["birth_date"])) ? $obj["birth_date"] : null;
                $this->nationality = (isset($obj["nationality"])) ? $obj["nationality"] : null;
                $this->height = (isset($obj["height"])) ? $obj["height"] : null;
                $this->weight = (isset($obj["weight"])) ? $obj["weight"] : null;
                $this->foot = (isset($obj["foot"])) ? $obj["foot"] : null;
                $this->position = (isset($obj["position"])) ? $obj["position"] : null;
                $this->value = (isset($obj["value"])) ? $obj["value"] : null;
                $this->passport = (isset($obj["documents"])) ? $obj["documents"] : null;
                $this->passportval = (isset($obj["documents_val"])) ? $obj["documents_val"] : null;
                
                $this->child = (isset($obj["child"])) ? $obj["child"] : null;
                $this->father = (isset($obj["father_name"])) ? $obj["father_name"] : null;
                $this->mother = (isset($obj["mother_name"])) ? $obj["mother_name"] : null;
                $this->datestart = (isset($obj["date_start"])) ? $obj["date_start"] : null;
                $this->dateend = (isset($obj["date_end"])) ? $obj["date_end"] : null;
                $this->commission = (isset($obj["commission"])) ? $obj["commission"] : null;
                $this->file = (isset($obj["file"])) ? $obj["file"] : null;
            };
        }

        public function get() {
            return $this;
        }

        public function set($id, $player, $playername, $firstname, $lastname, $birth, $nationality, $height, $weight, $foot, $position, $club, $clubname, $value, $passport, $passportval,
        $child, $father, $mother, $datestart, $dateend, $commission, $file) {

            $this->id = $id;
            $this->player = $player;
            $this->playername = $playername;
            $this->firstname = $firstname;
            $this->lastname = $lastname;
            $this->birth = $birth;
            $this->nationality = $nationality;
            $this->height = $height;
            $this->weight = $weight;
            $this->foot = $foot;
            $this->position = $position;
            $this->club = $club;
            $this->clubname = $clubname;
            $this->value = $value;
            $this->passport = $passport;
            $this->passportval = $passportval;

            $this->child = $child;
            $this->father = $father;
            $this->mother = $mother;
            $this->datestart = $datestart;
            $this->dateend = $dateend;
            $this->commission = $commission;
            $this->file = $file;
            
            return $this;
        }
    }

    class club {
        public $id = 0;
        public $player;
        public $club;
        public $clubname;
        public $name;
        public $firstname;
        public $lastname;
        public $birth;
        public $nationality;
        public $height;
        public $weight;
        public $foot;
        public $position;
        public $valueplayer;
        public $passport;
        public $passportval;

        public $datestart;
        public $dateend;
        public $value;
        public $clause;
        public $bonus;
        public $court;
        public $obs;
        public $file;

        function __construct($obj) {
            if (isset($obj)) {
                $this->id = (isset($obj["id_contract_club"])) ? intval($obj["id_contract_club"]) : null;
                $this->player = (isset($obj["id_player"])) ? $obj["id_player"] : null;
                $this->name = (isset($obj["name"])) ? $obj["name"] : null;
                $this->club = (isset($obj["id_club"])) ? $obj["id_club"] : null;
                $this->clubname = (isset($obj["club_name"])) ? $obj["club_name"] : null;
                $this->firstname = (isset($obj["first_name"])) ? $obj["first_name"] : null;
                $this->lastname = (isset($obj["last_name"])) ? $obj["last_name"] : null;
                $this->birth = (isset($obj["birth_date"])) ? $obj["birth_date"] : null;
                $this->nationality = (isset($obj["nationality"])) ? $obj["nationality"] : null;
                $this->height = (isset($obj["height"])) ? $obj["height"] : null;
                $this->weight = (isset($obj["weight"])) ? $obj["weight"] : null;
                $this->foot = (isset($obj["foot"])) ? $obj["foot"] : null;
                $this->position = (isset($obj["position"])) ? $obj["position"] : null;
                $this->valueplayer = (isset($obj["value_player"])) ? $obj["value_player"] : null;
                $this->passport = (isset($obj["documents"])) ? $obj["documents"] : null;
                $this->passportval = (isset($obj["documents_val"])) ? $obj["documents_val"] : null;

                $this->datestart = (isset($obj["date_start"])) ? $obj["date_start"] : null;
                $this->dateend = (isset($obj["date_end"])) ? $obj["date_end"] : null;
                $this->value = (isset($obj["value"])) ? $obj["value"] : null;
                $this->clause = (isset($obj["clause"])) ? $obj["clause"] : null;
                $this->bonus = (isset($obj["bonus"])) ? $obj["bonus"] : null;
                $this->court = (isset($obj["court"])) ? $obj["court"] : null;
                $this->obs = (isset($obj["obs"])) ? $obj["obs"] : null;
                $this->file = (isset($obj["files"])) ? $obj["file"] : null;
            };
        }

        public function get() {
            return $this;
        }

        public function set($id, $player, $playername, $firstname, $lastname, $birth, $nationality, $height, $weight, $foot, $position, $club, $clubname, $valueplayer, $passport, $passportval,
        $datestart, $dateend, $value, $clause, $bonus, $court, $obs, $file) {

            $this->id = $id;
            $this->player = $player;
            $this->playername = $playername;
            $this->firstname = $firstname;
            $this->lastname = $lastname;
            $this->birth = $birth;
            $this->nationality = $nationality;
            $this->height = $height;
            $this->weight = $weight;
            $this->foot = $foot;
            $this->position = $position;
            $this->club = $club;
            $this->clubname = $clubname;
            $this->valueplayer = $valueplayer;
            $this->passport = $passport;
            $this->passportval = $passportval;
            
            $this->datestart = $datestart;
            $this->dateend = $dateend;
            $this->value = $value;
            $this->clause = $clause;
            $this->bonus = $bonus;
            $this->court = $court;
            $this->obs = $obs;
            $this->file = $file;
            
            return $this;
        }
    }

    class mandates {
        public $id = 0;
        public $player;
        public $playerclub;
        public $playerclubname;
        public $playername;
        public $playerfirstname;
        public $playerlastname;
        public $playerbirth;
        public $playernationality;
        public $playerheight;
        public $playerweight;
        public $playerfoot;
        public $playerposition;
        public $playervalue;
        public $playerpassport;
        public $playerpassportval;

        public $agentid;
        public $agentclub;
        public $agentclubname;
        public $agentcountry;
        public $agentname;
        public $agentfirstname;
        public $agentlastname;
        public $agentbirth;
        public $agentnationality;
        public $agentpassport;
        public $agentpassportval;
        public $agentcompany;
        public $agentcontacts;
        public $agentobs;

        public $datestart;
        public $dateend;
        public $obs;
        public $file;


        function __construct($obj) {
            if (isset($obj)) {
                $this->id = (isset($obj["id_mandates"])) ? intval($obj["id_mandates"]) : null;
                $this->player = (isset($obj["id_player"])) ? $obj["id_player"] : null;
                $this->playername = (isset($obj["p_name"])) ? $obj["p_name"] : null;
                $this->playerclub = (isset($obj["id_club"])) ? $obj["id_club"] : null;
                $this->playerclubname = (isset($obj["club_name_player"])) ? $obj["club_name_player"] : null;
                $this->playerfirstname = (isset($obj["p_first_name"])) ? $obj["p_first_name"] : null;
                $this->playerlastname = (isset($obj["p_last_name"])) ? $obj["p_last_name"] : null;
                $this->playerbirth = (isset($obj["p_birth_date"])) ? $obj["p_birth_date"] : null;
                $this->playernationality = (isset($obj["p_nationality"])) ? $obj["p_nationality"] : null;
                $this->playerheight = (isset($obj["p_height"])) ? $obj["p_height"] : null;
                $this->playerweight = (isset($obj["p_weight"])) ? $obj["p_weight"] : null;
                $this->playerfoot = (isset($obj["p_foot"])) ? $obj["p_foot"] : null;
                $this->playerposition = (isset($obj["p_position"])) ? $obj["p_position"] : null;
                $this->playervalue = (isset($obj["p_value"])) ? $obj["p_value"] : null;
                $this->playerpassport = (isset($obj["p_documents"])) ? $obj["p_documents"] : null;
                $this->playerpassportval = (isset($obj["p_documentsval"])) ? $obj["p_documentsval"] : null;
                
                $this->agentid = (isset($obj["id_agent"])) ? $obj["id_agent"] : null;
                $this->agentclub = (isset($obj["id_club"])) ? $obj["id_club"] : null;
                $this->agentclubname = (isset($obj["club_name_agent"])) ? $obj["club_name_agent"] : null;
                $this->agentcountry = (isset($obj["country_name_agent"])) ? $obj["country_name_agent"] : null;
                $this->agentname = (isset($obj["a_name"])) ? $obj["a_name"] : null;
                $this->agentfirstname = (isset($obj["a_first_name"])) ? $obj["a_first_name"] : null;
                $this->agentlastname = (isset($obj["a_last_name"])) ? $obj["a_last_name"] : null;
                $this->agentbirth = (isset($obj["a_birth_date"])) ? $obj["a_birth_date"] : null;
                $this->agentnationality = (isset($obj["a_nationality"])) ? $obj["a_nationality"] : null;
                $this->agentpassport = (isset($obj["a_documents"])) ? $obj["a_documents"] : null;
                $this->agentpassportval = (isset($obj["a_documents_val"])) ? $obj["a_documents_val"] : null;
                $this->agentcompany = (isset($obj["a_company"])) ? $obj["a_company"] : null;
                $this->agentcontacts = (isset($obj["a_contacts"])) ? $obj["a_contacts"] : null;
                $this->agentobs = (isset($obj["a_obs"])) ? $obj["a_obs"] : null;

                $this->datestart = (isset($obj["m_date_start"])) ? $obj["m_date_start"] : null;
                $this->dateend = (isset($obj["m_date_end"])) ? $obj["m_date_end"] : null;
                $this->obs = (isset($obj["m_obs"])) ? $obj["m_obs"] : null;
                $this->file = (isset($obj["file"])) ? $obj["file"] : null;
            };
        }

        public function get() {
            return $this;
        }

        public function set($id,  $player, $playername, $playerfirstname, $playerlastname, $playerbirth, $playernationality, $playerheight, $playerweight, $playerfoot, $playerposition, $playerclub, $playerclubname, $playervalue, $playerpassport, $passportval,
        $agentclub, $agentclubname,  $agentcountry, $agentname, $agentfirstname, $agentlastname, $agentbirth, $agentnationality, $agentpassport, $agentpassportval, $agentcompany, $agentcontacts, $agentobs,
        $datestart, $dateend,  $obs,  $file) {
            $this->id = $id;

            $this->player = $player;
            $this->playername = $playername;
            $this->playerfirstname = $playerfirstname;
            $this->playerlastname = $playerlastname;
            $this->playerbirth = $playerbirth;
            $this->playernationality = $playernationality;
            $this->playerheight = $playerheight;
            $this->playerweight = $playerweight;
            $this->playerfoot = $playerfoot;
            $this->playerposition = $playerposition;
            $this->playerclub = $playerclub;
            $this->playerclubname = $playerclubname;
            $this->playervalue = $playervalue;
            $this->playerpassport = $playerpassport;
            $this->playerpassportval = $playerpassportval;

            $this->agentclub = $agentclub;
            $this->agentclubname = $agentclubname;
            $this->agentcountry = $agentcountry;
            $this->agentname = $agentname;
            $this->agentfirstname = $agentfirstname;
            $this->agentlastname = $agentlastname;
            $this->agentbirth = $agentbirth;
            $this->agentnationality = $agentnationality;
            $this->agentpassport = $agentpassport;
            $this->agentpassportval = $agentpassportval;
            $this->agentcompany = $agentcompany;
            $this->agentcontacts = $agentcontacts;
            $this->agentobs = $agentobs;
            
            $this->datestart = $datestart;
            $this->dateend = $dateend;
            $this->obs = $obs;
            $this->file = $file;
            
            return $this;
        }
    }

    class agent {
        public $id = 0;
        public $club;
        public $clubname;
        public $country;
        public $name;
        public $firstname;
        public $lastname;
        public $birth;
        public $nationality;
        public $passport;
        public $passportval;
        public $agentcompany;
        public $contacts;
        public $obs;

        function __construct($obj) {
            if (isset($obj)) {
                $this->id = (isset($obj["id_agent"])) ? intval($obj["id_agent"]) : null;
                $this->club = (isset($obj["id_club"])) ? $obj["id_club"] : null;
                $this->clubname = (isset($obj["club_name"])) ? $obj["club_name"] : null;
                $this->country = (isset($obj["country_name"])) ? $obj["country_name"] : null;
                $this->name = (isset($obj["name"])) ? $obj["name"] : null;
                $this->firstname = (isset($obj["first_name"])) ? $obj["first_name"] : null;
                $this->lastname = (isset($obj["last_name"])) ? $obj["last_name"] : null;
                $this->birth = (isset($obj["birth_date"])) ? $obj["birth_date"] : null;
                $this->nationality = (isset($obj["nationality"])) ? $obj["nationality"] : null;
                $this->passport = (isset($obj["documents"])) ? $obj["documents"] : null;
                $this->passportval = (isset($obj["documents_val"])) ? $obj["documents_val"] : null;
                $this->agentcompany = (isset($obj["company"])) ? $obj["company"] : null;
                $this->contacts = (isset($obj["contacts"])) ? $obj["contacts"] : null;
                $this->obs = (isset($obj["obs"])) ? $obj["obs"] : null;
            };
        }

        public function get() {
            return $this;
        }

        public function set($id, $club, $clubname,  $country, $name, $firstname, $lastname,$birth, $nationality, $passport, $passportval, $agentcompany, $contacts, $obs) {
            $this->id = $id;
            $this->club = $club;
            $this->clubname = $clubname;
            $this->country = $country;
            $this->name = $name;
            $this->firstname = $firstname;
            $this->lastname = $lastname;
            $this->birth = $birth;
            $this->nationality = $nationality;
            $this->passport = $passport;
            $this->passportval = $passportval;
            $this->agentcompany = $agentcompany;
            $this->contacts = $contacts;
            $this->obs = $obs;
            
            return $this;
        }
    }

    class value {
        public $id = 0;
        public $firstname;
        public $lastname;
        public $value;

        function __construct($obj) {
            if (isset($obj)) {
                $this->id = (isset($obj["id_player"])) ? intval($obj["id_player"]) : null;
                $this->firstname = (isset($obj["first_name"])) ? $obj["first_name"] : null;
                $this->lastname = (isset($obj["last_name"])) ? $obj["last_name"] : null;
                $this->value = (isset($obj["value"])) ? $obj["value"] : null;
            };
        }

        public function get() {
            return $this;
        }

        public function set($id, $firstname, $lastname, $value) {
            $this->id = $id;
            $this->firstname = $firstname;
            $this->lastname = $lastname;
            $this->value = $value;
            
            return $this;
        }
    }

    class nationality {
        public $id = 0;
        public $firstname;
        public $lastname;
        public $nationality;

        function __construct($obj) {
            if (isset($obj)) {
                $this->id = (isset($obj["id_player"])) ? intval($obj["id_player"]) : null;
                $this->firstname = (isset($obj["first_name"])) ? $obj["first_name"] : null;
                $this->lastname = (isset($obj["last_name"])) ? $obj["last_name"] : null;
                $this->nationality = (isset($obj["nationality"])) ? $obj["nationality"] : null;
            };
        }

        public function get() {
            return $this;
        }

        public function set($id, $firstname, $lastname, $nationality) {
            $this->id = $id;
            $this->firstname = $firstname;
            $this->lastname = $lastname;
            $this->nationality = $nationality;
            
            return $this;
        }
    }

    class clubs_index {
        public $id = 0;
        public $clubname;
        public $count;

        function __construct($obj) {
            if (isset($obj)) {
                $this->id = (isset($obj["id_club"])) ? intval($obj["id_club"]) : null;
                $this->clubname = (isset($obj["name_club"])) ? $obj["name_club"] : null;
                $this->count = (isset($obj["total_records"])) ? ($obj["total_records"]) : null;
            };
        }

        public function get() {
            return $this;
        }

        public function set($id, $clubname, $count) {
            $this->id = $id;
            $this->clubname = $clubname;
            $this->count = $count;
            
            return $this;
        }
    }
    
    class birth {
        public $id = 0;
        public $firstname;
        public $lastname;
        public $birth;

        function __construct($obj) {
            if (isset($obj)) {
                $this->id = (isset($obj["id_player"])) ? intval($obj["id_player"]) : null;
                $this->firstname = (isset($obj["first_name"])) ? $obj["first_name"] : null;
                $this->lastname = (isset($obj["last_name"])) ? $obj["last_name"] : null;
                $this->birth = (isset($obj["birth_date"])) ? $obj["birth_date"] : null;
            };
        }

        public function get() {
            return $this;
        }

        public function set($id, $firstname, $lastname, $birth) {
            $this->id = $id;
            $this->firstname = $firstname;
            $this->lastname = $lastname;
            $this->birth = $birth;
            
            return $this;
        }
    }

    class league {
        public $id = 0;
        public $firstname;
        public $lastname;
        public $dateend;

        function __construct($obj) {
            if (isset($obj)) {
                $this->id = (isset($obj["id_contract_rep"])) ? intval($obj["id_contract_rep"]) : null;
                $this->firstname = (isset($obj["first_name"])) ? $obj["first_name"] : null;
                $this->lastname = (isset($obj["last_name"])) ? $obj["last_name"] : null;
                $this->dateend = (isset($obj["date_end"])) ? $obj["date_end"] : null;
            };
        }

        public function get() {
            return $this;
        }
        
        public function set($id, $firstname, $lastname, $dateend) {
            $this->id = $id;
            $this->firstname = $firstname;
            $this->lastname = $lastname;
            $this->dateend = $dateend;
            return $this;
        }
    }

    class position {
        public $id = 0;
        public $position;
        public $count;

        function __construct($obj) {
            if (isset($obj)) {
                $this->id = (isset($obj["id_club"])) ? intval($obj["id_club"]) : null;
                $this->position = (isset($obj["position"])) ? $obj["position"] : null;
                $this->count = (isset($obj["total_records"])) ? ($obj["total_records"]) : null;
            };
        }

        public function get() {
            return $this;
        }

        public function set($id, $position, $count) {
            $this->id = $id;
            $this->position = $position;
            $this->count = $count;
            
            return $this;
        }
    }
?>