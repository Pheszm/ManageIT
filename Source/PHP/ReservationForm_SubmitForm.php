<?php

include 'ConnectionString.php';


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Collect form data
$fullname = $_POST['fullname'] ?? '';
$dateofuse = $_POST['dateofuse'] ?? '';
$fromtime = $_POST['fromtime'] ?? '';
$totime = $_POST['totime'] ?? '';
$course_year = $_POST['course_year'] ?? ''; // Update name attributes if necessary
$subject = $_POST['subject'] ?? ''; // Update name attributes if necessary
$requested_by = $_POST['requested_by'] ?? ''; // Update name attributes if necessary
$message = $_POST['Message'] ?? ''; // Message input

// Handle materials; ensure it is encoded correctly
$materials = !empty($_POST['materialz']) ? json_encode($_POST['materialz']) : json_encode([]); // Default to empty array if no materials

// Prepare the SQL statement
$stmt = $conn->prepare("INSERT INTO reserve_submissions (fullname, dateofuse, fromtime, totime, course_year, subject, requested_by, message, materials) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
if ($stmt === false) {
    die("Prepare failed: " . $conn->error);
}

// Bind parameters
$stmt->bind_param("sssssssss", $fullname, $dateofuse, $fromtime, $totime, $course_year, $subject, $requested_by, $message, $materials);

// Execute the statement
// At the end of the PHP code, after executing the statement
if ($stmt->execute()) {
    header("Location: ../PAGES/ReservationForm.php?success=1");
    exit();
} else {
    echo "Error: " . $stmt->error;
}


// Close connections
$stmt->close();
$conn->close();
