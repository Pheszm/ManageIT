<?php
// Set the directory where images will be saved
$uploadDir = '../../Images_Stored/';

// Check if the upload directory exists, create it if not
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

// Function to replace spaces with underscores in filenames
function sanitizeFileName($filename)
{
    // Replace spaces with underscores
    return str_replace(' ', '_', $filename);
}

// Check if the file was uploaded successfully
if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
    $fileTmpPath = $_FILES['image']['tmp_name'];
    $fileName = $_FILES['image']['name'];  // Get the original file name
    $fileSize = $_FILES['image']['size'];
    $fileType = $_FILES['image']['type'];

    // Sanitize the filename (replace spaces with underscores)
    $sanitizedFileName = sanitizeFileName($fileName);

    // Define the full path where the image will be stored
    $destPath = $uploadDir . $sanitizedFileName;  // Use the sanitized filename

    // Check if the file already exists
    if (file_exists($destPath)) {
        // If the file already exists, do not upload the image
        echo json_encode([
            'success' => false,
            'error' => 'File already exists, upload cancelled.'
        ]);
        exit; // Stop further execution if file exists
    }

    // Move the uploaded file to the target folder
    if (move_uploaded_file($fileTmpPath, $destPath)) {
        // Return success response with the image path
        echo json_encode([
            'success' => true,
            'imagePath' => $destPath // Optionally, return the image URL or path
        ]);
    } else {
        // Return error if moving the file fails
        echo json_encode([
            'success' => false,
            'error' => 'Failed to move uploaded file.'
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'error' => 'No file uploaded or there was an upload error.'
    ]);
}
