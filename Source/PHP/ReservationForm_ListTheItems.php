<?php
include 'ConnectionString.php';

header('Content-Type: application/json');

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Get the search parameters from the request
$searchTerm = isset($_GET['search']) ? $_GET['search'] : '';
$model = isset($_GET['model']) ? $_GET['model'] : '';
$category = isset($_GET['category']) ? $_GET['category'] : '';
$itemId = isset($_GET['Item_Id']) ? $_GET['Item_Id'] : null;

// Start with the base SQL query
$sql = "SELECT Item_Id, Item_ImageLocation, Item_Name FROM Items WHERE Item_Available > 0 AND Item_Status = 1";

// Apply filters conditionally
if ($searchTerm) {
    $searchTerm = $conn->real_escape_string($searchTerm);  // Sanitize the input
    $sql .= " AND (Item_Name LIKE '%$searchTerm%' OR Item_Id LIKE '%$searchTerm%')";
}

if ($model) {
    $model = $conn->real_escape_string($model);  // Sanitize the input
    $sql .= " AND Item_Model = '$model'";
}

if ($category) {
    $category = $conn->real_escape_string($category);  // Sanitize the input
    $sql .= " AND Item_Category = '$category'";
}

// Only apply the Item_Id filter if it's not null
if ($itemId !== null) {
    $itemId = $conn->real_escape_string($itemId);  // Sanitize the input
    $sql .= " AND Item_Id = '$itemId'";
}

// Check for available items (assuming Item_Quantity > 0)
$sql .= " AND Item_Quantity > 0";

// Execute the query
$result = $conn->query($sql);

$items = [];
if ($result->num_rows > 0) {
    while ($item = $result->fetch_assoc()) {
        $items[] = $item;
    }
}

$conn->close();

// Output the result as a JSON response
echo json_encode($items);
