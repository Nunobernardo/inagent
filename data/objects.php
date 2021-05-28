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

        public function set($id, $name, $firstname, $lastname, $birth, $nationality, $height, $weight, $foot, $position, $club, $clubname, $value, $passport, $passportval, $file) {
            $this->id = $id;
            $this->name = $name;
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
            $this->file = $file;
            
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

        public function set($id, $club, $clubname, $name, $firstname, $lastname, $birth, $age, $nationality, $height, $weight, $foot, $formation, $value, $passport, $passportval, $file) {
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
            $this->file = $file;
            
            return $this;
        }
    }

    class representation {
        public $id = 0;
        public $player;
        public $playername;
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
                $this->playername = (isset($obj["player_name"])) ? $obj["player_name"] : null;
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

        public function set($id, $player, $playername, $child, $father, $mother, $datestart, $dateend, $commission, $file) {
            $this->id = $id;
            $this->player = $player;
            $this->playername = $playername;
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

    class agent {
        public $id = 0;
        public $club;
        public $name;
        public $firstname;
        public $lastname;
        public $birth;
        public $nationality;
        public $documents;
        public $documentsval;
        public $company;
        public $contacts;
        public $obs;

        function __construct($obj) {
            if (isset($obj)) {
                $this->id = intval($obj["id_agent"]);
                $this->club = $obj["id_club"];
                $this->name = $obj["name"];
                $this->firstname = $obj["firstname"];
                $this->lastname = $obj["lastname"];
                $this->birth = $obj["birth"];
                $this->nationality = $obj["nationality"];
                $this->documents = $obj["documents"];
                $this->documentsval = $obj["documentsval"];
                $this->company = $obj["company"];
                $this->contacts = $obj["contacts"];
                $this->obs = $obj["obs"];
            };
        }

        public function get() {
            return $this;
        }

        public function set($id, $club, $name, $firstname, $lastname, $birth, $nationality, $documents, $documentsval, $company, $contacts, $obs) {
            $this->id = $id;
            $this->club = $club;
            $this->name = $name;
            $this->firstname = $firstname;
            $this->lastname = $lastname;
            $this->birth = $birth;
            $this->nationality = $nationality;
            $this->documents = $documents;
            $this->documentsval = $documentsval;
            $this->company = $company;
            $this->contacts = $contacts;
            $this->obs = $obs;
            
            return $this;
        }
    }

    class club {
        public $id = 0;
        public $player;
        public $playername;
        public $club;
        public $clubname;
        public $datestart;
        public $dateend;
        public $value;
        public $clause;
        public $bonus;
        public $court;
        public $obs;
        public $files;

        function __construct($obj) {
            if (isset($obj)) {
                $this->id = (isset($obj["id_contract_club"])) ? intval($obj["id_contract_club"]) : null;
                $this->club = (isset($obj["id_club"])) ? $obj["id_club"] : null;
                $this->clubname = (isset($obj["club_name"])) ? $obj["club_name"] : null;
                $this->player = (isset($obj["id_player"])) ? $obj["id_player"] : null;
                $this->playername = (isset($obj["player_name"])) ? $obj["player_name"] : null;
                $this->datestart = (isset($obj["date_start"])) ? $obj["date_start"] : null;
                $this->dateend = (isset($obj["date_end"])) ? $obj["date_end"] : null;
                $this->value = (isset($obj["value"])) ? $obj["value"] : null;
                $this->clause = (isset($obj["clause"])) ? $obj["clause"] : null;
                $this->bonus = (isset($obj["bonus"])) ? $obj["bonus"] : null;
                $this->court = (isset($obj["court"])) ? $obj["court"] : null;
                $this->obs = (isset($obj["obs"])) ? $obj["obs"] : null;
                $this->files = (isset($obj["files"])) ? $obj["files"] : null;
            };
        }

        public function get() {
            return $this;
        }

        public function set($id, $club, $clubname, $player, $playername, $datestart, $dateend, $value, $clause, $bonus, $court, $obs, $files) {
            $this->id = $id;
            $this->club = $club;
            $this->clubname = $clubname;
            $this->player = $player;
            $this->playername = $playername;
            $this->datestart = $datestart;
            $this->dateend = $dateend;
            $this->value = $value;
            $this->clause = $clause;
            $this->bonus = $bonus;
            $this->court = $court;
            $this->obs = $obs;
            $this->files = $files;
            
            return $this;
        }
    }

    class mandates {
        public $id = 0;
        public $player;
        public $datestart;
        public $dateend;
        public $obs;

        function __construct($obj) {
            if (isset($obj)) {
                $this->id = intval($obj["id_representation"]);
                $this->player = $obj["player"];
                $this->datestart = $obj["datestart"];
                $this->dateend = $obj["dateend"];
                $this->obs = $obj["obs"];
            };
        }

        public function get() {
            return $this;
        }

        public function set($id, $player, $datestart, $dateend,  $obs) {
            $this->id = $id;
            $this->player = $player;
            $this->datestart = $datestart;
            $this->dateend = $dateend;
            $this->obs = $obs;
            
            return $this;
        }
    }

?>