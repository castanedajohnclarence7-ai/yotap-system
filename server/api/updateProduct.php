<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

require_once "../config/Database.php";

$db = new Database();
$conn = $db->connect();

$data = json_decode(file_get_contents("php://input"), true);

$id = (int)$data["id"];
$product_name = $conn->real_escape_string($data["product_name"]);
$category_id = (int)$data["category_id"];
$quantity = (int)$data["quantity"];
$price = (float)$data["price"];
$supplier = $conn->real_escape_string($data["supplier"]);

$sql = "UPDATE products SET
        product_name='$product_name',
        category_id=$category_id,
        quantity=$quantity,
        price=$price,
        supplier='$supplier'
        WHERE id=$id";

if ($conn->query($sql)) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode([
        "success" => false,
        "message" => $conn->error
    ]);
}