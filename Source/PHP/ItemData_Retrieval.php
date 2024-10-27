<?php
header('Content-Type: application/json');

$servername = "localhost"; // Change if needed
$username = "root"; // Change to your database username
$password = "123456"; // Change to your database password
$dbname = "manageit"; // Your database name

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$itemId = intval($_GET['id']);
$sql = "SELECT Item_Name, Item_Quantity, Item_Available FROM Items WHERE Item_Id = $itemId";
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    $itemData = $result->fetch_assoc();
    echo json_encode($itemData);
} else {
    echo json_encode([]);
}

$conn->close();
