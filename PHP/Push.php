<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$host = 'localhost';
$dbname = 'ChickChatData';
$db_username = 'Sukrit';
$db_password = 'admin435123';

function connectToDatabase()
{
    global $host, $dbname, $db_username, $db_password;

    $conn = new mysqli($host, $db_username, $db_password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    return $conn;
}

function addFriend($userId, $username)
{
    $conn = connectToDatabase();
    $table = 'users';

    // Use a prepared statement to avoid SQL injection
    $query = "SELECT users_id FROM $table WHERE username = ?";
    $stmt = $conn->prepare($query);

    // Bind the username parameter
    $stmt->bind_param("s", $username);

    // Execute the query
    $stmt->execute();

    // Get the result
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $friendUserId = $row['users_id'];

        date_default_timezone_set('Asia/Bangkok');
        $timestamp = date('Y-m-d H:i:s'); // Wrap timestamp in single quotes
        $table = 'friend_request';
        $query = "INSERT INTO $table (request_form_id, request_to_id, request_status, request_datetime) VALUES (?, ?, 'Pending', ?)";
        $stmt = $conn->prepare($query);

        // Bind the user IDs and the timestamp as parameters
        $stmt->bind_param("iss", $userId, $friendUserId, $timestamp);

        if ($stmt->execute()) {
            $conn->close();
            return true;
        }
    } else {
        $conn->close();
        return false;
    }
}


function addLog($userId, $message)
{
    // Get the database connection
    $conn = connectToDatabase();

    // Check if the connection was successful
    if ($conn->connect_error) {
        $conn->close();
        return false; // Connection failed
    }
    date_default_timezone_set('Asia/Bangkok');
    $timestamp = date('Y-m-d H:i:s');

    $query = "INSERT INTO user_activity_log (user_id, action, timestamp) VALUES ($userId, '$message', '$timestamp')";

    $stmt = $conn->prepare($query);
    if (!$stmt) {
        $conn->close();
        return false; // Failed to prepare the statement
    }

    if ($stmt->execute()) {
        $stmt->close();
        $conn->close();
        return true;
    } else {
        $stmt->close();
        $conn->close();
        return false;
    }
}



if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $action = $_POST['action'];
    $userId = $_POST['userId'];
    if ($action === 'addFriend') {

        $friend = $_POST['requestTo'];
        $addFriendStatus = addFriend($userId, $friend);

        if ($addFriendStatus) {
            $response = true;
        } else {
            $response = false;
        }
    } else if ($action === 'addLog') {
        $message = $_POST['message'];
        $LogStatus = addLog($userId, $message);
        if ($LogStatus) {
            $response = true;
        } else {
            $response = false;
        }
    }

    // Return a JSON response
    header('Content-Type: application/json');
    echo json_encode($response);
}
