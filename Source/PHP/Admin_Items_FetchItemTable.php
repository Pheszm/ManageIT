<?php

include 'ConnectionString.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare the search parameters
$searchTerm = isset($_GET['search']) ? $_GET['search'] : '';
$statusFilter = isset($_GET['status']) ? $_GET['status'] : '';
$modelFilter = isset($_GET['model']) ? $_GET['model'] : '';
$categoryFilter = isset($_GET['category']) ? $_GET['category'] : '';
$itemIdFilter = isset($_GET['item_id']) ? $_GET['item_id'] : null; // Item_ID filter (could be null)

// Prepare the LIKE search variables
$searchTermLike = '%' . $searchTerm . '%';
$statusFilterLike = '%' . $statusFilter . '%';
$modelFilterLike = '%' . $modelFilter . '%';
$categoryFilterLike = '%' . $categoryFilter . '%';

// Start building the SQL query
$sql = "SELECT Item_Id, Item_Name, Item_Quantity, Item_Available
        FROM Items
        WHERE Remove_Status = 0 AND Item_Name LIKE ?";

// Filter conditions
$filterConditions = [];
$filterParams = [];
$types = 's'; // The first filter is for search term

// Add item_id filter if it's not null (only when item_id is provided)
if ($itemIdFilter !== null) {
    $filterConditions[] = "Item_Id = ?";
    $filterParams[] = $itemIdFilter;
    $types .= 'i'; // Adding type for item_id (integer)
}

// Add status filter if it's not empty
if (!empty($statusFilter)) {
    $filterConditions[] = "Item_Status LIKE ?";
    $filterParams[] = $statusFilterLike;
    $types .= 's'; // Adding type for status
}

// Add model filter if it's not empty
if (!empty($modelFilter)) {
    $filterConditions[] = "Item_Model LIKE ?";
    $filterParams[] = $modelFilterLike;
    $types .= 's'; // Adding type for model
}

// Add category filter if it's not empty
if (!empty($categoryFilter)) {
    $filterConditions[] = "Item_Category LIKE ?";
    $filterParams[] = $categoryFilterLike;
    $types .= 's'; // Adding type for category
}

// Combine all conditions if there are any
if (!empty($filterConditions)) {
    $sql .= " AND " . implode(" AND ", $filterConditions);
}

// Prepare the statement
$stmt = $conn->prepare($sql);

// Combine the search term and filter params into one array
$params = array_merge([$searchTermLike], $filterParams);

// Bind the parameters dynamically
$stmt->bind_param($types, ...$params);

// Execute the query
$stmt->execute();
$result = $stmt->get_result();

$itemData = [];

if ($result->num_rows > 0) {
    // Fetch all results into an array
    while ($row = $result->fetch_assoc()) {
        // Add the Item_Id to the array so it can be used in the JavaScript
        $itemData[] = $row;
    }
}

// Close the connection
$conn->close();

// Return data as JSON
header('Content-Type: application/json');
echo json_encode($itemData);
