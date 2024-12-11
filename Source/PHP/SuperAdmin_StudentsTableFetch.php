<?php

include 'ConnectionString.php';

// Get the search term from the query string
$searchTerm = isset($_GET['search']) ? $_GET['search'] : '';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['error' => 'Connection failed: ' . $conn->connect_error]));
}

// Prepare SQL query with search functionality
$sql = "
    SELECT Student_No, Student_ID, Student_FullName, Student_Department, Student_Level, Student_status
    FROM Student
    WHERE 
        Student_ID LIKE ? OR 
        Student_FullName LIKE ? OR
        Student_Department LIKE ? OR
        Student_Level LIKE ?
    ORDER BY Student_status DESC, Student_FullName ASC
";

// Prepare statement
$stmt = $conn->prepare($sql);

// Bind parameters (use % for wildcard search)
$searchTermParam = '%' . $searchTerm . '%';
$stmt->bind_param("ssss", $searchTermParam, $searchTermParam, $searchTermParam, $searchTermParam);
$stmt->execute();
$result = $stmt->get_result();

$studentList = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $studentList[] = $row;
    }
} else {
    // Handle case where no records are found
    echo json_encode([]);
    exit;
}

// Return JSON response
header('Content-Type: application/json');
echo json_encode($studentList);

// Close the connection
$stmt->close();
$conn->close();

?>
