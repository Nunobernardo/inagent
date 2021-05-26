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
        public $name;
        public $firstname;
        public $lastname;
        public $birth;
        public $age;
        public $nationality;
        public $height;
        public $weight;
        public $foot;
        public $position;
        public $club;
        public $value;
        public $passport;
        public $passportval;

        function __construct($obj) {
            if (isset($obj)) {
                $this->id = intval($obj["id_player"]);
                $this->name = $obj["name"];
                $this->firstname = $obj["first_name"];
                $this->lastname = $obj["last_name"];
                $this->birth = $obj["birth_date"];
                //$this->age = $obj["email"];
                $this->nationality = $$obj["nationality"];
                $this->height = $obj["height"];
                $this->weight = $obj["weight"];
                //$this->foot = $obj["email"];
                $this->position = $obj["position"];
                $this->club = $obj["id_club"];
                $this->value = $obj["value"];
                $this->passport = $obj["documents"];
                $this->passportval = $obj["documents_val"];
            };
        }

        public function get() {
            return $this;
        }

        public function set($id, $name, $firstname, $lastname, $birth, $age, $nationality, $height, $weight, $foot, $position, $club, $value, $passport, $passportval) {
            $this->id = $id;
            $this->name = $name;
            $this->firstname = $firstname;
            $this->lastname = $lastname;
            $this->birth = $birth;
            $this->age = $age;
            $this->nationality = $nationality;
            $this->height = $height;
            $this->weight = $weight;
            $this->foot = $foot;
            $this->position = $position;
            $this->club = $club;
            $this->value = $value;
            $this->passport = $passport;
            $this->passportval = $passportval;
            
            return $this;
        }
    }

    class coach {
        public $id = 0;
        public $name;
        public $firstname;
        public $lastname;
        public $birth;
        public $age;
        public $nationality;
        public $height;
        public $weight;
        public $foot;
        public $formation;
        public $value;
        public $passport;
        public $passportval;

        function __construct($obj) {
            if (isset($obj)) {
                $this->id = intval($obj["id_coach"]);
                $this->name = $obj["nickname"];
                $this->firstname = $obj["first_name"];
                $this->lastname = $obj["last_name"];
                $this->birth = $obj["birth_date"];
                //$this->age = $obj["email"];
                $this->nationality = $$obj["nationality"];
                $this->height = $obj["height"];
                $this->weight = $obj["weight"];
                //$this->foot = $obj["email"];
                $this->formation = $obj["formation"];
                $this->value = $obj["value"];
                $this->passport = $obj["documents"];
                $this->passportval = $obj["number_doc"];
            };
        }

        public function get() {
            return $this;
        }

        public function set($id, $name, $firstname, $lastname, $birth, $age, $nationality, $height, $weight, $foot, $formation, $value, $passport, $passportval) {
            $this->id = $id;
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
        public $father;
        public $mother;
        public $datestart;
        public $dateend;
        public $commission;

        function __construct($obj) {
            if (isset($obj)) {
                $this->id = intval($obj["id_representation"]);
                $this->player = $obj["player"];
                $this->father = $obj["father"];
                $this->mother = $obj["mother"];
                $this->datestart = $$obj["datestart"];
                $this->dateend = $obj["dateend"];
                $this->commission = $obj["commission"];
            };
        }

        public function get() {
            return $this;
        }

        public function set($id, $player, $father, $mother, $datestart, $dateend, $commission) {
            $this->id = $id;
            $this->player = $player;
            $this->father = $father;
            $this->mother = $mother;
            $this->datestart = $datestart;
            $this->dateend = $dateend;
            $this->commission = $commission;
            
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
                $this->nationality = $$obj["nationality"];
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

    class cclub {
        public $id = 0;
        public $player;
        public $datestart;
        public $dateend;
        public $value;
        public $clause;
        public $bonus;
        public $court;
        public $obs;

        function __construct($obj) {
            if (isset($obj)) {
                $this->id = intval($obj["id_representation"]);
                $this->player = $obj["player"];
                $this->datestart = $obj["datestart"];
                $this->dateend = $obj["dateend"];
                $this->value = $$obj["value"];
                $this->clause = $obj["clause"];
                $this->bonus = $obj["bonus"];
                $this->court = $obj["court"];
                $this->obs = $obj["obs"];
            };
        }

        public function get() {
            return $this;
        }

        public function set($id, $player, $datestart, $dateend, $value, $clause, $bonus, $court, $obs) {
            $this->id = $id;
            $this->player = $player;
            $this->datestart = $datestart;
            $this->dateend = $dateend;
            $this->value = $value;
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