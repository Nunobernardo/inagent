<?php
    require('../phpmailer/Exception.php');
    require('../phpmailer/PHPMailer.php');
    require('../phpmailer/SMTP.php');

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;

    //[ USED TO SEND E-MAILS ]
    function SendEmail($to, $toname, $subject, $body) {
        $mail = new PHPMailer(true);

        try {
            //[ SERVER SETTINGS ]
            $mail->SMTPDebug = SMTP::DEBUG_OFF;                         //[ ENABLE VERBOSE DEBUG OUTPUT ]
            $mail->isSMTP();                                            //[ SEND USING SMTP ]
            $mail->Host       = 'smtp.gmail.com';                       //[ SET THE SMTP SERVER TO SEND THROUGH ]
            $mail->SMTPAuth   = true;                                   //[ ENABLE SMTP AUTHENTICATION ]
            $mail->Username   = 'atw.ispgaya@gmail.com';                //[ SMTP USERNAME ]
            $mail->Password   = 'ATWgmail$10';                          //[ SMTP PASSWORD ]
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         //[ ENABLE TLS ENCRYPTION; `PHPMAILER::ENCRYPTION_SMTPS` ALSO ACCEPTED ]
            $mail->Port       = 587;                                    //[ TCP PORT TO CONNECT TO ]
        
            //[ RECIPIENTS ]
            $mail->setFrom('atw.ispgaya@gmail.com', 'ISPGAYA');
            $mail->addAddress($to, $toname);
        
            //[ CONTENT ]
            $mail->isHTML(true);
            $mail->Subject = $subject;
            $mail->Body    = $body;
            $mail->CharSet = 'UTF-8';
        
            //[ SEND ]
            $mail->send();

            return true;
        } catch (Exception $e) {
            return false;
        };
    };
?>