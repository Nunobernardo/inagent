<?php
    $server = "localhost";
    $username = "root";
    $password = "";
    $database = "footconet_bd";

    //[ CREATE CONNECTION ]
    $conn = mysqli_connect($server, $username, $password, $database);

    //[ CHECK CONNECTION ]
    if (!$conn) {
        echo "CONNECTED FAILED";
        //die("Connection failed: " . $conn->connect_error);
    };

    // echo "CONNECTED SUCCESSFULLY";
?>