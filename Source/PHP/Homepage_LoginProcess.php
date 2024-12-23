<?php
session_start();

include 'ConnectionString.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Database connection error.']);
    exit;
}

// Get the JSON input
$data = json_decode(file_get_contents('php://input'), true);
$username = $data['username']; // Keep the username as is
$password = $data['password']; // Keep the password as is

// Prepare and bind with BINARY to make username case-sensitive
$stmt = $conn->prepare("SELECT faculty_id, faculty_password, faculty_status, faculty_role FROM Faculty WHERE BINARY faculty_username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->store_result();

// Check if user exists
if ($stmt->num_rows > 0) {
    $stmt->bind_result($faculty_id, $stored_password, $faculty_status, $faculty_role);
    $stmt->fetch();

    // Verify the password (exact case-sensitive match)
    if ($password === $stored_password) {
        if ($faculty_status == 1) {
            // Store session data
            $_SESSION['username'] = $username;
            $_SESSION['loggedin'] = true;

            // Return success with FacultyId
            echo json_encode(['success' => true, 'facultyId' => $faculty_id, 'faculty_role' => $faculty_role]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Your account is inactive.']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Incorrect username or password.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Incorrect username or password.']);
}

$stmt->close();
$conn->close();
