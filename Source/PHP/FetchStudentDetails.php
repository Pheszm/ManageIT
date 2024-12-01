<?php

include 'ConnectionString.php';

// Get student ID from query parameters
$studentNo = isset($_GET['studentNo']) ? intval($_GET['studentNo']) : 0;

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['error' => 'Connection failed: ' . $conn->connect_error]));
}

// SQL query to fetch student details
$sql = "
    SELECT Student_No, Student_ID, Student_FullName, Student_YearOrCourse, Student_Level, Student_status
    FROM Student
    WHERE Student_No = ?
";

// Prepare statement
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $studentNo);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Fetch student data
    $student = $result->fetch_assoc();
    echo json_encode($student);
} else {
    // If no student found, return an error
    echo json_encode(['error' => 'Student not found']);
}

// Close the connection
$stmt->close();
$conn->close();

?>
