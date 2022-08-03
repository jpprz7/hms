<?php
    include 'connection.php';
    if($conn->connect_error){
        die($conn->connect_error);
    }
    $data = json_decode(file_get_contents('php://input'), true);
    $sql = "UPDATE room
            JOIN booking on room.room_id = booking.room_id
            SET room.availability = if(CURDATE() BETWEEN booking.checkin_date AND booking.checkout_date, 'FALSE', 'TRUE');";
    $sql2 = "UPDATE room SET room.availability = 'TRUE';";
    $result2 = $conn->query($sql2);
    $result = $conn->query($sql);
    if(mysqli_query($conn, $sql2)){
        echo "done";
    }else{
        echo "oops";
    }
    if(mysqli_query($conn, $sql)){
        echo "done";
    }else{
        echo "oops";
    }
?>