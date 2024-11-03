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
    $facultyId = $data['faculty_id'];
    $fullname = $data['fullname'];
    $email = $data['email'];
    $phone = $data['phone'];
    $username = $data['username'];
    $password = $data['password'];
    $status = $data['status'];

    // Prepare an array to hold error messages
    $errors = [];

    // Check for duplicates
    $stmtCheckFullName = $conn->prepare("SELECT faculty_id FROM Faculty WHERE faculty_full_name = ? AND faculty_id != ?");
    $stmtCheckFullName->bind_param("si", $fullname, $facultyId);
    $stmtCheckFullName->execute();
    if ($stmtCheckFullName->get_result()->num_rows > 0) {
        $errors[] = 'Full Name is already in use.';
    }

    $stmtCheckEmail = $conn->prepare("SELECT faculty_id FROM Faculty WHERE faculty_email_address = ? AND faculty_id != ?");
    $stmtCheckEmail->bind_param("si", $email, $facultyId);
    $stmtCheckEmail->execute();
    if ($stmtCheckEmail->get_result()->num_rows > 0) {
        $errors[] = 'Email is already in use.';
    }

    $stmtCheckPhone = $conn->prepare("SELECT faculty_id FROM Faculty WHERE faculty_phone_number = ? AND faculty_id != ?");
    $stmtCheckPhone->bind_param("si", $phone, $facultyId);
    $stmtCheckPhone->execute();
    if ($stmtCheckPhone->get_result()->num_rows > 0) {
        $errors[] = 'Phone number is already in use.';
    }

    $stmtCheckUsername = $conn->prepare("SELECT faculty_id FROM Faculty WHERE faculty_username = ? AND faculty_id != ?");
    $stmtCheckUsername->bind_param("si", $username, $facultyId);
    $stmtCheckUsername->execute();
    if ($stmtCheckUsername->get_result()->num_rows > 0) {
        $errors[] = 'Username is already in use.';
    }

    // If there are errors, return them
    if (!empty($errors)) {
        echo json_encode(['success' => false, 'errors' => $errors]);
        exit();
    }

    // Prepare and bind for update
    $stmt = $conn->prepare("UPDATE Faculty SET 
        faculty_full_name = ?, 
        faculty_email_address = ?, 
        faculty_phone_number = ?, 
        faculty_password = ?, 
        faculty_username = ?,  
        faculty_status = ? 
        WHERE faculty_id = ?");

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
