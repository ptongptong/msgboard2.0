function show(){
    var username=$('#username').val();
    var password=$("#password").val();
    var icode=$("#icode").val();
    if(username!=""&&password!=""){
        $.ajax({
            type:"POST",
            url:"login.php",
            dataType:"JSON",
            data:{
                "username":username,
                "password":password,
                "icode":icode,
            },
            success:function(data){
                switch(data){
                    case 1:
                        document.getElementById("errmsg").innerHTML="用户名或密码错误！";
                        break;
                    case 2:
                        document.getElementById("errmsg").innerHTML="验证码错误！";
                        break;   
                    case 0:
                        window.location.href="msgboard.html";
                }
                
            }
        })
    }else{document.getElementById("errmsg").innerHTML="请输入完整！";}
}

