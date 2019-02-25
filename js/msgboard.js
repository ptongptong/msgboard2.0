//显示
$.ajax({
    type:"POST",
    url:"msgboard.php",
    dataType:"JSON",
    success:function(msg)
    {
        var head = document.getElementById("list");
        for (var i = 0;i < msg.length;i++){
            var con = document.createElement("div");
            con.className = "box clearfix";
            con.innerHTML =
            '<button class="close">×</button>'+
            '<img class="head" src="face.png">'+
            '<div class="content">'+
                '<p>'+'<span class="name">'+(msg[i])[1]+'</span>'+': '+(msg[i])[2]+'</p>'+
                '<span class="time">'+(msg[i])[3]+'</span>'+'<br/>'+
                '<span class="id">'+(msg[i])[0]+'<span>'+
            '</div>';
            $.ajax({
                type:"POST",
                url:"replyboard.php",
                dataType:"JSON",
                async:false,
                data:{
                    "msgid":(msg[i])[0]
                },
                success:function(res)
                {
                    for (var j=0;j<res.length;j++){
                        var ron=document.createElement("div");
                        ron.className="reply-box";
                        ron.innerHTML=
                        '<img class="head2" src="xxt.jpg">'+
                        '<p>'+'<span class="name">'+(res[j])[2]+'</span>'+': '+(res[j])[3]+'</p>'+
                        '<p class="time2">'+(res[j][4])+'<button class="reply-del">删除</button>'+'</p>'+
                        '<span class="id">'+(res[j])[1]+'<span>';
                        con.appendChild(ron);
                    }
                }
            })
            var last=document.createElement("div");
            last.className="text-box";
            last.innerHTML=
            '<textarea class="comment" autocomplete="off">评论…</textarea>'+
            '<button class="btn ">回 复</button>'+
            '<span class="word"><span>0</span>/150</span>';
            con.appendChild(last);

            head.appendChild(con);
        } 
    },       
})
window.onload=function(){
    
    //发留言 
    document.getElementById("submit").addEventListener("click",function(){
        event.preventDefault();
        var msg=document.getElementById("msg").value;
        $.ajax({
            type:"POST",
            url:"msgadd.php",
            dataType:"JSON",
            data:{
                "content":msg,
            },
            success:function(data)
            {
                switch(data){
                    case 1:
                        alert("请先登录！");
                        window.location.href="login.html";
                    case 2:
                        alert("留言不能为空！");
                    case 0:
                        //alert("成功");
                        window.location.reload();
                }
            },       
        })
    })
    //删留言
    function msgdel(node){
        var fa=node.parentNode;
        var user= fa.getElementsByClassName("name")[0];
        var num=fa.getElementsByClassName("id")[0];
        var txt=user.innerHTML;
        var msgid=num.innerText;
        $.ajax({
            type:"POST",
            url:"msgdel.php",
            dataType:"JSON",
            data:{
                "who":txt,
                "msgid":msgid,
            },
            success:function(data)
            {
                switch(data){
                    case 1:
                        alert("非法操作！");
                        break;
                    case 2:
                        alert("请先登录！");
                        window.location.href="login.html";
                    case 0:
                        fa.removeChild(node);
                        break;
                }
            }
        })
    }
    //发评论
    function replyadd(box,obj){
        var num=box.getElementsByClassName("id")[0];
        var msgid=num.innerText;
        var word = box.getElementsByClassName('comment')[0].value;
        console.log(msgid);
        $.ajax({
            type:"POST",
            url:"replyadd.php",
            dataType:"JSON",
            data:{
                "msgid":msgid,
                "content":word,
            },
            success:function(data)
            {
                switch(data){
                    case 1:
                        alert("请先登录！");
                        window.location.href="login.html";
                    case 0:
                        //alert("成功");
                        window.location.reload(); 
                }   
            }
        })
    }
    //删评论
    function replydel(node){
        var fa=node.parentNode;
        var user= fa.getElementsByClassName("name")[0];
        var num=fa.getElementsByClassName("id")[0];
        var txt=user.innerHTML;
        var replyid=num.innerText;
        $.ajax({
            type:"POST",
            url:"replydel.php",
            dataType:"JSON",
            data:{
                "who":txt,
                "replyid":replyid,
            },
            success:function(data)
            {
                switch(data){
                    case 1:
                        alert("非法操作！");
                        break;
                    case 2:
                        alert("请先登录！");
                        window.location.href="login.html";
                    case 0:
                        fa.removeChild(node);
                        window.location.reload(); 
                }
            }
        })
    }
    //每个div的事件
    var list = document.getElementById('list');
    var boxs = list.children;
    for (var i=0;i<boxs.length;i++)
    {
        boxs[i].onclick=function(e){
            var obj=e.target;
            switch(obj.className){
                case "close":
                    msgdel(obj.parentNode);
                    break;
                case "reply-del":
                     replydel(obj.parentNode);
                     break;
                case "btn":
                    replyadd(obj.parentNode.parentNode, obj);
                    break;

            }
        }
        var textArea = boxs[i].getElementsByClassName('comment')[0];

        textArea.onfocus = function () {
            this.parentNode.className = 'text-box text-box-on';
            this.value = this.value == '评论…' ? '' : this.value;
            this.onkeyup();
        }

        textArea.onblur = function () {
            var me = this;
            var val = me.value;
            if (val == '') {
                timer = setTimeout(function () {
                    me.value = '评论…';
                    me.parentNode.className = 'text-box';
                }, 200);
            }
        }

        textArea.onkeyup = function () {
            var val = this.value;
            var len = val.length;
            var els = this.parentNode.children;
            var btn = els[1];
            var word = els[2];
            if (len <=0 || len > 150) {
                btn.className = 'btn btn-off';
            }
            else {
                btn.className = 'btn';
            }
            word.innerHTML = len + '/150';
        }
    }
    //注销
    document.getElementById("logout").addEventListener("click",function(){
        $.ajax({
            type:"POST",
            url:"logout.php",
            dataType:"JSON",
            success:function(data){
                switch(data){
                    case 0:
                        alert("注销成功！");
                        break;
                }
            }
        })
    })
}





