<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    exit();
}

require_once "../config/Database.php";

$db = new Database();
$conn = $db->connect();

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode([
        "success" => false,
        "message" => "No data received."
    ]);
    exit;
}

$category_name = trim($data["category_name"] ?? "");
$description   = trim($data["description"] ?? "");

if ($category_name === "" || $description === "") {
    echo json_encode([
        "success" => false,
        "message" => "Please fill in all fields."
    ]);
    exit;
}

$category_name = $conn->real_escape_string($category_name);
$description   = $conn->real_escape_string($description);

$sql = "INSERT INTO categories (category_name, description)
        VALUES ('$category_name', '$description')";

if ($conn->query($sql)) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode([
        "success" => false,
        "message" => $conn->error
    ]);
}