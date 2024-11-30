<?php
// Include your connection settings
include 'ConnectionString.php'; // Your connection settings

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Connection failed: ' . $conn->connect_error]));
}

// Get the raw JSON data from the request
$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

// Check if JSON was decoded successfully
if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(['success' => false, 'message' => 'Invalid JSON: ' . json_last_error_msg()]);
    exit;
}

// Check if reservation_id is set
if (isset($data['reservation_id'])) {
    $reservation_id = $data['reservation_id'];

    date_default_timezone_set('Asia/Manila'); // Change this to your timezone
    // Get the current date in 'YYYY-MM-DD' format
    $CurrentDay = date('Y-m-d');
    // Get the current time
    $CurrentTime = date('H:i:s');


    // Prepare the SQL statement to get dateofuse and totime
    $sql = "SELECT dateofuse, totime FROM reserve_submissions WHERE id = ?";
    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("s", $reservation_id);

        // Execute and fetch the result
        if ($stmt->execute()) {
            $stmt->store_result();
            $stmt->bind_result($dateofuse, $totime);
            $stmt->fetch();

            // If the result doesn't exist
            if (empty($dateofuse) || empty($totime)) {
                echo json_encode(['success' => false, 'message' => 'No matching reservation found.']);
                $stmt->close();
                $conn->close();
                exit;
            }

            // Determine the status
            if ($dateofuse > $CurrentDay || ($dateofuse = $CurrentDay && $totime > $CurrentTime)) {
                $StatusInReturning = 'RETURNED ONTIME';
            } else {
                $StatusInReturning = 'RETURNED LATE';
            }

            // Prepare the SQL statement for the update
            $update_sql = "UPDATE transactions SET Transaction_status = ?, Transaction_current = 0, Transaction_ReturnedTime = ? WHERE Transaction_Reserve_id = ?";

            // Create a new statement for the update query
            if ($update_stmt = $conn->prepare($update_sql)) {
                // Bind parameters and execute the update
                $update_stmt->bind_param("ssi", $StatusInReturning, $CurrentTime, $reservation_id);

                if ($update_stmt->execute()) {
                    // Success response
                    echo json_encode(['success' => true]);
                } else {
                    // Error response
                    echo json_encode(['success' => false, 'message' => 'Failed to update transaction status.']);
                }

                // Close the statement for the update
                $update_stmt->close();
            } else {
                // Error in preparing update SQL statement
                echo json_encode(['success' => false, 'message' => 'Failed to prepare update SQL statement.']);
            }
        } else {
            // Error executing select query
            echo json_encode(['success' => false, 'message' => 'Failed to execute select query.']);
        }

        // Close the statement for the select
        $stmt->close();
    } else {
        // Error preparing select statement
        echo json_encode(['success' => false, 'message' => 'Failed to prepare SQL statement.']);
    }
} else {
    // No reservation ID provided
    echo json_encode(['success' => false, 'message' => 'Reservation ID not provided.']);
}

// Close the database connection
$conn->close();
