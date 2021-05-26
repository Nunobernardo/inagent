<?php
    include('enums.php');

    //[ START SESSION ]
    function start_session () {
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        };
    }

    //[ SET SESSION VARIABLES ]
    function set_session_variables ($name, $value) {
        //[ START THE SESSION ]
        start_session();

        $_SESSION[$name] = $value;
    }

    //[ REMOVE SESSION ]
    function remove_session () {
        //[ START THE SESSION ]
        start_session();

        //[ REMOVE ALL SESSION VARIABLES ]
        session_unset();

        //[ DESTROY THE SESSION ]
        session_destroy();
    }

    //[ CHECK IF SESSION VARIABLE EXISTS ]
    function check_session ($name) {
        //[ START THE SESSION ]
        start_session();

        //[ IF LAST REQUEST WAS MORE THAN 30 MINUTES AGO RESET SESSION ]
        if (isset($_SESSION['LAST_ACTIVITY']) && (time() - $_SESSION['LAST_ACTIVITY'] > 1800)) {
            $_SESSION[$name] = null;
        };

        $_SESSION['LAST_ACTIVITY'] = time();

        return (isset($_SESSION[$name]));
    }

    //[ CHECK IF LOGIN SESSION EXISTS ]
    function check_login () {
        //[ START THE SESSION ]
        start_session();

        if (!check_session("login")) {
            echo '<script type="text/javascript">$(document).ready(function () { controls.session.without("' . strval(CommonPages::LOGIN) . '"); });</script>';
        };

        return true;
    }

    //[ GET USER OBJECT FROM SESSION ]
    function get_current_user_session () {
        return (isset($_SESSION['user'])) ? $user = unserialize($_SESSION['user']) : new user();
    }
?>