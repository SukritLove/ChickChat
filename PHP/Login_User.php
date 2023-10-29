<?php
$host = 'localhost';
$port = 3306;
$dbname = 'ChickChatData';
$db_username = 'Sukrit';
$db_password = 'admin435123';

function connectToDatabase()
{
    global $host, $port, $dbname, $db_username, $db_password;

    $conn = new mysqli($host, $db_username, $db_password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    return $conn;
}

function login($username, $password)
{
    $conn = connectToDatabase();
    $table = 'users';

    $username = $conn->real_escape_string($username);

    $query = "SELECT users_id, password FROM $table WHERE username = '$username'";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $hashedPassword = $row['password'];

        if (password_verify($password, $hashedPassword)) {
            return $row['users_id'];
        }
    }
    return false;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];

    $userId = login($username, $password);

    if ($userId !== false) {
        $response = array("success" => true, "user_id" => $userId);
    } else {
        $response = array("success" => false);
    }

    // Return a JSON response
    header('Content-Type: application/json');
    echo json_encode($response);
}
