<?php
	header('Content-Type: application/json'); 
	SESSION_start();
    $conn=mysqli_connect("127.0.0.1","root","","first_sql");
	if (!$conn) {
		die('error:'.mysql_error());
    }
    $name=$_POST["who"];
    $id=$_POST["replyid"];
    if (!isset($_SESSION['username'])) {
        echo 2;
        exit;
    }
    if (!($name==$_SESSION['username'])) {
        echo 1;
        exit;
    }
    mysqli_query($conn,"DELETE FROM reply WHERE replyid='{$id}'");
    echo 0;
    mysqli_close($conn);
?>