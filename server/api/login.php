<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once "../config/Database.php";

$db = new Database();
$conn = $db->connect();

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->username) || !isset($data->password)) {
    echo json_encode([
        "success" => false,
        "message" => "Username and Password are required."
    ]);
    exit;
}

$username = $conn->real_escape_string($data->username);
$password = $data->password;

$sql = "SELECT * FROM users WHERE username='$username' LIMIT 1";

$result = $conn->query($sql);

if ($result->num_rows > 0) {

    $user = $result->fetch_assoc();

    if (password_verify($password, $user["password"])) {

        echo json_encode([
            "success" => true,
            "user" => [
                "id" => $user["id"],
                "fullname" => $user["fullname"],
                "username" => $user["username"],
                "role" => $user["role"]
            ]
        ]);

    } else {

        echo json_encode([
            "success" => false,
            "message" => "Incorrect password."
        ]);

    }

} else {

    echo json_encode([
        "success" => false,
        "message" => "User not found."
    ]);

}