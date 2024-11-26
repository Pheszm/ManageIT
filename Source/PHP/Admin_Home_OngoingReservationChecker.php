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
date_default_timezone_set('Asia/Manila'); // Change this to your timezone

// Get the current time
$THISTIME = date('H:i:s');

// Prepare the SQL statement to update the reservation status
$stmt = $conn->prepare("UPDATE transactions t
JOIN reserve_submissions rs ON t.Transaction_Reserve_id = rs.id
SET t.Transaction_status = ?
WHERE rs.dateofuse = ?
AND rs.fromtime < ?
AND rs.totime > ?
AND t.Transaction_status != 'RETURNED ONTIME'
AND t.Transaction_status != 'RETURNED LATE'
");

if ($stmt === false) {
    die("Prepare failed: " . $conn->error);
}

// Bind parameters to the prepared statement
$stmt->bind_param("ssss", $transactionStatus, $TODAY, $THISTIME, $THISTIME);

// Execute the statement
if ($stmt->execute()) {
    echo "Transaction status updated successfully." . $TODAY . "()" . $THISTIME;
} else {
    echo "Error updating transaction status: " . $stmt->error;
}

// Close the statement and connection
$stmt->close();
$conn->close();
