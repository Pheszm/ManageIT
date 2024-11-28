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

$sql = "SELECT Student_No, Student_FullName, Student_Level, Student_YearOrCourse FROM Student WHERE Student_ID = ?";
$stmt = $conn->prepare($sql);

if ($stmt === false) {
    echo json_encode(['error' => 'SQL prepare failed']);
    exit;
}

$stmt->bind_param("s", $studentID);
$stmt->execute();
$stmt->bind_result($Student_No, $Fullname, $Level, $YearCourse);

if ($stmt->fetch()) {
    // Successfully fetched the data, return as JSON
    echo json_encode([
        'Student_No' => $Student_No,
        'Fullname' => $Fullname,
        'Level' => $Level,
        'YearCourse' => $YearCourse
    ]);
} else {
    echo json_encode(['error' => 'No student found with this ID']);
}

$stmt->close();
$conn->close();
