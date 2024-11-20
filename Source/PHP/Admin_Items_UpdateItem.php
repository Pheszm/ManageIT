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

// Collect form data from JSON input
$itemId = $data['item_id'];
$itemName = $data['item_name'];
$itemModel = $data['item_model'];
$itemCategory = $data['item_category'];
$itemQuantity = $data['item_quantity'];
$itemStatus = $data['item_status'];
$itemavailable = $data['item_available'];
$itemImage = isset($data['item_imageName']) ? $data['item_imageName'] : null;  // Get item image from JSON

// Function to sanitize filename (replace spaces with underscores)
function sanitizeFileName($itemImage)
{
    return str_replace(' ', '_', $itemImage);
}

if ($itemImage) {
    // Sanitize the image name to replace spaces with underscores
    $itemImage = sanitizeFileName($itemImage);
}
// Update query
$stmt = $conn->prepare("UPDATE Items SET Item_Name = ?, Item_Model = ?, Item_Category = ?, Item_Quantity = ?, Item_Available = ?, Item_Status = ?, Item_ImageLocation = ? WHERE Item_ID = ?");
$stmt->bind_param("sssiiisi", $itemName, $itemModel, $itemCategory, $itemQuantity, $itemavailable, $itemStatus, $itemImage, $itemId);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => $stmt->error]);
}

// Close connections
$stmt->close();
$conn->close();
