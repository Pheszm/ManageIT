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

    // First SQL: Update the status of the reserve_submission
    $sql1 = "UPDATE reserve_submissions SET status = 0 WHERE id = ?";
    if ($stmt1 = $conn->prepare($sql1)) {
        // Bind parameters for the first query
        $stmt1->bind_param("i", $reservation_id);

        // Execute the first query
        if ($stmt1->execute()) {
            // Success response for reserve_submissions update
            // Now execute the second query
            $sql2 = "UPDATE Transactions SET Transaction_status = 'CANCELED', Transaction_current = 0 WHERE Transaction_Reserve_id = ?";
            if ($stmt2 = $conn->prepare($sql2)) {
                // Bind parameters for the second query
                $stmt2->bind_param("i", $reservation_id);

                // Execute the second query
                if ($stmt2->execute()) {
                    // Success response
                    echo json_encode(['success' => true]);
                } else {
                    // Error response for Transactions update
                    echo json_encode(['success' => false, 'message' => 'Failed to update transaction status.']);
                }

                // Close the second statement
                $stmt2->close();
            } else {
                // Error in preparing the second SQL statement
                echo json_encode(['success' => false, 'message' => 'Failed to prepare second SQL statement for Transactions.']);
            }
        } else {
            // Error response for the first query (reserve_submissions)
            echo json_encode(['success' => false, 'message' => 'Failed to update reservation status.']);
        }

        // Close the first statement
        $stmt1->close();
    } else {
        // Error in preparing the first SQL statement
        echo json_encode(['success' => false, 'message' => 'Failed to prepare SQL statement for reserve_submissions.']);
    }
} else {
    // No reservation ID provided
    echo json_encode(['success' => false, 'message' => 'Reservation ID not provided.']);
}

// Close the database connection
$conn->close();
