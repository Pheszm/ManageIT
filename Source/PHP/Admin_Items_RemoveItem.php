<?php

header('Content-Type: application/json');
include 'ConnectionString.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    echo json_encode(["success" => false, "error" => "Connection failed: " . $conn->connect_error]);
    exit();
}

// Get JSON data from the request body
$data = json_decode(file_get_contents('php://input'), true);

// Collect item ID from JSON input
$itemId = $data['item_id'];

// Check if the item ID is valid
if (!$itemId) {
    echo json_encode(["success" => false, "error" => "Invalid item ID"]);
    exit();
}

// Prepare and execute the DELETE query
$stmt = $conn->prepare("DELETE FROM Items WHERE Item_ID = ?");
$stmt->bind_param("i", $itemId);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => $stmt->error]);
}

// Close connections
$stmt->close();
$conn->close();
