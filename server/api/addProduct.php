<?php

// Request settings
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

// Database connection
require_once "../config/Database.php";

$db = new Database();
$conn = $db->connect();

// Get request data
$data = json_decode(file_get_contents("php://input"), true);

// Product data
$product_name = $conn->real_escape_string($data["product_name"]);
$category_id  = (int)$data["category_id"];
$quantity     = (int)$data["quantity"];
$price        = (float)$data["price"];
$supplier     = $conn->real_escape_string($data["supplier"]);

// Insert product
$sql = "INSERT INTO products
(product_name, category_id, quantity, price, supplier)
VALUES
('$product_name', $category_id, $quantity, $price, '$supplier')";

// Send response
if ($conn->query($sql)) {
    echo json_encode([
        "success" => true,
        "message" => "Product added successfully."
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => $conn->error
    ]);
}