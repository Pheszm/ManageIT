<?php
header('Content-Type: application/json');

include 'ConnectionString.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(['error' => 'Database connection failed: ' . $conn->connect_error]));
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE' && isset($_GET['id'])) {
    $facultyId = intval($_GET['id']);

    // Prepare the DELETE statement
    $stmt = $conn->prepare("DELETE FROM Faculty WHERE faculty_id = ?");
    $stmt->bind_param("i", $facultyId);

    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            echo json_encode(['success' => true, 'message' => 'Faculty member deleted successfully.']);
        } else {
            echo json_encode(['error' => 'No faculty member found with that ID.']);
        }
    } else {
        echo json_encode(['error' => 'Error executing query: ' . $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(['error' => 'Invalid request.']);
}

$conn->close();
