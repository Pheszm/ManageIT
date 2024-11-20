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
$dateofuse = $_GET['dateofuse'];
$fromtime = $_GET['fromtime'];
$totime = $_GET['totime'];

// Prepare the SQL query with placeholders
$sql = "SELECT materials FROM reserve_submissions WHERE dateofuse = ? AND NOT (
    (fromtime < ? AND totime > ?) OR
    (fromtime < ? AND totime > ?) OR
    (? BETWEEN fromtime AND totime)
)";

// Prepare statement
$stmt = $conn->prepare($sql);

// Check if preparation was successful
if ($stmt === false) {
    die("Error in preparing statement: " . $conn->error);
}

// Bind parameters to the prepared statement
$stmt->bind_param("ssssss", $dateofuse, $fromtime, $totime, $fromtime, $totime, $fromtime);

// Execute the query
$stmt->execute();

// Get the result
$result = $stmt->get_result();

// Initialize response variable
$qntyFound = 0; // Default value for Qnty if not found

// Check if there are any results
if ($result->num_rows > 0) {
    // Loop through the rows to process the materials
    while ($row = $result->fetch_assoc()) {
        // Raw materials data
        $materials = $row['materials'];

        // Clean the raw materials string
        $materials = trim($materials, '"');
        $materials = str_replace('\\', '', $materials);

        // Split the materials into individual items
        $entries = explode('},{', $materials);

        // Loop through each entry to search for the item
        foreach ($entries as $entry) {
            // Clean each entry
            $entry = trim($entry, '{}');
            // Split by comma to get ItemID and Qnty
            $parts = explode('","', $entry);

            if (count($parts) === 2) {
                // Extract ItemID and Qnty using regex
                preg_match('/ItemID: (\d+)/', $parts[0], $itemMatches);
                preg_match('/Qnty: (\d+)/', $parts[1], $qtyMatches);

                if (!empty($itemMatches) && !empty($qtyMatches)) {
                    $itemID = (int) $itemMatches[1];
                    $quantity = (int) $qtyMatches[1];

                    // Check if this is the item we're looking for
                    if ($itemID == $itemId) {
                        // Set the found quantity
                        $qntyFound = $quantity;
                        break 2; // Exit both loops once the item is found
                    }
                }
            }
        }
    }
}

// Close statement and connection
$stmt->close();
$conn->close();

// Return the quantity found, or 0 if not found
echo json_encode($qntyFound);
