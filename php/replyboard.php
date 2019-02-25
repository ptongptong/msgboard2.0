<?php
    $conn=mysqli_connect("127.0.0.1","root","","first_sql");
    if (!$conn) {
        die('error:'.mysql_error());
    }
    $msgid=$_POST["msgid"];
    $sql="SELECT * FROM reply WHERE msgid=$msgid order by replyid";
    $res=mysqli_query($conn,$sql);
    $arr=mysqli_fetch_all($res);
    echo json_encode($arr);
?>