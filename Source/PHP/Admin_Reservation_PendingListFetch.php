<?php

include 'ConnectionString.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the current date and time in 'YYYY-MM-DD HH:MM:SS' format
$currentDateTime = date('Y-m-d H:i:s');

// SQL query to fetch data, excluding past dates, ordered by date and time
$sql = "SELECT id, dateofuse, fromtime, totime, fullname, materials 
        FROM reserve_submissions 
        WHERE approved_by IS NULL AND (dateofuse > ? OR (dateofuse = ? AND fromtime >= ?))
        ORDER BY dateofuse, fromtime ASC";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $currentDateTime, $currentDateTime, $currentDateTime);
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