<?php
    include 'connection.php';
    if($conn->connect_error){
        die($conn->connect_error);
    }
    $data = json_decode(file_get_contents('php://input'), true);
    $id = $data['id'];
    $sql = "SELECT *
            FROM customers
            WHERE customer_id=" . $id . ";";
    $result = $conn->query($sql);
    $d = [];
    if($result->num_rows > 0){
        while($row = $result->fetch_assoc()){
           $d["username"]=$row['username'];
           $d["password"]=$row['password'];
           $d["firstname"]=$row['firstname'];
           $d["lastname"]=$row['lastname'];
           $d["contact_num"]=$row['contact_num'];
           $d["email"]=$row['email'];
        }
        echo json_encode($d);
    }else{
        $d["userID"]=0;
        echo json_encode($d);   
    }
?>