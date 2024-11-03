<?php

header('Content-Type: application/json');
include 'ConnectionString.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    echo json_encode(["success" => false, "error" => "Connection failed: " . $conn->connect_error]);
    exit();
}

// Get the JSON input
$data = json_decode(file_get_contents('php://input'), true);

// Collect form data
$fullname = $data['fullname'];
$email = $data['email'];
$phone = $data['phone'];
$username = $data['username'];
$password = $data['password'];

$errors = [];

// Check for email duplication
$emailCheck = $conn->prepare("SELECT * FROM Faculty WHERE faculty_email_address = ?");
$emailCheck->bind_param("s", $email);
$emailCheck->execute();
if ($emailCheck->get_result()->num_rows > 0) {
    $errors['email'] = "Email already exists.";
}

// Check for phone number duplication
$phoneCheck = $conn->prepare("SELECT * FROM Faculty WHERE faculty_phone_number = ?");
$phoneCheck->bind_param("s", $phone);
$phoneCheck->execute();
if ($phoneCheck->get_result()->num_rows > 0) {
    $errors['phone'] = "Phone number already exists.";
}

// Check for username duplication
$usernameCheck = $conn->prepare("SELECT * FROM Faculty WHERE faculty_username = ?");
$usernameCheck->bind_param("s", $username);
$usernameCheck->execute();
if ($usernameCheck->get_result()->num_rows > 0) {
    $errors['username'] = "Username already exists.";
}

// Check for full name duplication
$fullnameCheck = $conn->prepare("SELECT * FROM Faculty WHERE faculty_full_name = ?");
$fullnameCheck->bind_param("s", $fullname);
$fullnameCheck->execute();
if ($fullnameCheck->get_result()->num_rows > 0) {
    $errors['fullname'] = "Full name already exists.";
}

// If there are errors, return them
if (!empty($errors)) {
    echo json_encode(["success" => false, "errors" => $errors]);
    exit();
}

// Prepare and bind for insertion
$stmt = $conn->prepare("INSERT INTO Faculty (faculty_username, faculty_full_name, faculty_email_address, faculty_phone_number, faculty_password) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $username, $fullname, $email, $phone, $password);

// Execute the statement
if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => $stmt->error]);
}

// Close connections
$stmt->close();
$emailCheck->close();
$phoneCheck->close();
$usernameCheck->close();
$fullnameCheck->close();
$conn->close();
