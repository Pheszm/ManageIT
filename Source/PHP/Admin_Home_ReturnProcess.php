<?php
// Include your connection settings
include 'ConnectionString.php'; // Your connection settings

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Connection failed: ' . $conn->connect_error]));
}

// Get the JSON data from the request
$data = json_decode(file_get_contents("php://input"), true);

// Check if reservation_id is set
if (isset($data['reservation_id'])) {
    $reservation_id = $data['reservation_id'];
    $CurrentTime = $data['Current_time'];
    // Prepare the SQL statement
    $sql = "UPDATE Transactions SET Transaction_status = 'RETURNED', Transaction_current = 0, Transaction_ReturnedTime = ? 
            WHERE Transaction_Reserve_id = ?";

    // Prepare and execute the statement
    if ($stmt = $conn->prepare($sql)) {
        // Bind parameters
        $stmt->bind_param("si", $CurrentTime, $reservation_id); // Assuming Transaction_Reserve_id is an integer

        // Execute the statement
        if ($stmt->execute()) {
            // Success response
            echo json_encode(['success' => true]);
        } else {
            // Error response
            echo json_encode(['success' => false, 'message' => 'Failed to update transaction status.']);
        }

        // Close the statement
        $stmt->close();
    } else {
        // Error in preparing statement
        echo json_encode(['success' => false, 'message' => 'Failed to prepare SQL statement.']);
    }
} else {
    // No reservation ID provided
    echo json_encode(['success' => false, 'message' => 'Reservation ID not provided.']);
}

// Close the database connection
$conn->close();
