<?php
header('Content-Type: application/json; charset=UTF-8');

// Include the database connection
include 'ConnectionString.php';

// Establish connection to the database
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    echo json_encode(["error" => "Database connection failed: " . $conn->connect_error]);
    exit();
}

// Retrieve JSON input and decode
$input = file_get_contents('php://input');
$data = json_decode($input, true);

$StuNO = $data['StudentNO'] ?? '';

if (empty($StuNO)) {
    echo json_encode(["error" => "StudentNO is required."]);
    exit();
}

// Use prepared statements for security
$sql = "SELECT 
            rs.id, 
            rs.fullname, 
            rs.dateofuse, 
            rs.fromtime, 
            rs.totime, 
            rs.materials, 
            rs.message, 
            rs.approved_by,
            rs.When_Notif,
            rs.Notif_Viwed,
            t.Transaction_status, 
            f.faculty_full_name 
        FROM reserve_submissions rs
        RIGHT JOIN Transactions t ON rs.id = t.Transaction_Reserve_id
        LEFT JOIN Faculty f ON rs.approved_by = f.faculty_id
        WHERE rs.Student_No = ?
        ORDER BY rs.When_Notif DESC";

$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(["error" => "Error preparing statement: " . $conn->error]);
    exit();
}

$stmt->bind_param("s", $StuNO);
$stmt->execute();
$result = $stmt->get_result();

if ($result === false) {
    echo json_encode(["error" => "Error executing query: " . $stmt->error]);
    exit();
}

// Fetch results as an array
$notifications = [];
while ($row = $result->fetch_assoc()) {
    $notifications[] = $row;
}

// Output notifications as JSON
echo json_encode($notifications);

// Close resources
$stmt->close();
$conn->close();
?>
