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
        public $age;

        function __construct($obj) {
            if (isset($obj)) {
                $this->id = (isset($obj["id_player"])) ? intval($obj["id_player"]) : null;
                $this->club = (isset($obj["id_club"])) ? intval($obj["id_club"]) : null;
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
                $this->age = (isset($obj["age"])) ? $obj["age"] : null;
            };
        }

        public function get() {
            return $this;
        }

        public function set($id, $club, $clubname, $name, $firstname, $lastname, $birth, $nationality, $height, $weight, $foot, $position, $value, $passport, $passportval, $age) {
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
            $this->age = $age;
            
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
        public $age;

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
                $this->age = (isset($obj["age"])) ? $obj["age"] : null;
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
        public $coach;
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
        public $formation;
        public $value;
        public $passport;
        public $passportval;
        public $iscoach;

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
                $this->coach = (isset($obj["id_coach"])) ? $obj["id_coach"] : null;
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
                $this->formation = (isset($obj["formation"])) ? $obj["formation"] : null;
                $this->value = (isset($obj["value"])) ? $obj["value"] : null;
                $this->passport = (isset($obj["documents"])) ? $obj["documents"] : null;
                $this->passportval = (isset($obj["documents_val"])) ? $obj["documents_val"] : null;
                $this->iscoach = (isset($obj["iscoach"])) ? boolval($obj["iscoach"]) : null;
                
                $this->child = (isset($obj["child"])) ? boolval($obj["child"]) : null;
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

        public function set($id, $player, $coach, $playername, $firstname, $lastname, $birth, $nationality, $height, $weight, $foot,  $formation, $position, $club, $clubname, $value, $passport, $passportval,
        $child, $father, $mother, $datestart, $dateend, $commission, $file, $iscoach) {

            $this->id = $id;
            $this->player = $player;
            $this->coach = $coach;
            $this->playername = $playername;
            $this->firstname = $firstname;
            $this->lastname = $lastname;
            $this->birth = $birth;
            $this->nationality = $nationality;
            $this->height = $height;
            $this->weight = $weight;
            $this->foot = $foot;
            $this->formation = $formation;
            $this->position = $position;
            $this->club = $club;
            $this->clubname = $clubname;
            $this->value = $value;
            $this->passport = $passport;
            $this->passportval = $passportval;
            $this->iscoach = $iscoach;

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
        public $coach;
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
        public $formation;
        public $value;
        public $passport;
        public $passportval;
        public $iscoach;

        public $datestart;
        public $dateend;
        public $valuecontract;
        public $clause;
        public $bonus;
        public $court;
        public $obs;

        function __construct($obj) {
            if (isset($obj)) {
                $this->id = (isset($obj["id_contract_club"])) ? intval($obj["id_contract_club"]) : null;
                $this->player = (isset($obj["id_player"])) ? $obj["id_player"] : null;
                $this->coach = (isset($obj["id_coach"])) ? $obj["id_coach"] : null;
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
                $this->formation = (isset($obj["formation"])) ? $obj["formation"] : null;
                $this->value = (isset($obj["value"])) ? $obj["value"] : null;
                $this->passport = (isset($obj["documents"])) ? $obj["documents"] : null;
                $this->passportval = (isset($obj["documents_val"])) ? $obj["documents_val"] : null;
                $this->iscoach = (isset($obj["iscoach"])) ? boolval($obj["iscoach"]) : null;

                $this->datestart = (isset($obj["date_start"])) ? $obj["date_start"] : null;
                $this->dateend = (isset($obj["date_end"])) ? $obj["date_end"] : null;
                $this->valuecontract = (isset($obj["value_contract"])) ? $obj["value_contract"] : null;
                $this->clause = (isset($obj["clause"])) ? $obj["clause"] : null;
                $this->bonus = (isset($obj["bonus"])) ? $obj["bonus"] : null;
                $this->court = (isset($obj["court"])) ? $obj["court"] : null;
                $this->obs = (isset($obj["obs"])) ? $obj["obs"] : null;
            };
        }

        public function get() {
            return $this;
        }

        public function set($id, $player, $coach, $playername, $firstname, $lastname, $birth, $nationality, $height, $weight, $foot, $position, $formation, $club, $clubname, $value, $passport, $passportval,
        $datestart, $dateend, $valuecontract, $clause, $bonus, $court, $obs, $iscoach) {

            $this->id = $id;
            $this->player = $player;
            $this->coach = $coach;
            $this->playername = $playername;
            $this->firstname = $firstname;
            $this->lastname = $lastname;
            $this->birth = $birth;
            $this->nationality = $nationality;
            $this->height = $height;
            $this->weight = $weight;
            $this->foot = $foot;
            $this->position = $position;
            $this->formation = $formation;
            $this->club = $club;
            $this->clubname = $clubname;
            $this->value = $value;
            $this->passport = $passport;
            $this->passportval = $passportval;
            $this->iscoach = $iscoach;
            
            $this->datestart = $datestart;
            $this->dateend = $dateend;
            $this->valuecontract = $valuecontract;
            $this->clause = $clause;
            $this->bonus = $bonus;
            $this->court = $court;
            $this->obs = $obs;
            
            return $this;
        }
    }

    class mandates {
        public $id = 0;
        public $player;
        public $coach;
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
        public $formation;
        public $value;
        public $passport;
        public $passportval;
        public $iscoach;

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
                $this->coach = (isset($obj["id_coach"])) ? $obj["id_coach"] : null;
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
                $this->formation = (isset($obj["formation"])) ? $obj["formation"] : null;
                $this->value = (isset($obj["value"])) ? $obj["value"] : null;
                $this->passport = (isset($obj["documents"])) ? $obj["documents"] : null;
                $this->passportval = (isset($obj["documentsval"])) ? $obj["documentsval"] : null;
                $this->iscoach = (isset($obj["iscoach"])) ? boolval($obj["iscoach"]) : null;
                
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

        public function set($id,  $player, $coach, $name, $firstname, $lastname, $birth, $nationality, $height, $weight, $foot, $position, $formation, $club, $clubname, $value, $passport, $passportval,
        $agentclub, $agentclubname,  $agentcountry, $agentname, $agentfirstname, $agentlastname, $agentbirth, $agentnationality, $agentpassport, $agentpassportval, $agentcompany, $agentcontacts, $agentobs,
        $datestart, $dateend,  $obs,  $file, $iscoach) {
            $this->id = $id;
            $this->player = $player;
            $this->coach = $coach;
            $this->name = $name;
            $this->firstname = $firstname;
            $this->lastname = $lastname;
            $this->birth = $birth;
            $this->nationality = $nationality;
            $this->height = $height;
            $this->weight = $weight;
            $this->foot = $foot;
            $this->position = $position;
            $this->formation = $formation;
            $this->club = $club;
            $this->clubname = $clubname;
            $this->value = $value;
            $this->passport = $passport;
            $this->passportval = $passportval;
            $this->iscoach = $iscoach;

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
        public $agentclubid;
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
        public $age;

        function __construct($obj) {
            if (isset($obj)) {
                $this->id = (isset($obj["id_agent"])) ? intval($obj["id_agent"]) : null;
                $this->agentclubid = (isset($obj["id_agent_club"])) ? $obj["id_agent_club"] : null;
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
                $this->age = (isset($obj["age"])) ? $obj["age"] : null;
            };
        }

        public function get() {
            return $this;
        }

        public function set($id, $agentclubid, $club, $clubname, $country, $name, $firstname, $lastname,$birth, $nationality, $passport, $passportval, $agentcompany, $contacts, $obs, $age) {
            $this->id = $id;
            $this->agentclubid = $agentclubid;
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
            $this->age = $age;
            
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
        public $left_days;

        function __construct($obj) {
            if (isset($obj)) {
                $this->id = (isset($obj["id_player"])) ? intval($obj["id_player"]) : null;
                $this->firstname = (isset($obj["first_name"])) ? $obj["first_name"] : null;
                $this->lastname = (isset($obj["last_name"])) ? $obj["last_name"] : null;
                $this->birth = (isset($obj["birth_date"])) ? $obj["birth_date"] : null;
                $this->left_days = (isset($obj["left_days"])) ? $obj["left_days"] : null;
            };
        }

        public function get() {
            return $this;
        }

        public function set($id, $firstname, $lastname, $birth, $left_days) {
            $this->id = $id;
            $this->firstname = $firstname;
            $this->lastname = $lastname;
            $this->birth = $birth;
            $this->left_days = $left_days;
            
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

    class clubs_list {
        public $id = 0;
        public $name_club;
        public $country;

        function __construct($obj) {
            if (isset($obj)) {
                $this->id = (isset($obj["id_club"])) ? intval($obj["id_club"]) : null;
                $this->name_club = (isset($obj["name_club"])) ? $obj["name_club"] : null;
                $this->country = (isset($obj["country"])) ? ($obj["country"]) : null;
            };
        }

        public function get() {
            return $this;
        }

        public function set($id, $nameclub, $country) {
            $this->id = $id;
            $this->name_club = $name_club;
            $this->country = $country;
            
            return $this;
        }
    }


?>