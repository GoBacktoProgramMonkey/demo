$(function(){
    resetui();
    $("#btnSend").on("click",function () {
        var text = $("#ipt").val().trim();
        if (text.length<=0){
            return $("#ipt").val('');
        }
        $("#talk_list").append("<li class=\"right_word\"><img src=\"img/person02.png\" /> <span>"+text+"</span></li>");
        $("#ipt").val('');
        getMsg(text);
        resetui();
    })
    function getMsg(text) {
        $.ajax({
            method:"get",
            url:"http://www.liulongbin.top:3006/api/robot",
            data:{spoken:text},
            success:function (res) {
                console.log(res);
                if (res.message!="success"){
                    return;
                }
                $("#talk_list").append("<li class=\"left_word\"><img src=\"img/person01.png\" /> <span>"+res.data.info.text+"</span></li>");
                getVoice(res.data.info.text);
                resetui();
            }
        })
    }

    function getVoice(text) {
        $.ajax({
            method:"get",
            url:"http://www.liulongbin.top:3006/api/synthesize",
            data:{text:text},
            success:function (res) {
                console.log(res);
                if (res.status !==200){
                    return;
                }
                $("#yy").attr("src",res.voiceUrl);
            }
        })
    }
     $("#ipt").on("keyup",function (e) {
        if (e.keyCode===13){
            $("#btnSend").click();
        }
     })

})