<?php
header('Content-Type: application/json');

include 'ConnectionString.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(['error' => 'Database connection failed: ' . $conn->connect_error]));
}

if (isset($_GET['id'])) {
    $facultyId = intval($_GET['id']);
    $sql = "SELECT * FROM Faculty WHERE faculty_id = $facultyId";
    $result = $conn->query($sql);

    if ($result && $result->num_rows > 0) {
        $facultyDetails = $result->fetch_assoc();
        echo json_encode($facultyDetails);
    } else {
        echo json_encode(['error' => 'Faculty not found']);
    }
} else {
    echo json_encode(['error' => 'No faculty ID provided']);
}

$conn->close();
