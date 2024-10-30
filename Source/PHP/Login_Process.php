<?php
// Connect to MySQL
include 'connection_string.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Initialize error variables and other variables
$UsernameError = $PasswordError = "";
$Username = $Password = "";
$hasError = false;

// Validate form data
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validate name
    if (empty($_POST['student_name'])) {
        $nameError = "Name is required";
        $hasError = true;
    } else {
        $name = trim($_POST['student_name']);
    }

    // Validate email
    if (empty($_POST['student_email'])) {
        $emailError = "Email is required";
        $hasError = true;
    } elseif (!filter_var($_POST['student_email'], FILTER_VALIDATE_EMAIL)) {
        $emailError = "Invalid email format";
        $hasError = true;
    } else {
        $email = trim($_POST['student_email']);
    }

    // Validate phone (10 digits)
    if (empty($_POST['student_phone'])) {
        $phoneError = "Phone number is required";
        $hasError = true;
    } elseif (!preg_match('/^\d{10}$/', $_POST['student_phone'])) {
        $phoneError = "Phone number must be exactly 10 digits";
        $hasError = true;
    } else {
        $phone = trim($_POST['student_phone']);
    }

    // Validate booking date (must be a future date)
    if (empty($_POST['student_booking_date'])) {
        $dateError = "Booking date is required";
        $hasError = true;
    } else {
        $booking_date = $_POST['student_booking_date'];
        $today = date("Y-m-d");
        if ($booking_date < $today) {
            $dateError = "Booking date must be a future date";
            $hasError = true;
        }
    }

    // Check for duplicate entries in the database
    if (!$hasError) {
        $checkDuplicate = "SELECT * FROM students WHERE student_name = '$name' AND student_email = '$email' AND student_phone = '$phone'";
        $result = $conn->query($checkDuplicate);

        if ($result->num_rows > 0) {
            $nameError = "This entry already exists!";
            $hasError = true;
        }
    }

    // If no errors, insert the data into the database
    if (!$hasError) {
        $sql = "INSERT INTO students (student_name, student_email, student_phone, student_booking_date) VALUES ('$name', '$email', '$phone', '$booking_date')";

        if ($conn->query($sql) === TRUE) {
            echo "Booking successful!";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }
}

// Close connection
$conn->close();
