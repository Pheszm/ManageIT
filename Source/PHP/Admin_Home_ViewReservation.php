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
    // Remove outer quotes and backslashes
    $materials = trim($materials, '"'); // Remove leading and trailing quotes
    $materials = str_replace('\\', '', $materials); // Remove backslashes

    // Split by '},{' to get individual items
    $entries = explode('},{', $materials);

    foreach ($entries as $entry) {
        // Remove any leading/trailing spaces and unwanted characters
        $entry = trim($entry, '{}'); // Trim braces
        // Split by commas and extract Item_Id, Item_Name, and Quantity
        $parts = explode(',', $entry);
        if (count($parts) === 3) { // Ensure there are exactly 3 parts
            $quantity = trim($parts[2], '"'); // Quantity
            $itemName = trim($parts[1], '"'); // Item_Name
            $items[] = "{$quantity} {$itemName}"; // Format as "Quantity Item_Name"
        }
    }
    return $items;
}
