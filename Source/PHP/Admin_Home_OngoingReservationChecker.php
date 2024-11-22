<?php
include 'ConnectionString.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the posted data (if any)
$data = json_decode(file_get_contents('php://input'), true);
$transactionStatus = 'ONGOING';

// Get the current date and time
$TODAY = date('Y-m-d');
$THISTIME = date('H:i:s');

// Prepare the SQL statement to update the reservation status
$stmt = $conn->prepare("UPDATE Transactions 
                        SET Transaction_status = ? 
                        WHERE Transaction_Reserve_id IN (
                            SELECT id 
                            FROM reserve_submissions 
                            WHERE dateofuse = ? 
                            AND Transaction_status != 'RETURNED'
                            AND fromtime < ? 
                            AND totime > ?
                        )");

if ($stmt === false) {
    die("Prepare failed: " . $conn->error);
}

// Bind parameters to the prepared statement
$stmt->bind_param("ssss", $transactionStatus, $TODAY, $THISTIME, $THISTIME);

// Execute the statement
if ($stmt->execute()) {
    echo "Transaction status updated successfully.";
} else {
    echo "Error updating transaction status: " . $stmt->error;
}

// Close the statement and connection
$stmt->close();
$conn->close();
