$("document").ready(()=>{
    let price = 0;
    let days = 0;
    let rooms;
    let flag = false;

    let updateRooms = ()=>{
        fetch("api/updateRooms.php", {
            method: "GET",
            headers: {
                'content-type': "application/json"
            }
        })
        .then(()=>{console.log("debuging: rooms updated")})
        .catch(()=>{console.log("hala may mali")});
    };

    updateRooms();

    $("#checkindate").change(()=>{
        let d1 = new Date($("#checkindate").val());
        let d2 = new Date($("#checkoutdate").val());
        let dif = d1.getTime() - d2.getTime();
        if(dif < 0){
            console.log(Math.abs(dif)/86400000);
           days = Math.abs(dif)/86400000;
           $("#roomtype").change();
           flag = true;
        }
        else{
            flag = false;
            
        }
    });
    $("#checkoutdate").change(()=>{
        let d1 = new Date($("#checkindate").val());
        let d2 = new Date($("#checkoutdate").val());
        let dif = d1.getTime() - d2.getTime();
        if(dif < 0){
            console.log(Math.abs(dif)/86400000);
           days = Math.abs(dif)/86400000;
           $("#roomtype").change();
           flag = true;
        }
        else{
            flag = false;
            $("#price").text("please check input");
        }
        
    });

    $("#roomtype").change(()=>{
        switch($("#roomtype").val()){
            case "single":
                price = 75;
                fetch("api/checkRooms.php", {
                    method: "POST",
                    headers: {
                        'content-type': "application/json"
                    },
                    body : JSON.stringify({
                        roomtype: 1
                    })
                })
                .then(res=>{return res.json()})
                .then(data=>{
                    if(data.room_id == 0){
                        flag = false;
                        //no available rooms
                        $("#price").text("Single rooms are fully booked:(");
                    }else{
                        rooms = Object.assign({}, data);
                        flag = true;
                    }
                });
            break;
            case "twin":
                price = 95;
                fetch("api/checkRooms.php", {
                    method: "POST",
                    headers: {
                        'content-type': "application/json"
                    },
                    body : JSON.stringify({
                        roomtype: 2
                    })
                })
                .then(res=>{return res.json()})
                .then(data=>{
                    if(data.room_id == 0){
                        flag = false;
                        //no available rooms
                        $("#price").text("Twin rooms are fully booked:(");
                    }else{
                        rooms = Object.assign({}, data);
                        flag = true;
                    }
                });
            break;
            case "studio":
                price = 125;
                fetch("api/checkRooms.php", {
                    method: "POST",
                    headers: {
                        'content-type': "application/json"
                    },
                    body : JSON.stringify({
                        roomtype: 3
                    })
                })
                .then(res=>{return res.json()})
                .then(data=>{
                    if(data.room_id == 0){
                        flag = false;
                        //no available rooms
                        $("#price").text("Studio rooms are fully booked:(");
                    }else{
                        rooms = Object.assign({}, data);
                        flag = true;
                    }
                });
            break;
            case "deluxe":
                price = 237;
                fetch("api/checkRooms.php", {
                    method: "POST",
                    headers: {
                        'content-type': "application/json"
                    },
                    body : JSON.stringify({
                        roomtype: 4
                    })
                })
                .then(res=>{return res.json()})
                .then(data=>{
                    if(data.room_id == 0){
                        flag = false;
                        //no available rooms
                        $("#price").text("Deluxe rooms are fully booked:(");
                    }else{
                        rooms = Object.assign({}, data);
                        flag = true;
                    }
                });
            break;
            case "penthouse":
                price = 345;
                fetch("api/checkRooms.php", {
                    method: "POST",
                    headers: {
                        'content-type': "application/json"
                    },
                    body : JSON.stringify({
                        roomtype: 5
                    })
                })
                .then(res=>{return res.json()})
                .then(data=>{
                    if(data.room_id == 0){
                        flag = false;
                        //no available rooms
                        $("#price").text("Penthouse suite are fully booked:(");
                    }else{
                        rooms = Object.assign({}, data);
                        flag = true;
                    }
                });
            break;
            case "presidential":
                price = 520;
                fetch("api/checkRooms.php", {
                    method: "POST",
                    headers: {
                        'content-type': "application/json"
                    },
                    body : JSON.stringify({
                        roomtype: 6
                    })
                })
                .then(res=>{return res.json()})
                .then(data=>{
                    if(data.room_id == 0){
                        flag = false;
                        //no available rooms
                        $("#price").text("Presidential suite are fully booked:(");
                    }else{
                        rooms = Object.assign({}, data);
                        flag = true;
                    }
                });
            break;
        }
        let total = price * days;
        $("#price").text(total);
    });
    $("#add").click(()=>{
        if(flag){
            let total = price * days;
            console.log(rooms[0].room_id,);
            fetch("api/addBooking.php", {
                method: "POST",
                headers: {
                    'content-type': "application/json"
                },
                body : JSON.stringify({
                    customer_id: sessionStorage.getItem("id"),
                    room_id: rooms[0].room_id,
                    checkin_date: $("#checkindate").val(),
                    checkout_date: $("#checkoutdate").val()
                })
            })
            .then(res=>{return res.json()})
            .then(data=>{
                //inserting bill
               console.log(data[0].last_id);
               fetch("api/addBill.php", {
                method: "POST",
                headers: {
                    'content-type': "application/json"
                },
                body : JSON.stringify({
                    booking_id: data[0].last_id,
                    customer_id: sessionStorage.getItem("id"),
                    room_price: total
                })
            })
            .then(res=>{return res.json()})
            .then(data=>{
               console.log(data[0].last_id);
               updateRooms();
               window.location = "booking.html";
            });
            });
        }else{
            console.log(flag);
        }
        updateRooms();
    });
});