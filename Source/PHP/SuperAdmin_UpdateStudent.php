<?php
header('Content-Type: application/json');

// Include your database connection details
include 'ConnectionString.php';

// Create connection    
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}


// Get the JSON data from the PUT request
$inputData = json_decode(file_get_contents("php://input"), true);

// Access data
$studNO = isset($inputData['StudentNo']) ? $inputData['StudentNo'] : null;
$StudID = isset($inputData['StuID']) ? $inputData['StuID'] : null;
$FullName = isset($inputData['fullname']) ? $inputData['fullname'] : null;
$Dept = isset($inputData['dept']) ? $inputData['dept'] : null;
$Level = isset($inputData['level']) ? $inputData['level'] : null;
$Status = isset($inputData['status']) ? (int)$inputData['status'] : 1;  // Default to 1 if not set

// Check if required fields are set
if ($studNO && $StudID && $FullName && $Dept && $Level) {
    // Prepare an array to hold error messages
    $errors = [];

    // Check for duplicates based on StudentID
    $stmtCheckStudentID = $conn->prepare("SELECT Student_No FROM Student WHERE Student_ID = ? AND Student_No != ?");
    $stmtCheckStudentID->bind_param("si", $StudID, $studNO);
    $stmtCheckStudentID->execute();
    if ($stmtCheckStudentID->get_result()->num_rows > 0) {
        $errors[] = 'Student ID is already in use.';
    }

    // Check for duplicates based on FullName
    $stmtCheckFullName = $conn->prepare("SELECT Student_No FROM Student WHERE Student_FullName = ? AND Student_No != ?");
    $stmtCheckFullName->bind_param("si", $FullName, $studNO);
    $stmtCheckFullName->execute();
    if ($stmtCheckFullName->get_result()->num_rows > 0) {
        $errors[] = 'Full Name is already in use.';
    }

    // If there are errors, return them
    if (!empty($errors)) {
        echo json_encode(['success' => false, 'errors' => $errors]);
        exit();
    }

    // Prepare and bind for update
    $stmt = $conn->prepare("UPDATE Student SET 
    Student_ID = ?, 
    Student_FullName = ?, 
    Student_Department = ?, 
    Student_Level = ?, 
    Student_status = ? 
    WHERE Student_No = ?");


    // Bind the parameters (order should match placeholders in the SQL query)
    $stmt->bind_param("ssssis", $StudID, $FullName, $Dept, $Level, $Status, $studNO);

    // Execute the statement
    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => $stmt->error]);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Missing or invalid parameters']);
}

// Close connections
$stmt->close();
$conn->close();
?>
