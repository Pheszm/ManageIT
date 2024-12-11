<?php
// Include the database connection string
include 'ConnectionString.php';

// Get the student ID from the POST request
$data = json_decode(file_get_contents("php://input"), true);
$StudentID = $data['student_id'];

// Create connection to the database
$conn = new mysqli($servername, $username, $password, $dbname);

// Check if connection was successful
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare the SQL query to fetch student details based on Student_ID
$sql = "SELECT * FROM Student WHERE Student_ID = ? AND Student_status = 1";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $StudentID);  // 's' denotes string data type

// Execute the query
$stmt->execute();
$result = $stmt->get_result();

// Check if a student record was found
if ($result->num_rows > 0) {
    // Student found, send success response
    $student = $result->fetch_assoc();
    $response = [
        'success' => true,
        'message' => 'Login successful',
        'student_data' => $student
    ];
} else {
    // No student found, send failure response
    $response = [
        'success' => false,
        'message' => 'Invalid Student ID or Inactive Account'
    ];
}

// Close the connection
$stmt->close();
$conn->close();

// Return the response as JSON
echo json_encode($response);
