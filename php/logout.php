<?php
    header('Content-Type: application/json'); 
    SESSION_start();
    SESSION_unset();
    SESSION_destroy();
    echo 0;
?>