<?php

require_once "config/Database.php";

$db = new Database();

$conn = $db->connect();

echo "<h1>Inventory Management API</h1>";
echo "<h3>Database Connected Successfully!</h3>";