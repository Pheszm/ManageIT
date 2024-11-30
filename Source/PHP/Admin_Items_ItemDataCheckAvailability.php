<?php
header('Content-Type: application/json; charset=UTF-8');

// Include the database connection
include 'ConnectionString.php';

// Establish connection to the database
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve parameters from the request (GET parameters)
$itemId = intval($_GET['Item_Id']); // The Item_Id to check

date_default_timezone_set('Asia/Manila'); // Change this to your timezone
$CurrentDate = date('Y-m-d');
// Get the current time
$CurrentTime = date('H:i:s');

// Prepare the SQL query with placeholders
$sql = "SELECT Item_UseQuantity
        FROM issued_items_date 
        WHERE dateofuse = ? 
        AND Item_Id = ?
        AND (fromtime < ? AND totime > ?)";

// Prepare statement
$stmt = $conn->prepare($sql);

// Check if preparation was successful
if ($stmt === false) {
    die("Error in preparing statement: " . $conn->error);
}

// Bind parameters to the prepared statement
$stmt->bind_param("ssss", $CurrentDate, $itemId, $CurrentTime, $CurrentTime);

// Execute the query
$stmt->execute();

// Get the result
$result = $stmt->get_result();

// Initialize response variable
$Overall_Item_UseQuantity = 0; // Default value for Qnty if not found

// Accumulate the quantity values from the result set
while ($row = $result->fetch_assoc()) {
    $Overall_Item_UseQuantity += intval($row['Item_UseQuantity']);
}

// Close statement and connection
$stmt->close();
$conn->close();

// Return the quantity found, or 0 if not found
echo json_encode($Overall_Item_UseQuantity);
