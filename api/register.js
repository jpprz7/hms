$("document").ready(()=>{
    let checkInput = ()=>{
        let flag = true;
        if($("#username").val() === ""){
            flag = false;
        }
        if($("#password").val() === ""){
            flag = false;
        }
        if($("#firstname").val() === ""){
            flag = false;
        }
        if($("#lastname").val() === ""){
            flag = false;
        }
        if($("#contactNumber").val() === ""){
            flag = false;
        }
        if($("#email").val() === ""){
            flag = false;
        }
        return flag;
    };
    $("#register").click(()=>{
        if(checkInput()){
            fetch("api/register.php",{
                method: 'POST',
                headers: {
                    'content-type': "application/json"
                },
                body: JSON.stringify({
                    username: $("#username").val(),
                    password: $("#password").val(),
                    firstname: $("#firstname").val(),
                    lastname: $("#lastname").val(),
                    contactNumber: $("#contactNumber").val(),
                    email: $("#email").val()
                })
            })
            .then(()=>{
                $("#registerSuccess").css({display: "block"});
                console.log("registered");
            })
            .catch(error=>{console.log(error)});
        }else{
            $("#checkInput").css({display: "block"});
        }
    });
    $('#username').keyup(()=>{
        fetch("api/usernameCheck.php?id=" + $('#username').val(),{
            method: 'GET',
            headers: {
                'content-type': "application/json"
            },
        })
        .then(res=>{return res.json()})
        .then(data=>{
            if(data[0].username === 0){
                $("#register").prop("disabled", false);
                $("#checkInput").css({display: "none"});
            }else{
                $("#checkInput").css({display: "block"});
                $("#checkInput").text("username already used");
                $("#register").prop("disabled", true);
            }
        })
        .catch(error=>{console.log(error)});
    });
    $("#back").click(()=>{
        window.location = "index.html";
    });
   
});