<?php
header('Content-Type: application/json');

// Include your connection settings
include 'ConnectionString.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Connection failed: ' . $conn->connect_error]));
}

// Get the current date and time parameters from the request (GET or POST)
$CurrentDate = isset($_GET['current_date']) ? $_GET['current_date'] : date('Y-m-d'); // Default to today if not provided
$CurrentTime = isset($_GET['current_time']) ? $_GET['current_time'] : date('H:i:s'); // Default to current time if not provided

// SQL to fetch the total count of items where Remove_Status = 0 and Item_Status = 1
$sql1 = "SELECT COUNT(Item_Id) AS TotalItemCount FROM Items WHERE Remove_Status = 0 AND Item_Status = 1";

// SQL to fetch the total count of pending reservations
$sql2 = "SELECT COUNT(id) AS TotalPendingReservation 
         FROM reserve_submissions 
         WHERE approved_by IS NULL 
         AND (dateofuse >= ? AND fromtime < ?) 
         AND dateofuse > ?";


// Prepare and execute the first query (items count)
$result1 = $conn->query($sql1);

// Initialize result array
$response = [];

// Check if the first query was successful and has results
if ($result1 && $result1->num_rows > 0) {
    $itemData = $result1->fetch_assoc();
    $response['TotalItemCount'] = $itemData['TotalItemCount'];
} else {
    $response['TotalItemCount'] = 0;
}

// Prepare and execute the second query (pending reservations count) using prepared statements
if ($stmt = $conn->prepare($sql2)) {
    // Bind parameters to the query
    $stmt->bind_param("sss", $CurrentDate, $CurrentTime, $CurrentTime); // Bind date and time as strings

    // Execute the query
    if ($stmt->execute()) {
        // Get the result
        $result2 = $stmt->get_result();

        // Check if the second query has results
        if ($result2 && $result2->num_rows > 0) {
            $reservationData = $result2->fetch_assoc();
            $response['TotalPendingReservation'] = $reservationData['TotalPendingReservation'];
        } else {
            $response['TotalPendingReservation'] = 0;
        }

        // Close the statement
        $stmt->close();
    } else {
        $response['TotalPendingReservation'] = 0;
    }
}

// Return the combined results as a JSON response
echo json_encode($response);

// Close the database connection
$conn->close();
