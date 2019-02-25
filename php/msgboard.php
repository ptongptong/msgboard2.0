<?php
    $conn=mysqli_connect("127.0.0.1","root","","first_sql");
    if (!$conn) {
        die('error:'.mysql_error());
    }
    $sql="SELECT * FROM msg order by msgid";
    $res=mysqli_query($conn,$sql);
    $arr=mysqli_fetch_all($res);
    echo json_encode($arr);
?>