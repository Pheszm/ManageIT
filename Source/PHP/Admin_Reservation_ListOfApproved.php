<?php

include 'ConnectionString.php'; // Your connection settings

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

        // Parse the materials and get item names
        $items = parseMaterialsWithNames($row['materials'], $conn);
        $row['materials'] = implode(", ", $items); // Join item details for display

        // Add the reservation ID to the row data
        $row['reservation_id'] = $row['id'];
        unset($row['id']); // Optionally remove the id field from the output

        $scheduleData[] = $row;
    }
}

$conn->close();

// Function to parse materials and get item names
function parseMaterialsWithNames($materials, $conn)
{
    $items = [];
    global $itemName;
    // Clean the string (remove leading/trailing quotes and backslashes)
    $materials = trim($materials, '"');
    $materials = str_replace('\\', '', $materials);
    // Split by material entry
    $entries = explode('},{', $materials);

    foreach ($entries as $entry) {
        // Clean each entry
        $entry = trim($entry, '{}');
        // Split by comma to get ItemID and Qnty
        $parts = explode('","', $entry);

        if (count($parts) === 2) {
            // Extract ItemID and Qnty using regex
            preg_match('/ItemID: (\d+)/', $parts[0], $itemMatches);
            preg_match('/Qnty: (\d+)/', $parts[1], $qtyMatches);

            if (!empty($itemMatches[1]) && !empty($qtyMatches[1])) {
                // Query for the Item Name from the Items table
                $itemId = $itemMatches[1];
                $query = "SELECT Item_Name FROM Items WHERE Item_Id = ?";
                $stmt = $conn->prepare($query);
                $stmt->bind_param("i", $itemId);
                $stmt->execute();
                $stmt->bind_result($itemName); // Assign itemName globally

                // Check if we fetched the item name successfully
                if ($stmt->fetch()) {
                    // Format the output
                    $items[] = "{$qtyMatches[1]} {$itemName}"; // Format as "Qnty Item Name"
                } else {
                    // If no item is found, you can either skip this item or set a default value
                    $items[] = "{$qtyMatches[1]} (Unknown Item)";
                }
                $stmt->close(); // Always close the statement after execution
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
    return "{$date} ({$fromTime12hr} - {$toTime12hr})";
}

// Return data as JSON
header('Content-Type: application/json');
echo json_encode($scheduleData);
