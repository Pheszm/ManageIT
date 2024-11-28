<?php

include 'ConnectionString.php'; // Your connection settings

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the date filters
$GivenFromTime = isset($_GET['FromTime']) ? $_GET['FromTime'] : '';
$GivenToTime = isset($_GET['ToTime']) ? $_GET['ToTime'] : '';

// Base SQL query
$sql = "SELECT r.id, r.dateofuse, r.fromtime, r.totime, r.fullname, r.materials, t.Transaction_status, 
                f.faculty_full_name AS approved_by 
        FROM reserve_submissions r
        LEFT JOIN Transactions t ON r.id = t.Transaction_Reserve_id
        LEFT JOIN Faculty f ON r.approved_by = f.faculty_id";

// Array to hold the conditions
$conditions = [];
$params = [];

// Add conditions based on the FromTime and ToTime filters
if (!empty($GivenFromTime) && !empty($GivenToTime)) {
    // If both FromTime and ToTime are provided, filter by the date range
    $conditions[] = "r.dateofuse BETWEEN ? AND ?";
    $params = [$GivenFromTime, $GivenToTime];
} elseif (!empty($GivenFromTime)) {
    // If only FromTime is provided, filter from the specified date onward
    $conditions[] = "r.dateofuse >= ?";
    $params = [$GivenFromTime];
} elseif (!empty($GivenToTime)) {
    // If only ToTime is provided, filter up to the specified date
    $conditions[] = "r.dateofuse <= ?";
    $params = [$GivenToTime];
}

$conditions[] = "t.Transaction_status != 'UPCOMING'";
$conditions[] = "t.Transaction_status != 'CANCELED'";
$conditions[] = "t.Transaction_status != 'ONGOING'";
// Append the date conditions to the base query, if any
if (count($conditions) > 0) {
    $sql .= " WHERE " . implode(" AND ", $conditions);
}

// Prepare and execute the query
$stmt = $conn->prepare($sql);

// Bind parameters if there are any conditions
if (count($params) > 0) {
    $stmt->bind_param(str_repeat("s", count($params)), ...$params); // Bind all parameters (assume string type)
}

$stmt->execute();
$result = $stmt->get_result();

$scheduleData = [];

if ($result->num_rows > 0) {
    // Fetch all results into an array
    while ($row = $result->fetch_assoc()) {
        // Format the fromtime and totime in 12-hour format
        $fromTime12hr = date("g:i A", strtotime($row['fromtime']));
        $toTime12hr = date("g:i A", strtotime($row['totime']));

        // Add the formatted times to the row
        $row['fromTime12hr'] = $fromTime12hr;
        $row['toTime12hr'] = $toTime12hr;

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

// Return data as JSON
header('Content-Type: application/json');
echo json_encode($scheduleData);

// Function to parse materials and get item names
function parseMaterialsWithNames($materials, $conn)
{
    global $itemName;
    $items = [];
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
