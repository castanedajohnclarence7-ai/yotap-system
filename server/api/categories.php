<?php

// List categories endpoint
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");

require_once "../config/Database.php";

$db=new Database();
$conn=$db->connect();

$result=$conn->query("SELECT * FROM categories ORDER BY id DESC");

$data=[];

while($row=$result->fetch_assoc()){
    $data[]=$row;
}

echo json_encode($data);