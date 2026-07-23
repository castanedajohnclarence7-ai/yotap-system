<?php

// List users endpoint
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");

require_once "../config/Database.php";

$db = new Database();
$conn = $db->connect();

$sql = "SELECT id, fullname, username, email, role
        FROM users
        ORDER BY id DESC";

$result = $conn->query($sql);

$users = [];

while($row = $result->fetch_assoc()){
    $users[] = $row;
}

echo json_encode($users);