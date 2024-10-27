<?php
$servername = "localhost"; // Change if needed
$username = "root"; // Change to your database username
$password = "123456"; // Change to your database password
$dbname = "manageit"; // Your database name

try {
    // Create connection
    $pdo = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Fetch unique models and categories from the Items table
    $modelQuery = "SELECT DISTINCT Item_Model FROM Items";
    $categoryQuery = "SELECT DISTINCT Item_Category FROM Items";

    // Fetch models
    $stmtModels = $pdo->prepare($modelQuery);
    $stmtModels->execute();
    $models = $stmtModels->fetchAll(PDO::FETCH_COLUMN);

    // Fetch categories
    $stmtCategories = $pdo->prepare($categoryQuery);
    $stmtCategories->execute();
    $categories = $stmtCategories->fetchAll(PDO::FETCH_COLUMN);

    // Prepare response
    $response = [
        'models' => array_unique($models),
        'categories' => array_unique($categories)
    ];

    header('Content-Type: application/json');
    echo json_encode($response);
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}
