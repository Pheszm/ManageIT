<?php
include 'ConnectionString.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the posted data
$data = json_decode(file_get_contents('php://input'), true);
$reservationId = $data['id'] ?? '';
$approvedBy = $data['approved_by'] ?? '';
$transactionStatus = 'UPCOMING'; // Set the default status
$transactionComment = $data['comment'] ?? null; // Optional comment
date_default_timezone_set('Asia/Manila');
$currentDateTime = date('Y-m-d H:i:s');

// Prepare the SQL statement to update the reservation
$stmt = $conn->prepare("UPDATE reserve_submissions SET approved_by = ?, Notif_Viwed = 0, When_Notif = ? WHERE id = ?");
if ($stmt === false) {
    die("Prepare failed: " . $conn->error);
}

// Bind parameters
$stmt->bind_param("isi", $approvedBy, $currentDateTime, $reservationId);

// Execute the statement
if ($stmt->execute()) {
    // Fetch the materials from the reserve_submissions table
    $stmt = $conn->prepare("SELECT materials FROM reserve_submissions WHERE id = ?");
    if ($stmt === false) {
        die("Prepare failed: " . $conn->error);
    }

    $stmt->bind_param("i", $reservationId);
    $stmt->execute();
    $stmt->bind_result($materials);
    $stmt->fetch();
    $stmt->close(); // Close the fetch statement

    // Prepare to insert into Transactions table
    $stmt = $conn->prepare("INSERT INTO Transactions (Transaction_Reserve_id, Transaction_status, Transaction_current, Transaction_Items, Transaction_Comment) VALUES (?, ?, ?, ?, ?)");
    if ($stmt === false) {
        die("Prepare failed: " . $conn->error);
    }

    $transactionCurrent = 1; // Default value as mentioned in your table structure

    // Bind parameters for the transaction insert
    $stmt->bind_param("isiss", $reservationId, $transactionStatus, $transactionCurrent, $materials, $transactionComment);

    // Execute the statement
    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => $stmt->error]);
    }
} else {
    echo json_encode(["success" => false, "error" => $stmt->error]);
}

// Close connections
$stmt->close();
$conn->close();
