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
        $conn->close();
        return $row['username'];
    }
    $conn->close();
    return false;
}

function getID($username)
{
    $conn = connectToDatabase();
    $table = 'users';

    $query = "SELECT users_id FROM $table WHERE username = '$username'";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {

        $row = $result->fetch_assoc();
        $conn->close();
        return $row['users_id'];
    }
    $conn->close();
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
        $conn->close();
        return array();
    }

    $usernames = array();

    while ($row = $result->fetch_assoc()) {
        $usernames[] = $row['username'];
    }
    $conn->close();
    return $usernames;
}

function getFriendAdded($userId)
{
    $conn = connectToDatabase();

    $userId = $conn->real_escape_string($userId);

    // Use a prepared statement to avoid SQL injection
    $query = "SELECT request_to_id FROM friend_request WHERE request_form_id = ? AND request_status = 'Pending'";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $userId); // Assuming 'request_form_id' is an integer

    $result = $stmt->execute();

    if ($result) {
        $result = $stmt->get_result();
        $idF = array();

        while ($row = $result->fetch_assoc()) {
            $idF[] = $row['request_to_id'];
        }

        $stmt->close();
        $conn->close();
        return $idF;
    } else {
        $conn->close();
        return array();
    }
}
function getUsernamesByIDs($userIds)
{
    $conn = connectToDatabase();

    // Create a parameterized query with placeholders for user IDs
    $placeholders = implode(',', array_fill(0, count($userIds), '?'));
    $query = "SELECT username FROM users WHERE users_id IN ($placeholders)";

    $stmt = $conn->prepare($query);

    // Bind the user IDs as integer parameters
    $types = str_repeat('i', count($userIds)); // 'i' represents integer
    $stmt->bind_param($types, ...$userIds);

    $result = $stmt->execute();

    if ($result) {
        $result = $stmt->get_result();
        $usernames = array();

        while ($row = $result->fetch_assoc()) {
            $usernames[] = $row['username'];
        }

        $stmt->close();
        $conn->close();
        return $usernames;
    } else {
        $conn->close();
        return array();
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $action = $_POST['action'];

    $userId = $_POST['userId'];
    if ($action === 'getUsername') {

        $username = getUsername($userId);

        if ($username !== false) {
            $response = array("success" => true, "username" => $username);
        } else {
            $response = array("success" => false);
        }
    } else if ($action === "getFriend") {
        $response = getFriend();
    } else if ($action === "getFriendAdded") {
        $userIds = getFriendAdded($userId);

        if (empty($userIds)) {
            $response = false;
        }else{

            $response = getUsernamesByIDs($userIds);
        }
    } 
    else if ($action === "getUserID") {
        $usernameToID = $_POST['username'];
        $response = getID($usernameToID);
    }

    // Return a JSON response
    header('Content-Type: application/json');
    echo json_encode($response);
}
