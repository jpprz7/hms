$("document").ready(()=>{
    let getUserData = (id)=>{
        fetch('api/getUserData.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id
            })
        })
        .then(res=>{return res.json()})
        .then(data=>{
            $("#name").text("Hello " + data.firstname + " " + data.lastname +"!");
        })
        .catch(error=>console.log("error on authentication: " + error));
    };
    getUserData(sessionStorage.getItem("id"));
});