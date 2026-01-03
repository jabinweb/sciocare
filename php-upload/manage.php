<?php
/**
 * File Management API
 * List and delete uploaded files
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-API-Key');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Simple API key authentication
define('API_KEY', 'scio-admin-2026'); // Change this!
$providedKey = $_SERVER['HTTP_X_API_KEY'] ?? '';

if ($providedKey !== API_KEY) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit();
}

define('BASE_UPLOAD_DIR', __DIR__ . '/uploads/');

// LIST FILES
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $folder = $_GET['folder'] ?? null;
    $allFiles = [];
    
    if ($folder) {
        // List files in specific folder
        $folderPath = BASE_UPLOAD_DIR . $folder;
        if (is_dir($folderPath)) {
            $files = scandir($folderPath);
            foreach ($files as $file) {
                if ($file !== '.' && $file !== '..') {
                    $filepath = $folderPath . '/' . $file;
                    $allFiles[] = [
                        'folder' => $folder,
                        'filename' => $file,
                        'size' => filesize($filepath),
                        'modified' => filemtime($filepath),
                        'url' => 'https://' . $_SERVER['HTTP_HOST'] . '/api/uploads/' . $folder . '/' . $file
                    ];
                }
            }
        }
    } else {
        // List all folders and files
        if (is_dir(BASE_UPLOAD_DIR)) {
            $folders = scandir(BASE_UPLOAD_DIR);
            foreach ($folders as $folderName) {
                if ($folderName !== '.' && $folderName !== '..') {
                    $folderPath = BASE_UPLOAD_DIR . $folderName;
                    if (is_dir($folderPath)) {
                        $files = scandir($folderPath);
                        foreach ($files as $file) {
                            if ($file !== '.' && $file !== '..') {
                                $filepath = $folderPath . '/' . $file;
                                $allFiles[] = [
                                    'folder' => $folderName,
                                    'filename' => $file,
                                    'size' => filesize($filepath),
                                    'modified' => filemtime($filepath),
                                    'url' => 'https://' . $_SERVER['HTTP_HOST'] . '/api/uploads/' . $folderName . '/' . $file
                                ];
                            }
                        }
                    }
                }
            }
        }
    }
    
    echo json_encode([
        'success' => true,
        'files' => $allFiles,
        'count' => count($allFiles)
    ]);
    exit();
}

// DELETE FILE
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents('php://input'), true);
    $folder = $data['folder'] ?? '';
    $filename = $data['filename'] ?? '';
    
    if (empty($folder) || empty($filename)) {
        http_response_code(400);
        echo json_encode(['error' => 'Folder and filename required']);
        exit();
    }
    
    // Sanitize inputs
    $folder = preg_replace('/[^a-zA-Z0-9_-]/', '', $folder);
    $filename = basename($filename); // Prevent directory traversal
    
    $filepath = BASE_UPLOAD_DIR . $folder . '/' . $filename;
    
    if (!file_exists($filepath)) {
        http_response_code(404);
        echo json_encode(['error' => 'File not found']);
        exit();
    }
    
    if (unlink($filepath)) {
        echo json_encode(['success' => true, 'message' => 'File deleted']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to delete file']);
    }
    exit();
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
?>
