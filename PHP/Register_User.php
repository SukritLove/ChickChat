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

function insertData($username, $email, $password)
{
    $conn = connectToDatabase();
    $table = 'users';
    $username = $conn->real_escape_string($username);
    $email = $conn->real_escape_string($email);

    // Hash the password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $query = "INSERT INTO $table (username, email, password) VALUES ('$username', '$email', '$hashedPassword')";

    if ($conn->query($query) === TRUE) {
        echo "Data inserted successfully";
    } else {
        echo "Error: " . $query . "<br>" . $conn->error;
    }

    $conn->close();
}

// Check which method to call based on the "action" parameter
if (isset($_POST['action'])) {
    $action = $_POST['action'];

    if ($action === 'Checker') {
        if (isset($_POST['column']) && isset($_POST['data'])) {
            $column = $_POST['column'];
            $data = $_POST['data'];
            Checker($column, $data);
        } else {
            echo "Missing column or data in POST request";
        }
    } elseif ($action === 'InsertData') {
        if (isset($_POST['username']) && isset($_POST['email']) && isset($_POST['password'])) {
            $username = $_POST['username'];
            $email = $_POST['email'];
            $password = $_POST['password'];
            insertData($username, $email, $password);
        } else {
            echo "Missing username, email, or password in POST request";
        }
    }
}
