<?php
$servername = "localhost"; // Change if needed
$db_username = "root"; // Change to your database username
$db_password = "123456"; // Change to your database password
$dbname = "manageit"; // Your database name

// Create connection
$conn = new mysqli($servername, $db_username, $db_password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Collect form data
$fullname = $_POST['fullname'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$username = $_POST['username'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Hash the password

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO Faculty (faculty_username, faculty_full_name, faculty_email_address, faculty_phone_number, faculty_password) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $username, $fullname, $email, $phone, $password);

// Execute the statement
if ($stmt->execute()) {
    // Redirect to the form page with a success message
    header("Location: index.php?success=1");
    exit();
} else {
    // Redirect to the form page with an error message
    header("Location: index.php?error=" . urlencode($stmt->error));
    exit();
}

// Close connections
$stmt->close();
$conn->close();
