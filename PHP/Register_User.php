<?php

$host = 'localhost';
$port = 3306;
$dbname = 'ChickChatData';
$db_username = 'Sukrit';
$db_password = 'admin435123';

// Function to establish a database connection
function connectToDatabase()
{
    global $host, $port, $dbname, $db_username, $db_password;

    $conn = new mysqli($host, $db_username, $db_password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    return $conn;
}


function Checker($column, $data)
{
    $conn = connectToDatabase();

    $table = 'users';

    $data = $conn->real_escape_string($data);

    $query = "SELECT * FROM $table WHERE $column = '$data'";
    $result = $conn->query($query);

    echo $result->num_rows > 0 ? "true" : "false";
}



function method2($data)
{
    // Your PHP code for method 2
    return "Method 2 called with data: " . $data;
}

// Check which method to call based on the "action" parameter
if (isset($_POST['action'])) {
    $action = $_POST['action'];
    $column = $_POST['column'];
    $data = $_POST['data'];

    if ($action === 'Checker') {
        echo Checker($column, $data);
    }
}
