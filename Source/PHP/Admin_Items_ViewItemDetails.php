<?php
// Include the database connection file
include 'ConnectionString.php';

// Get the item ID from the URL query parameter
$itemId = isset($_GET['id']) ? (int)$_GET['id'] : 0; // Cast to integer for safety

// Check if the item ID is valid
if ($itemId > 0) {
    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Prepare SQL query to fetch item details by item ID
    $sql = "SELECT Item_Name, Item_Model, Item_Category, Item_Quantity, Item_Available, Item_Status, Item_ImageLocation 
            FROM Items 
            WHERE Item_Id = ?";

    // Prepare statement
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $itemId); // Bind the item ID parameter to the query

    // Execute query
    $stmt->execute();

    // Store the result
    $result = $stmt->get_result();

    // Check if an item was found
    if ($result->num_rows > 0) {
        // Fetch the item details
        $item = $result->fetch_assoc();

        // Prepare the response array
        $response = [
            'Item_Name' => $item['Item_Name'],
            'Item_Model' => $item['Item_Model'],
            'Item_Category' => $item['Item_Category'],
            'Item_Quantity' => $item['Item_Quantity'],
            'Item_Available' => $item['Item_Available'],
            'Item_Status' => $item['Item_Status'],
            'Item_ImageLocation' => $item['Item_ImageLocation']
        ];

        // Send the response as JSON
        header('Content-Type: application/json');
        echo json_encode($response);
    } else {
        // If no item was found, return an empty response
        echo json_encode(['error' => 'Item not found']);
    }

    // Close the database connection
    $conn->close();
} else {
    // If no valid item ID was provided, return an error response
    echo json_encode(['error' => 'Invalid item ID']);
}
