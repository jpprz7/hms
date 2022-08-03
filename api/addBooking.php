<?php
    include 'connection.php';
    if($conn->connect_error){
        die($conn->connect_error);
    }
    $content = trim(file_get_contents("php://input"));
    $userData = json_decode($content, true);
    $sql = "INSERT INTO booking 
            (customer_id, room_id, checkin_date, checkout_date)
            VALUES 
            (
                '{$userData['customer_id']}',
                '{$userData['room_id']}',
                '{$userData['checkin_date']}',
                '{$userData['checkout_date']}'
            );
    ";
    $data = [];
    if(mysqli_query($conn, $sql)){
        $last_id = mysqli_insert_id($conn);
        array_push($data, ["last_id"=>$last_id]);
        echo json_encode($data);
    }else{
        array_push($data, ["last_id"=>"0"]);
        echo json_encode($data);
    }

?>