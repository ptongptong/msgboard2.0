<?php
	header('Content-Type: application/json'); 
	SESSION_start();
    $conn=mysqli_connect("127.0.0.1","root","","first_sql");
	if (!$conn) {
		die('error:'.mysql_error());
	}
	$name=$_POST["username"];
	$pwd=$_POST["password"];
	$icode=$_POST["icode"];
	if( !preg_match('/\w/',$name)) {
		echo 1;
		exit;
	}
	$sql="SELECT * FROM users WHERE username=? AND password=?";
	$stmt=mysqli_prepare($conn,$sql);
	$stmt->bind_param("ss",$name,$pwd);
	$stmt->execute();
	$res=$stmt->get_result();
	$boo=mysqli_num_rows($res);
	if ($boo>0) {
		$_SESSION['username']=mysqli_fetch_assoc($res)['username'];
		$_SESSION['isLogin']=1;//admin
		if ($icode==$_SESSION['vcode']){echo 0;}
		 else {echo 2;}
	}
	else{
		echo 1;
	}
	mysqli_close($conn);		
?>
