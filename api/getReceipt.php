<?php
    include 'connection.php';
    if($conn->connect_error){
        die($conn->connect_error);
    }
    $data = json_decode(file_get_contents('php://input'), true);
    $id = $data['id'];
    $sql = "SELECT
            booking.booking_id,
            bill.bill_id,
            room_type.room_type_name, 
            room.room_num, 
            bill.room_price, 
            booking.checkin_date, 
            booking.checkout_date
            FROM bill
            JOIN booking ON booking.customer_id = bill.customer_id
            JOIN room ON room.room_id = booking.room_id
            JOIN room_type ON room_type.room_type_id = room.room_type_id
            WHERE booking.customer_id=". $id ."
            GROUP BY booking.booking_id;";
    $result = $conn->query($sql);
    $d = [];
    if($result->num_rows > 0){
        while($row = $result->fetch_assoc()){
            array_push($d, array(
                "booking_id"=>$row['booking_id'],
                "bill_id"=>$row['bill_id'],
                "room_type_name"=>$row['room_type_name'], 
                "room_num"=>$row['room_num'], 
                "room_price"=>$row['room_price'], 
                "checkin_date"=>$row['checkin_date'], 
                "checkout_date"=>$row['checkout_date']
            ));
        }
        echo json_encode($d);
    }else{
        array_push($d, array(
            "booking_id"=>0,
            "bill_id"=>0,
            "room_type_name"=>0, 
            "room_num"=>0, 
            "room_price"=>0, 
            "checkin_date"=>0, 
            "checkout_date"=>0
        ));
        echo json_encode($d);   
    }
?>