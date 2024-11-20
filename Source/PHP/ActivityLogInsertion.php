<?php

header('Content-Type: application/json');
include 'ConnectionString.php';  // Include your database connection details

// Create a connection to the database
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the database connection
if ($conn->connect_error) {
    echo json_encode(["success" => false, "error" => "Connection failed: " . $conn->connect_error]);
    exit();
}

// Get the JSON input data from the POST request
$data = json_decode(file_get_contents('php://input'), true);

// Validate and sanitize the data
$facultyId = isset($data['faculty_id']) ? (int)$data['faculty_id'] : 0;
$logType = isset($data['log_type']) ? $data['log_type'] : '';
$logAction = isset($data['log_action']) ? $data['log_action'] : '';
$referenceId = isset($data['reference_id']) ? (int)$data['reference_id'] : 0;
$timestamp = isset($data['timestamp']) ? $data['timestamp'] : '';

if (empty($logType) || empty($logAction) || $facultyId <= 0 || $referenceId <= 0 || empty($timestamp)) {
    echo json_encode(["success" => false, "error" => "Missing required fields."]);
    exit();
}

// Insert the activity log into the database
$stmt = $conn->prepare("INSERT INTO activity_logs (faculty_id, Log_type, Log_action, Reference_id, DateAndTime) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("issis", $facultyId, $logType, $logAction, $referenceId, $timestamp);

// Execute the query and check if it was successful
if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => $stmt->error]);
}

// Close the database connection
$stmt->close();
$conn->close();
