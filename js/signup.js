function show(){
    var username=$("#username").val();
    var password=$("#password").val();
    var checkpwd=$("#checkpwd").val();
    if(username!="" && password!=""){
        $.ajax({
            type:"POST",
            url:"signup.php",
            dataType:"JSON",
            data:{
                "username":username,
                "password":password,
                "checkpwd":checkpwd,
            },
            success:function(data){
                switch(data){
                    case 0:
                        document.getElementById("errmsg").innerHTML="注册成功！";
                        break;
                    case 1:
                        document.getElementById("errmsg").innerHTML="该用户已存在！";
                        break;
                    case 2:
                        document.getElementById("errmsg").innerHTML="两次密码不一致！";
                        break;
                    case 3:
                        document.getElementById("errmsg").innerHTML="用户名不合法！";
                }
            }
        })
    }
     else{
        document.getElementById("errmsg").innerHTML="请输入完整！";
     }   
}