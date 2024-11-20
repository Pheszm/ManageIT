<?php

include 'ConnectionString.php'; // Include your connection string

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare the search parameters
$TypeFilter = isset($_GET['Log_type']) ? $_GET['Log_type'] : '';
$ActionFilter = isset($_GET['Log_action']) ? $_GET['Log_action'] : '';

// Prepare the LIKE search variables
$TypeFilterLike = '%' . $TypeFilter . '%';
$ActionFilterLike = '%' . $ActionFilter . '%';

// Start building the SQL query for activity_logs
$sql = "SELECT a.Log_Id, a.faculty_id, a.Log_type, a.Log_action, a.Reference_id, a.DateAndTime, f.faculty_full_name AS FacultyName ";
$sql .= "FROM activity_logs a ";
$sql .= "JOIN Faculty f ON a.faculty_id = f.faculty_id ";

// Filter conditions for Log_type and Log_action
$filterConditions = [];
$filterParams = [];
$types = ''; // We will dynamically add types depending on the filters

// Add Log_type filter if it's not empty
if (!empty($TypeFilter)) {
    $filterConditions[] = "a.Log_type LIKE ?";
    $filterParams[] = $TypeFilterLike;
    $types .= 's'; // Adding 's' for string parameter
}

// Add Log_action filter if it's not empty
if (!empty($ActionFilter)) {
    $filterConditions[] = "a.Log_action LIKE ?";
    $filterParams[] = $ActionFilterLike;
    $types .= 's'; // Adding 's' for string parameter
}

// Combine all conditions if there are any
if (!empty($filterConditions)) {
    $sql .= " WHERE " . implode(" AND ", $filterConditions);
}

// Add ORDER BY clause to sort by DateAndTime (newest first)
$sql .= " ORDER BY a.DateAndTime DESC"; // Order by DateAndTime in descending order

// Prepare the statement for activity_logs
$stmt = $conn->prepare($sql);

// Bind the parameters dynamically
if ($types) {
    $stmt->bind_param($types, ...$filterParams);
}

// Execute the query
$stmt->execute();
$result = $stmt->get_result();

$itemData = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // Get Name based on Log_type
        if ($row['Log_type'] == 'Item') {
            // Separate query to get Item Name
            $itemNameQuery = "SELECT Item_Name FROM Items WHERE Item_Id = ?";
            $itemStmt = $conn->prepare($itemNameQuery);
            $itemStmt->bind_param('i', $row['Reference_id']); // Reference_id is Item_Id for Item logs
            $itemStmt->execute();
            $itemResult = $itemStmt->get_result();
            $itemRow = $itemResult->fetch_assoc();
            $row['Item_Name'] = $itemRow ? $itemRow['Item_Name'] : 'N/A';
        } elseif ($row['Log_type'] == 'Reservation') {
            // Separate query to get Reservation Full Name
            $reservationQuery = "SELECT fullname FROM reserve_submissions WHERE id = ?";
            $reservationStmt = $conn->prepare($reservationQuery);
            $reservationStmt->bind_param('i', $row['Reference_id']); // Reference_id is id for Reservation logs
            $reservationStmt->execute();
            $reservationResult = $reservationStmt->get_result();
            $reservationRow = $reservationResult->fetch_assoc();
            $row['Reservation_FullName'] = $reservationRow ? $reservationRow['fullname'] : 'N/A';
        }

        // Add the data to the itemData array
        $itemData[] = $row;
    }
}

// Close the connection
$conn->close();

// Return data as JSON
header('Content-Type: application/json');
echo json_encode($itemData);
