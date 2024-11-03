<?php

include 'ConnectionString.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare search parameters
$searchTerm = isset($_GET['search']) ? $_GET['search'] : '';
$statusFilter = isset($_GET['status']) ? $_GET['status'] : '';

// SQL query to fetch data, with JOIN to the Transactions table
$sql = "SELECT r.id, r.dateofuse, r.fromtime, r.totime, r.fullname, r.materials, t.Transaction_status 
        FROM reserve_submissions r
        LEFT JOIN Transactions t ON r.id = t.Transaction_Reserve_id
        WHERE r.approved_by IS NOT NULL 
        AND r.fullname LIKE ? 
        AND (t.Transaction_status LIKE ? OR t.Transaction_status IS NULL)
        ORDER BY r.dateofuse, r.fromtime";

$stmt = $conn->prepare($sql);
$searchTermLike = '%' . $searchTerm . '%';
$statusFilterLike = '%' . $statusFilter . '%';
$stmt->bind_param("ss", $searchTermLike, $statusFilterLike);
$stmt->execute();
$result = $stmt->get_result();

$scheduleData = [];

if ($result->num_rows > 0) {
    // Fetch all results into an array
    while ($row = $result->fetch_assoc()) {
        // Format the time & date
        $formattedTime = formatTimeAndDate($row['dateofuse'], $row['fromtime'], $row['totime']);
        $row['scheduled_time'] = $formattedTime;

        // Parse the materials string
        $items = parseMaterials($row['materials']);
        $row['materials'] = implode(", ", $items); // Join item details for display

        // Add the reservation ID to the row data
        $row['reservation_id'] = $row['id'];
        unset($row['id']); // Optionally remove the id field from the output

        $scheduleData[] = $row;
    }
}

$conn->close();

// Function to parse materials
function parseMaterials($materials)
{
    $items = [];
    $materials = trim($materials, '"'); // Remove leading and trailing quotes
    $materials = str_replace('\\', '', $materials); // Remove backslashes
    $entries = explode('},{', $materials);

    foreach ($entries as $entry) {
        $entry = trim($entry, '{}'); // Trim braces
        $parts = explode(',', $entry);
        if (count($parts) === 3) {
            $quantity = trim($parts[2], '"'); // Quantity
            $itemName = trim($parts[1], '"'); // Item_Name
            $items[] = "{$quantity} {$itemName}"; // Format as "Quantity Item_Name"
        }
    }
    return $items;
}

// Function to format time and date
function formatTimeAndDate($date, $fromTime, $toTime)
{
    $fromTime12hr = date("g:i A", strtotime($fromTime));
    $toTime12hr = date("g:i A", strtotime($toTime));
    return "{$date} ({$fromTime12hr} - {$toTime12hr})";
}

// Return data as JSON
header('Content-Type: application/json');
echo json_encode($scheduleData);
