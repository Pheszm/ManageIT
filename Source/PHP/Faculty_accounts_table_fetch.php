<?php
$servername = "localhost"; // Change if needed
$username = "root"; // Change to your database username
$password = "123456"; // Change to your database password
$dbname = "manageit"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['error' => 'Connection failed: ' . $conn->connect_error]));
}

// SQL query to fetch data
$sql = "SELECT faculty_id, faculty_full_name, faculty_role, faculty_status FROM Faculty";
$result = $conn->query($sql);

$facultyList = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $facultyList[] = $row;
    }
} else {
    // Handle case where no records are found
    die(json_encode(['error' => 'No records found']));
}

// Return JSON response
header('Content-Type: application/json');
echo json_encode($facultyList);

// Close the connection
$conn->close();
