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

function login($username, $password)
{
    $conn = connectToDatabase();

    $table = 'users';

    $username = $conn->real_escape_string($username);

    // Fetch the hashed password from the database based on the provided username
    $query = "SELECT password FROM $table WHERE username = '$username'";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $hashedPassword = $row['password'];

        // Verify the provided password against the hashed password
        if (password_verify($password, $hashedPassword)) {
            // Valid login
            
        return true;
        }
    }
    // Invalid login
    return false;
}

// Usage example
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];

    $response = array("success" => login($username, $password));

    // Return a JSON response
    header('Content-Type: application/json');
    echo json_encode($response);
}
