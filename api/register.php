<?php
    include 'connection.php';
    if($conn->connect_error){
        die($conn->connect_error);
    }
    $content = trim(file_get_contents("php://input"));
    $userData = json_decode($content, true);
    $sql = "INSERT INTO customers 
            (username, password, firstname, lastname, contact_num, email)
            VALUES 
            (
                '{$userData['username']}',
                '{$userData['password']}',
                '{$userData['firstname']}',
                '{$userData['lastname']}',  
                '{$userData['contactNumber']}',
                '{$userData['email']}'
            );
    ";
    $result = $conn->query($sql);
    echo json_encode($content);
?>