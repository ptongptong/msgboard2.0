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
    if (empty($content)){
        echo 2;
        exit;
    }
    $sql="SELECT * FROM msg WHERE msgid=(SELECT MAX(msgid) FROM msg)";
    $id=1;
    if ($res=mysqli_query($conn,$sql)){
        while ($row=mysqli_fetch_row($res)){   
            $id=$row[0]+1;
        }
    }
    date_default_timezone_set("Asia/Shanghai");
    $time = date("Y-m-d h:i:sa");
    echo 0;
    mysqli_query($conn,"INSERT INTO msg (msgid,who,time,content) VALUES('{$id}','{$who}','{$time}','{$content}')");
    mysqli_close($conn);
?>