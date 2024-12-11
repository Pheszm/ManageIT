<?php

header('Content-Type: application/json');
include 'ConnectionString.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    echo json_encode(["success" => false, "error" => "Connection failed: " . $conn->connect_error]);
    exit();  // Stop further execution if there's a connection error
}

// Get the JSON input
$data = json_decode(file_get_contents('php://input'), true);

// Check if data is valid
if (!$data) {
    echo json_encode(["success" => false, "error" => "Invalid JSON input."]);
    exit();
}

// Collect form data
$StuID = $data['StuID'];
$fullname = $data['fullname'];
$dept = $data['dept'];
$level = $data['level'];

$errors = [];

// Check for Student ID duplication
$idCheck = $conn->prepare("SELECT * FROM Student WHERE Student_ID = ?");
$idCheck->bind_param("s", $StuID);
if ($idCheck->execute()) {
    if ($idCheck->get_result()->num_rows > 0) {
        $errors['StuID'] = "Student ID already exists.";
    }
} else {
    echo json_encode(["success" => false, "error" => "Error checking Student ID."]);
    exit();
}

// Check for Full Name duplication
$nameCheck = $conn->prepare("SELECT * FROM Student WHERE Student_FullName = ?");
$nameCheck->bind_param("s", $fullname);
if ($nameCheck->execute()) {
    if ($nameCheck->get_result()->num_rows > 0) {
        $errors['fullname'] = "Name already exists.";
    }
} else {
    echo json_encode(["success" => false, "error" => "Error checking full name."]);
    exit();
}

// If there are errors, return them
if (!empty($errors)) {
    echo json_encode(["success" => false, "errors" => $errors]);
    exit();
}

// Prepare and bind for insertion
$stmt = $conn->prepare("INSERT INTO Student (Student_ID, Student_FullName, Student_Department, Student_Level) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $StuID, $fullname, $dept, $level);

// Execute the statement
if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => $stmt->error]);
}

// Close connections
$stmt->close();
$idCheck->close();
$nameCheck->close();
$conn->close();
?>
