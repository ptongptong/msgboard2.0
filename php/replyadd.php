<?php
    SESSION_start();
    $conn=mysqli_connect("127.0.0.1","root","","first_sql");
    if (!$conn) {
        die('error:'.mysql_error());
    }
    if (!isset($_SESSION['username'])) {
        echo 1;
        exit;
    }
    $who=$_SESSION['username'];
    $content=$_POST["content"];
    $msgid=$_POST["msgid"]; 

    $sql="SELECT * FROM reply WHERE replyid=(SELECT MAX(replyid) FROM reply)";
    $id=1;
    if ($res=mysqli_query($conn,$sql)){
        while ($row=mysqli_fetch_row($res)){   
            $id=$row[0]+1;
        }
    }
    date_default_timezone_set("Asia/Shanghai");
    $time = date("Y-m-d h:i:sa");
    echo 0;
    mysqli_query($conn,"INSERT INTO reply (msgid,replyid,who,time,content) VALUES('{$msgid}','{$id}','{$who}','{$time}','{$content}')");
    mysqli_close($conn);
?>