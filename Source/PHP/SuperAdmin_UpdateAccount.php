<?php

header('Content-Type: application/json');

// Include your database connection details
include 'ConnectionString.php';

// Create connection    
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Get the raw POST data
$data = json_decode(file_get_contents("php://input"), true);

// Check if required fields are set
if (isset($data['faculty_id'], $data['fullname'], $data['email'], $data['phone'], $data['username'], $data['password'], $data['status'])) {
    // Collect form data
    $facultyId = $data['faculty_id']; // Add faculty_id
    $fullname = $data['fullname'];
    $email = $data['email'];
    $phone = $data['phone'];
    $username = $data['username'];
    $password = $data['password'];
    $status = $data['status'];

    // Prepare and bind
    $stmt = $conn->prepare("UPDATE Faculty SET 
        faculty_full_name = ?, 
        faculty_email_address = ?, 
        faculty_phone_number = ?, 
        faculty_password = ?, 
        faculty_username = ?,  
        faculty_status = ? 
        WHERE faculty_id = ?");

    // Adjust binding to include the username
    $stmt->bind_param("ssssssi", $fullname, $email, $phone, $password, $username, $status, $facultyId);

    // Execute the statement
    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => $stmt->error]);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid input']);
}

// Close connections
$stmt->close();
$conn->close();
