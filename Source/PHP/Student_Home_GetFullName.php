<?php
// get_student.php
header('Content-Type: application/json');
include 'ConnectionString.php';

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(['error' => 'Connection failed']);
    exit;
}

$studentID = $_POST['Student_ID']; // Get the Student_ID from POST

if (empty($studentID)) {
    echo json_encode(['error' => 'Student_ID missing']);
    exit;
}

$sql = "SELECT Student_No, Student_FullName FROM Student WHERE Student_ID = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $studentID);
$stmt->execute();
$stmt->bind_result($Student_No, $fullName);
$stmt->fetch();


echo json_encode([
    'Student_No' => $Student_No,
    'Name' => $fullName
]);

$stmt->close();
$conn->close();
