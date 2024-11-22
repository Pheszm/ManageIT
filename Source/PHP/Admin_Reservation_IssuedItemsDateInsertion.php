<?php
include 'ConnectionString.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the reservation ID from the URL parameter
$reservationId = $_GET['id'] ?? '';  // Reservation ID passed via URL (e.g., script.php?id=123)

if (empty($reservationId)) {
    echo json_encode(["success" => false, "error" => "Reservation ID is required."]);
    exit;
}

// Fetch the materials, dateofuse, fromtime, and totime for the given reservation ID from the reserve_submissions table
$stmt = $conn->prepare("SELECT materials, dateofuse, fromtime, totime FROM reserve_submissions WHERE id = ?");
$stmt->bind_param("i", $reservationId);
$stmt->execute();
$stmt->bind_result($materials, $dateofuse, $fromtime, $totime);
$stmt->fetch();
$stmt->close();

// Check if materials exist for the given reservation ID
if (empty($materials)) {
    echo json_encode(["success" => false, "error" => "No materials found for this reservation."]);
    exit;
}

// Check if dateofuse, fromtime, and totime are valid
if (empty($dateofuse) || empty($fromtime) || empty($totime)) {
    echo json_encode(["success" => false, "error" => "Date and time information is incomplete for this reservation."]);
    exit;
}

// Function to parse and return item names with quantities
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
                $stmt->bind_result($itemName);

                // Check if we fetched the item name successfully
                if ($stmt->fetch()) {
                    // Add to items array
                    $items[] = ['ItemID' => $itemId, 'ItemName' => $itemName, 'Quantity' => $qtyMatches[1]];
                } else {
                    // If no item is found, you can either skip this item or set a default value
                    $items[] = ['ItemID' => $itemId, 'ItemName' => '(Unknown Item)', 'Quantity' => $qtyMatches[1]];
                }
                $stmt->close();
            }
        }
    }
    return $items;
}

// Parse materials to get item details
$materialArray = parseMaterialsWithNames($materials, $conn);

// Now insert the items into the issued_items_date table
foreach ($materialArray as $material) {
    $itemId = $material['ItemID'];
    $itemQuantity = $material['Quantity'];

    // Prepare to insert into the issued_items_date table
    $stmt = $conn->prepare("INSERT INTO issued_items_date (Reservation_Id, Item_Id, Item_UseQuantity, dateofuse, fromtime, totime) VALUES (?, ?, ?, ?, ?, ?)");
    if ($stmt === false) {
        die("Prepare failed: " . $conn->error);
    }

    // Bind parameters for the issued items insert
    $stmt->bind_param("iiisss", $reservationId, $itemId, $itemQuantity, $dateofuse, $fromtime, $totime);

    // Execute the statement for issued items
    if (!$stmt->execute()) {
        echo json_encode(["success" => false, "error" => $stmt->error]);
        break;  // Exit the loop on error
    }

    // Close the statement after execution
    $stmt->close();
}

// Return success if all items were inserted
echo json_encode(["success" => true]);

// Close the connection after all operations are complete
$conn->close();
