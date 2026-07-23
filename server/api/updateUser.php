<?php

// Update user endpoint
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

require_once "../config/Database.php";

$db = new Database();
$conn = $db->connect();

$data = json_decode(file_get_contents("php://input"), true);

$id = (int)$data["id"];

$fullname = $conn->real_escape_string($data["fullname"]);
$username = $conn->real_escape_string($data["username"]);
$email = $conn->real_escape_string($data["email"]);
$role = $conn->real_escape_string($data["role"]);

$sql = "UPDATE users SET
fullname='$fullname',
username='$username',
email='$email',
role='$role'
WHERE id=$id";

if($conn->query($sql)){

    echo json_encode([
        "success"=>true
    ]);

}else{

    echo json_encode([
        "success"=>false,
        "message"=>$conn->error
    ]);

}