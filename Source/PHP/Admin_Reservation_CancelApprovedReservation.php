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
    $Cancelmessage = $data['CancelMessage'];
    date_default_timezone_set('Asia/Manila');
    $currentDateTime = date('Y-m-d H:i:s');
    
    // First SQL: Update the status of the reserve_submission
    $sql1 = "UPDATE reserve_submissions SET status = 0, Notif_Viwed = 0, When_Notif = ? WHERE id = ?";
    if ($stmt1 = $conn->prepare($sql1)) {
        // Bind parameters for the first query
        $stmt1->bind_param("si", $currentDateTime, $reservation_id);

        // Execute the first query
        if ($stmt1->execute()) {
            // Success response for reserve_submissions update
            // Now execute the second query
            $sql2 = "UPDATE Transactions SET Transaction_status = 'CANCELED', Transaction_current = 0, Transaction_Comment = ? WHERE Transaction_Reserve_id = ?";
            if ($stmt2 = $conn->prepare($sql2)) {
                // Bind parameters for the second query
                $stmt2->bind_param("si", $Cancelmessage, $reservation_id);

                // Execute the second query
                if ($stmt2->execute()) {
                    // Success response
                    // Now delete rows from issued_items_date where Reservation_Id matches the reservation_id
                    $sql3 = "DELETE FROM issued_items_date WHERE Reservation_Id = ?";
                    if ($stmt3 = $conn->prepare($sql3)) {
                        // Bind parameters for the delete query
                        $stmt3->bind_param("i", $reservation_id);

                        // Execute the delete query
                        if ($stmt3->execute()) {
                            // Successfully deleted rows
                            echo json_encode(['success' => true]);
                        } else {
                            // Error response for delete query
                            echo json_encode(['success' => false, 'message' => 'Failed to delete rows from issued_items_date.']);
                        }

                        // Close the delete statement
                        $stmt3->close();
                    } else {
                        // Error in preparing the delete SQL statement
                        echo json_encode(['success' => false, 'message' => 'Failed to prepare SQL statement for deleting rows from issued_items_date.']);
                    }
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
