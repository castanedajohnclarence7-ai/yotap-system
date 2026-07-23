<?php

// Add user endpoint
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

// Respond to CORS preflight requests and only allow POST for this endpoint
if ($_SERVER['REQUEST_METHOD'] === "OPTIONS") {
    // Send success for preflight and exit early — avoid processing an empty body
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== "POST") {
    echo json_encode(["success"=>false, "message"=>"Invalid request method."]);
    exit;
}

require_once "../config/Database.php";

$db = new Database();
$conn = $db->connect();

$data = json_decode(file_get_contents("php://input"), true);

// Basic validation: ensure input is present and required fields exist
if (!is_array($data)) {
    echo json_encode(["success" => false, "message" => "No input provided."]);
    exit;
}

$fullname = isset($data["fullname"]) ? $conn->real_escape_string($data["fullname"]) : "";
$username = isset($data["username"]) ? $conn->real_escape_string($data["username"]) : "";
$email = isset($data["email"]) ? $conn->real_escape_string($data["email"]) : "";
$password_raw = isset($data["password"]) ? $data["password"] : "";
$role = isset($data["role"]) ? $conn->real_escape_string($data["role"]) : "";

if (trim($fullname) === "" || trim($username) === "" || trim($email) === "" || trim($password_raw) === "" || trim($role) === "") {
    echo json_encode(["success" => false, "message" => "Missing required fields."]);
    exit;
}

$password = password_hash($password_raw, PASSWORD_DEFAULT);

// Check duplicate username
$check = $conn->query("SELECT id FROM users WHERE username='$username'");

if($check->num_rows > 0){

    echo json_encode([
        "success"=>false,
        "message"=>"Username already exists."
    ]);
    exit;

}

$sql = "INSERT INTO users(fullname,username,email,password,role)
VALUES('$fullname','$username','$email','$password','$role')";

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