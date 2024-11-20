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
$itemName = $data['item_name'];
$itemModel = $data['item_model'];
$itemCategory = $data['item_category'];
$itemQuantity = $data['item_quantity'];
$itemImage = isset($data['item_imageName']) ? $data['item_imageName'] : null;  // Get item image from JSON

// Function to sanitize filename (replace spaces with underscores)
function sanitizeFileName($filename)
{
    return str_replace(' ', '_', $filename);
}

// Check if the item already exists
$itemCheck = $conn->prepare("SELECT * FROM Items WHERE Item_Name = ? AND Item_Model = ?");
$itemCheck->bind_param("ss", $itemName, $itemModel);
$itemCheck->execute();
if ($itemCheck->get_result()->num_rows > 0) {
    echo json_encode(["success" => false, "error" => "Item already exists."]);
    exit();
}

// If image is uploaded as a file (in case the data is multipart/form-data)
$imageLocation = null;
if (isset($_FILES['item_imageName']) && $_FILES['item_imageName']['error'] == 0) {
    $targetDir = "uploads/"; // Define the directory where images will be uploaded
    $fileName = basename($_FILES['item_imageName']['name']);

    // Sanitize the file name to replace spaces with underscores
    $fileName = sanitizeFileName($fileName);

    $targetFilePath = $targetDir . $fileName;

    // Move the uploaded file to the server's folder
    if (move_uploaded_file($_FILES['item_imageName']['tmp_name'], $targetFilePath)) {
        $imageLocation = $fileName;  // Store only the sanitized filename
    } else {
        echo json_encode(["success" => false, "error" => "Error uploading the image."]);
        exit();
    }
}

// If the image is provided in the JSON data (just the image name or filename)
if ($itemImage) {
    // Sanitize the image name to replace spaces with underscores
    $itemImage = sanitizeFileName($itemImage);
    $imageLocation = $itemImage;  // Use the sanitized image name directly from the JSON
}

// Insert the new item into the database
$stmt = $conn->prepare("INSERT INTO Items (Item_Name, Item_Quantity, Item_Category, Item_Model, Item_Available, Item_Status, Item_ImageLocation) VALUES (?, ?, ?, ?, ?, ?, ?)");
$itemAvailable = $itemQuantity; // Available items are initially the quantity entered
$itemStatus = 1; // Active status

// Bind the parameters and execute the query
$stmt->bind_param("sisssis", $itemName, $itemQuantity, $itemCategory, $itemModel, $itemAvailable, $itemStatus, $imageLocation);
if ($stmt->execute()) {
    // Get the ID of the inserted item
    $lastInsertId = $conn->insert_id;
    echo json_encode(["success" => true, "item_id" => $lastInsertId]);
} else {
    echo json_encode(["success" => false, "error" => $stmt->error]);
}

// Close connections
$stmt->close();
$itemCheck->close();
$conn->close();
