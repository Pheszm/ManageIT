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

// Get the current date and time
date_default_timezone_set('Asia/Manila'); // Change this to your timezone
$TODAY = date('Y-m-d');
$THISTIME = date('H:i:s');

// Prepare the SQL statement to update the reservation status
$stmt = $conn->prepare("UPDATE reserve_submissions
SET status = 0
WHERE approved_by IS NULL
AND dateofuse < ? 
OR (dateofuse = ? AND totime < ?)
");

if ($stmt === false) {
    die("Prepare failed: " . $conn->error);
}

// Bind parameters to the prepared statement
$stmt->bind_param("sss", $TODAY, $TODAY, $THISTIME);

// Execute the statement
if ($stmt->execute()) {
    echo "Pending status updated successfully. " . $TODAY . " " . $THISTIME;
} else {
    echo "Error updating transaction status: " . $stmt->error;
}

// Close the statement and connection
$stmt->close();
$conn->close();
