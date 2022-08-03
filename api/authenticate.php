<?php
    include 'connection.php';
    if($conn->connect_error){
        die($conn->connect_error);
    }
    $data = json_decode(file_get_contents('php://input'), true);
    $username = $data['username'];
    $password = $data['password'];
    $sql = "SELECT customer_id
            FROM customers
            WHERE username='" . $username . "' AND password='" . $password . "';
        ";
    $result = $conn->query($sql);
    $d = [];
    if($result->num_rows > 0){
        while($row = $result->fetch_assoc()){
           $d["customer_id"]=$row['customer_id'];
        }
        echo json_encode($d);
    }else{
        $d["customer_id"]=0;
        echo json_encode($d);   
    }
?>