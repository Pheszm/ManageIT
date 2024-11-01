<?php

header('Content-Type: application/json');

include 'ConnectionString.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}


// Collect form data
$fullname = $_POST['fullname'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$username = $_POST['username'];
$password = $_POST['password'];

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO Faculty (faculty_username, faculty_full_name, faculty_email_address, faculty_phone_number, faculty_password) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $username, $fullname, $email, $phone, $password);

// Execute the statement
if ($stmt->execute()) {
    // Redirect to the form page with a success message
    header("Location: ../../admin?success=1");
    exit();
} else {
    // Redirect to the form page with an error message
    header("Location: ../../admin?error=" . urlencode($stmt->error));
    exit();
}

// Close connections
$stmt->close();
$conn->close();
