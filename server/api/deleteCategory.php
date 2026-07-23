<?php

// Delete category endpoint
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once "../config/Database.php";

$db=new Database();
$conn=$db->connect();

$data=json_decode(file_get_contents("php://input"),true);

$id=(int)$data["id"];

$sql="DELETE FROM categories WHERE id=$id";

if($conn->query($sql)){
    echo json_encode(["success"=>true]);
}else{
    echo json_encode([
        "success"=>false,
        "message"=>$conn->error
    ]);
}