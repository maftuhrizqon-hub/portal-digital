<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Hapus di produksi untuk keamanan
header('Access-Control-Allow-Methods: POST, GET');
header('Access-Control-Allow-Headers: Content-Type');

$servername = "localhost";
$username = "root"; // Ganti dengan username DB Anda
$password = "1"; // Ganti dengan password DB Anda
$dbname = "akademi_kebijakan";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['error' => 'Connection failed: ' . $conn->connect_error]));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $role = $_POST['role'];
    $text = $_POST['text'];
    $file_data = $_POST['file_data'] ?? '';
    $file_name = $_POST['file_name'] ?? '';

    $stmt = $conn->prepare("INSERT INTO kebijakan (role, text, file_data, file_name) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $role, $text, $file_data, $file_name);
    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['error' => 'Failed to save']);
    }
    $stmt->close();
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $role = $_GET['role'] ?? '';
    if ($role) {
        $stmt = $conn->prepare("SELECT text, file_data, file_name FROM kebijakan WHERE role = ? ORDER BY created_at DESC LIMIT 1");
        $stmt->bind_param("s", $role);
        $stmt->execute();
        $stmt->bind_result($text, $file_data, $file_name);
        if ($stmt->fetch()) {
            echo json_encode(['text' => $text, 'file_data' => $file_data, 'file_name' => $file_name]);
        } else {
            echo json_encode(['error' => 'No data']);
        }
        $stmt->close();
    } else {
        echo json_encode(['error' => 'Role required']);
    }
}

$conn->close();
?>