<?php
include 'ConnectionString.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$reservationId = $_GET['id'];

// Prepare and execute the SQL statement with a JOIN
$sql = "SELECT rs.fullname, rs.course_year, rs.subject, rs.materials, 
               rs.requested_by, rs.dateofuse, rs.fromtime, rs.totime, 
               rs.message, f.faculty_full_name AS approved_by_name 
        FROM reserve_submissions rs 
        LEFT JOIN Faculty f ON rs.approved_by = f.faculty_id 
        WHERE rs.id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $reservationId);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Fetch the data
    $data = $result->fetch_assoc();

    // Parse and format the materials
    $data['materials'] = implode(", ", parseMaterials($data['materials']));

    // Include the faculty name in the response
    echo json_encode($data);
} else {
    echo json_encode(["error" => "No reservation found."]);
}

$stmt->close();
$conn->close();

// Function to parse materials
function parseMaterials($materials)
{
    $items = [];
    $materials = trim($materials, '"');
    $materials = str_replace('\\', '', $materials);
    $entries = explode('},{', $materials);

    foreach ($entries as $entry) {
        $entry = trim($entry, '{}');
        $parts = explode(',', $entry);
        if (count($parts) === 3) {
            $quantity = trim($parts[2], '"');
            $itemName = trim($parts[1], '"');
            $items[] = "{$quantity} {$itemName}";
        }
    }
    return $items;
}
