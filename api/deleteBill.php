<?php
    include 'connection.php';
    if($conn->connect_error){
        die($conn->connect_error);
    }
    $data = json_decode(file_get_contents('php://input'), true);
    $id = $data['id'];
    $sql = "DELETE 
            FROM bill 
            WHERE bill.bill_id =".$id.";";
    $result = $conn->query($sql);
    if(mysqli_query($conn, $sql)){
        echo "done";
    }else{
        echo "oops";
    }
?>
?>