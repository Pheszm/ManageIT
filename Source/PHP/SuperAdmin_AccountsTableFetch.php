<?php

include 'ConnectionString.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['error' => 'Connection failed: ' . $conn->connect_error]));
}

// SQL query to fetch data
$sql = "
    SELECT faculty_id, faculty_full_name, faculty_role, faculty_status 
    FROM Faculty 
    ORDER BY faculty_status DESC, faculty_full_name ASC
";
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
