<?php
    //[ FEEDBACK MESSAGES ]
    abstract class Feedback {
        const FUNCTION_NAME_IS_NOT_SET = 'FUNCTION_NAME_IS_NOT_SET: ';
        const USER_NOT_FOUND = 'USER_NOT_FOUND';
        const EMAIL_ALREADY_IN_USE = 'EMAIL_ALREADY_IN_USE';
    };

    //[ COMMON PAGES ]
    abstract class CommonPages {
        const LOGIN = '../../login.php';
        const INAGENT_INDEX = 'inagent/index.html';
    };
?>