<?php
include 'ConnectionString.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get Student_No from the GET request (make sure it's properly sanitized and validated)
if (isset($_GET['Student_No'])) {
    $Student_No = $_GET['Student_No'];
} else {
    die("Student_No is required.");
}

date_default_timezone_set('Asia/Manila'); // Change this to your timezone
// Get the current date in 'YYYY-MM-DD' format
$currentDate = date('Y-m-d');
// Get the current time
$currentTime = date('H:i:s');

// SQL query to fetch data, excluding past dates, ordered by date and time
$sql = "SELECT rs.id, rs.dateofuse, rs.fromtime, rs.totime, rs.fullname, rs.materials, t.Transaction_status, t.Transaction_Comment
        FROM reserve_submissions AS rs
        LEFT JOIN Transactions AS t ON rs.id = t.Transaction_Reserve_id 
        WHERE Student_No = ?  
        AND (rs.dateofuse > ? OR (rs.dateofuse = ? AND rs.fromtime > ?))
        ORDER BY rs.dateofuse, rs.fromtime"; // Order by date and then by fromtime

// Prepare the SQL statement
$stmt = $conn->prepare($sql);

// Bind the Student_No parameter to the prepared statement
$stmt->bind_param("ssss", $Student_No, $currentDate, $currentDate, $currentTime);  // "s" for string parameter

// Execute the query
$stmt->execute();
$result = $stmt->get_result();

$scheduleData = [];


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
    return "$date ($toTime12hr - $fromTime12hr)";
}



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

        if ($row['Transaction_status'] == NULL) {
            $row['Transaction_status']  = 'PENDING';
        }
        $scheduleData[] = $row;
    }
}

$conn->close();

// Return data as JSON
header('Content-Type: application/json');
echo json_encode($scheduleData);
