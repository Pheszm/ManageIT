<?php
include 'ConnectionString.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the posted data
$data = json_decode(file_get_contents('php://input'), true);
$reservationId = $data['id'] ?? '';
$approvedBy = $data['approved_by'] ?? '';

// Prepare the SQL statement to update the reservation
$stmt = $conn->prepare("UPDATE reserve_submissions SET approved_by = ? WHERE id = ?");
if ($stmt === false) {
    die("Prepare failed: " . $conn->error);
}

// Bind parameters
$stmt->bind_param("ii", $approvedBy, $reservationId);

// Execute the statement
if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => $stmt->error]);
}

// Close connections
$stmt->close();
$conn->close();
