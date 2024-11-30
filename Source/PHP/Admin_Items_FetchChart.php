<?php
// Include the database connection settings
include '../PHP/ConnectionString.php';  // Your database connection settings

// Create the database connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// SQL query to fetch the top 10 most borrowed items overall
$query = "
    SELECT i.Item_Name, SUM(ii.Item_UseQuantity) AS Borrowed_Count
    FROM issued_items_date ii
    JOIN items i ON ii.Item_Id = i.Item_Id
    GROUP BY i.Item_Name
    ORDER BY Borrowed_Count DESC
    LIMIT 10
";

// Execute the query and fetch the results
$result = $conn->query($query);

// Initialize arrays to store the item names and borrowed counts
$itemNames = [];
$borrowedCounts = [];

// Fetch the data into arrays
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $itemNames[] = $row['Item_Name'];
        $borrowedCounts[] = $row['Borrowed_Count'];
    }
}

// Close the database connection
$conn->close();
