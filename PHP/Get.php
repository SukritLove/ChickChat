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
function getUsername($userId)
{
    $conn = connectToDatabase();
    $table = 'users';

    $userId = $conn->real_escape_string($userId);

    $query = "SELECT username FROM $table WHERE users_id = $userId";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {

        $row = $result->fetch_assoc();
        return $row['username'];
    }

    return false;
}

function getFriend()
{
    $conn = connectToDatabase();
    $table = 'users';

    $query = "SELECT username FROM $table";
    $result = $conn->query($query);
    // Check for errors
    if (!$result) {
        return array();
    }

    $usernames = array();

    while ($row = $result->fetch_assoc()) {
        $usernames[] = $row['username'];
    }

    return $usernames;
}


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $action = $_POST['action'];
    if ($action === 'getUsername') {
        $userId = $_POST['userId'];

        $username = getUsername($userId);

        if ($username !== false) {
            $response = array("success" => true, "username" => $username);
        } else {
            $response = array("success" => false);
        }
    } else if ($action === "getFriend") {
        // Handle other actions if needed
        $response = getFriend();
    }


    // Return a JSON response
    header('Content-Type: application/json');
    echo json_encode($response);
}
