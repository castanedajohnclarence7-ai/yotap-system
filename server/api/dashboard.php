<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once "../config/Database.php";

$db = new Database();
$conn = $db->connect();

$response = [];

/* ---------- Dashboard Cards ---------- */

// Total Products
$result = $conn->query("SELECT COUNT(*) AS total FROM products");
$response["products"] = $result->fetch_assoc()["total"];

// Total Categories
$result = $conn->query("SELECT COUNT(*) AS total FROM categories");
$response["categories"] = $result->fetch_assoc()["total"];

// Total Users
$result = $conn->query("SELECT COUNT(*) AS total FROM users");
$response["users"] = $result->fetch_assoc()["total"];

// Low Stock (10 or below)
$result = $conn->query("SELECT COUNT(*) AS total FROM products WHERE quantity <= 10");
$response["lowStock"] = $result->fetch_assoc()["total"];


/* ---------- Recent Products ---------- */

$recentProducts = [];

$sql = "
SELECT
    products.id,
    products.product_name,
    categories.category_name,
    products.quantity
FROM products
LEFT JOIN categories
ON products.category_id = categories.id
ORDER BY products.id DESC
LIMIT 5
";

$result = $conn->query($sql);

while ($row = $result->fetch_assoc()) {
    $recentProducts[] = $row;
}

$response["recentProducts"] = $recentProducts;


/* ---------- Return JSON ---------- */

echo json_encode($response);