<?php

include 'ConnectionString.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
date_default_timezone_set('Asia/Manila');
// Get the current date in 'YYYY-MM-DD' format
$currentDate = date('Y-m-d');

// SQL query to fetch data, excluding past dates, ordered by date and time
$sql = "SELECT rs.id, rs.dateofuse, rs.fromtime, rs.totime, rs.fullname, rs.materials 
        FROM reserve_submissions AS rs
        JOIN Transactions AS t ON rs.id = t.Transaction_Reserve_id 
        WHERE rs.approved_by IS NOT NULL 
        AND t.Transaction_status = 'ONGOING' 
        ORDER BY rs.dateofuse, rs.fromtime"; // Order by date and then by fromtime

$stmt = $conn->prepare($sql);
$stmt->execute();
$result = $stmt->get_result();

$scheduleData = [];

if ($result->num_rows > 0) {
    // Fetch all results into an array
    while ($row = $result->fetch_assoc()) {
        // Format the time & date
        $formattedTime = formatTimeAndDate($row['dateofuse'], $row['fromtime'], $row['totime']);
        $row['scheduled_time'] = $formattedTime;

        // Parse the materials string and fetch item names
        $items = parseMaterials($row['materials'], $conn);
        $row['materials'] = implode(", ", $items); // Join item details for display

        // Add the reservation ID to the row data
        $row['reservation_id'] = $row['id'];
        unset($row['id']); // Optionally remove the id field from the output

        $scheduleData[] = $row;
    }
}

$conn->close();

// Function to parse materials and fetch item names
function parseMaterials($materials, $conn)
{
    $items = [];
    global $itemName; // Make $itemName a global variable
    // Remove outer quotes and backslashes
    $materials = trim($materials, '"'); // Remove leading and trailing quotes
    $materials = str_replace('\\', '', $materials); // Remove backslashes

    // Split by '},{' to get individual items
    $entries = explode('},{', $materials);

    foreach ($entries as $entry) {
        // Clean each entry
        $entry = trim($entry, '{}'); // Trim braces
        // Split by ',' and extract ItemID and Qnty
        $parts = explode(',', $entry);

        if (count($parts) === 2) { // Ensure there are exactly 2 parts
            // Extract ItemID and Quantity
            preg_match('/ItemID: (\d+)/', $parts[0], $matches);
            preg_match('/Qnty: (\d+)/', $parts[1], $qtyMatches);

            $itemID = isset($matches[1]) ? $matches[1] : null;
            $quantity = isset($qtyMatches[1]) ? $qtyMatches[1] : null;

            if ($itemID && $quantity) {
                // Fetch the item name from the Items table
                $stmt = $conn->prepare("SELECT Item_Name FROM Items WHERE Item_Id = ?");
                $stmt->bind_param("i", $itemID);
                $stmt->execute();
                $stmt->bind_result($itemName);
                $stmt->fetch();
                $stmt->close();

                // Format the entry as "Quantity Item_Name"
                if ($itemName) {
                    $items[] = "{$quantity} {$itemName}";
                }
            }
        }
    }

    return $items;
}

// Function to format time and date
function formatTimeAndDate($date, $fromTime, $toTime)
{
    $fromTime12hr = date("g:i A", strtotime($fromTime));
    $toTime12hr = date("g:i A", strtotime($toTime));
    return "$date ($toTime12hr)";
}

// Return data as JSON
header('Content-Type: application/json');
echo json_encode($scheduleData);
