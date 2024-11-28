<?php
include 'ConnectionString.php'; // Your connection settings

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$reservationId = $_GET['id'];

// Prepare and execute the SQL statement with JOINs to get the materials' Item Names
$sql = "SELECT rs.fullname, rs.course_year, rs.subject, rs.materials, 
               rs.requested_by, rs.dateofuse, rs.fromtime, rs.totime, 
               rs.message, f.faculty_full_name AS approved_by_name,
               t.Transaction_status, t.Transaction_ReturnedTime, t.Transaction_Comment
        FROM reserve_submissions rs 
        LEFT JOIN Faculty f ON rs.approved_by = f.faculty_id 
        LEFT JOIN Transactions t ON rs.id = t.Transaction_Reserve_id 
        WHERE rs.id = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $reservationId);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Fetch the data
    $data = $result->fetch_assoc();

    // Parse and format the materials (fetch Item names from the result)
    $data['materials'] = implode(", ", parseMaterialsWithNames($data['materials'], $conn));

    // Include the faculty name in the response
    echo json_encode($data);
} else {
    echo json_encode(["error" => "No reservation found."]);
}

$stmt->close();
$conn->close();

// Function to parse and return item names with quantities
function parseMaterialsWithNames($materials, $conn)
{
    global $itemName; // Make $itemName a global variable
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
