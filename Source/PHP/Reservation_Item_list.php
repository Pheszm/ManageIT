<?php
$servername = "localhost"; // Change if needed
$username = "root"; // Change to your database username
$password = "123456"; // Change to your database password
$dbname = "manageit"; // Your database name

header('Content-Type: application/json');

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Get the search term, model, and category if they exist
$searchTerm = isset($_GET['search']) ? $_GET['search'] : '';
$model = isset($_GET['model']) ? $_GET['model'] : '';
$category = isset($_GET['category']) ? $_GET['category'] : '';

// Prepare the SQL query
$sql = "SELECT Item_Id, Item_ImageLocation, Item_Name FROM Items WHERE Item_Available > 0 AND Item_Status = 1"; // Only include items with quantity > 0


if ($searchTerm) {
    $searchTerm = $conn->real_escape_string($searchTerm); // Sanitize input
    $sql .= " AND (Item_Name LIKE '%$searchTerm%' OR Item_Id LIKE '%$searchTerm%')";
}

if ($model) {
    $model = $conn->real_escape_string($model);
    $sql .= " AND Item_Model = '$model'"; // Filter by model
}

if ($category) {
    $category = $conn->real_escape_string($category);
    $sql .= " AND Item_Category = '$category'"; // Filter by category
}

// Check for available items
$sql .= " AND Item_Quantity > 0"; // Assuming you want to filter out items that are out of stock

$result = $conn->query($sql);

$items = [];
if ($result->num_rows > 0) {
    while ($item = $result->fetch_assoc()) {
        $items[] = $item;
    }
}

$conn->close();
echo json_encode($items);
