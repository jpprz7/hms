$("document").ready(()=>{
    $("#login").click(()=>{
        fetch('api/authenticate.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: $("#username").val(),
                password:  $("#password").val() 
            })
        })
        .then(res=>{return res.json()})
        .then(data=>{
            if(data.customer_id == 0){
                console.log("invalid username and password");
                $("#checkInput").css({display: "block"});
            }else{
                //create session variable for user id when login is successful
                sessionStorage.setItem('id',data.customer_id);
                window.location = "rooms.html";
            }
        })
        .catch(error=>console.log("error on authentication: " + error));
    });
});