<?php

// List products endpoint
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");

require_once "../config/Database.php";

$db = new Database();
$conn = $db->connect();

$sql = "SELECT
            products.id,
            products.product_name,
            categories.category_name,
            products.quantity,
            products.price,
            products.supplier
        FROM products
        LEFT JOIN categories
        ON products.category_id = categories.id
        ORDER BY products.id DESC";

$result = $conn->query($sql);

$products = [];

while ($row = $result->fetch_assoc()) {
    $products[] = $row;
}

echo json_encode($products);