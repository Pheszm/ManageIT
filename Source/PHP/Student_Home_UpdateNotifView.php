<?php
header('Content-Type: application/json; charset=UTF-8');

// Include the database connection
include 'ConnectionString.php';

// Establish connection to the database
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed: " . $conn->connect_error]));
}

// Get the data from the request body (JSON)
$data = json_decode(file_get_contents('php://input'), true);
$reservationId = $data['id'] ?? '';  // Use the id from the request

if ($reservationId) {
    // Query to update notification view status
    $sql = "UPDATE reserve_submissions SET Notif_Viwed = 1 WHERE id = ?";

    // Prepare the statement
    $stmt = $conn->prepare($sql);

    // Check if the preparation was successful
    if ($stmt === false) {
        die(json_encode(["error" => "Error preparing statement: " . $conn->error]));
    }

    // Bind the reservation ID to the prepared statement
    $stmt->bind_param("i", $reservationId);  // 'i' for integer

    // Execute the query
    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["error" => "Error executing query: " . $stmt->error]);
    }

    // Close the statement
    $stmt->close();
} else {
    echo json_encode(["error" => "No reservation ID provided"]);
}

// Close the connection
$conn->close();
?>
