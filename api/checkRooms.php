<?php
    include 'connection.php';
    if($conn->connect_error){
        die($conn->connect_error);
    }
    $data = json_decode(file_get_contents('php://input'), true);
    $roomtype = $data['roomtype'];
    $sql = "SELECT room_id, room_num
            FROM room
            WHERE availability = 'TRUE' AND room_type_id = " . $roomtype . ";
        ";
    $result = $conn->query($sql);
    $d = [];
    if($result->num_rows > 0){
        while($row = $result->fetch_assoc()){
            array_push($d, ["room_id"=>$row['room_id'],"room_num"=>$row['room_num']]);
          
        }
        echo json_encode($d);
    }else{
        $d["room_id"]=0;
        $d["room_num"]=0;
        echo json_encode($d);   
    }
?>