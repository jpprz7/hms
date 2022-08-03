$("document").ready(()=>{
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
    $(".bookingContainer").empty();

    let displayData = ()=>{
        fetch("api/getReceipt.php", {
            method: "POST",
            headers: {
                'content-type': "application/json"
            },
            body : JSON.stringify({
                id: sessionStorage.getItem("id")
            })
        })
        .then(res=>{return res.json()})
        .then(data=>{
            if(data[0].booking_id == 0){
                return;
            }
            $(".bookingContainer").empty();
            console.log(data);
            for(let i in data){
                let receipt = document.createElement("div");
                let bookingid = document.createElement("p");
                let billid = document.createElement("p");
                let roomtype = document.createElement("p");
                let price = document.createElement("p");
                let checkin = document.createElement("p");
                let checkout = document.createElement("p");
                let cancel = document.createElement("button");

                receipt.setAttribute("class", "booking");
                bookingid.innerText = "booking id: " + data[i].booking_id;
                billid.innerText = "bill id: " + data[i].bill_id;
                roomtype.innerText = "room type: " + data[i].room_type_name;
                price.innerText = "price: " + data[i].room_price;
                checkin.innerText = "check in date: " + data[i].checkin_date;
                checkout.innerText = "check out date: " + data[i].checkout_date;
                cancel.setAttribute("class", "cancel");
                cancel.setAttribute("onclick", "cancelBooking("+ data[i].booking_id + ", " + data[i].bill_id + ")");
                cancel.innerText = "CANCEL";

                receipt.append(bookingid);
                receipt.append(billid);
                receipt.append(roomtype);
                receipt.append(price);
                receipt.append(checkin);
                receipt.append(checkout);
                receipt.append(cancel);
                $(".bookingContainer").append(receipt);
            }
        });
    };

    displayData();
});

cancelBooking = function(bookingid, billid){
    fetch("api/deleteBill.php", {
        method: "POST",
        headers: {
            'content-type': "application/json"
        },
        body: JSON.stringify({
            id: billid
        })
    })
    .then(()=>{
        fetch("api/deleteBooking.php", {
            method: "POST",
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify({
                id: bookingid
            })
        })
        .then(()=>{
            console.log("booking removed");
            window.location = "booking.html";          
        })
        .catch(()=>{console.log("hala may mali")});
    })
    .catch(()=>{console.log("hala may mali")});
}