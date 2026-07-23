<?php

// Register user endpoint
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

$data = json_decode(file_get_contents("php://input"), true);

if (
    empty($data["fullname"]) ||
    empty($data["username"]) ||
    empty($data["email"]) ||
    empty($data["password"])
) {
    echo json_encode([
        "success" => false,
        "message" => "Please fill in all fields."
    ]);
    exit();
}

$fullname = $conn->real_escape_string(trim($data["fullname"]));
$username = $conn->real_escape_string(trim($data["username"]));
$email = $conn->real_escape_string(trim($data["email"]));
$password = password_hash($data["password"], PASSWORD_DEFAULT);

/* Always register as Staff */
$role = "Staff";

$check = $conn->query("
    SELECT id
    FROM users
    WHERE username='$username'
       OR email='$email'
");

if ($check->num_rows > 0) {

    echo json_encode([
        "success" => false,
        "message" => "Username or Email already exists."
    ]);

    exit();
}

$sql = "
INSERT INTO users
(
    fullname,
    username,
    email,
    password,
    role
)
VALUES
(
    '$fullname',
    '$username',
    '$email',
    '$password',
    '$role'
)
";

if ($conn->query($sql)) {

    echo json_encode([
        "success" => true,
        "message" => "Registration successful."
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => $conn->error
    ]);

}