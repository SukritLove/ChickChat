<?php
try {
    // Database configuration
    $host = 'localhost';
    $port = 3306;
    $dbname = 'ChickChatData';
    $db_username = 'Sukrit'; // Use a different variable name for the database username
    $db_password = 'admin435123'; // Use a different variable name for the database password

    // User registration data from POST request
    $username = $_POST['username'];
    $email = $_POST['email'];
    $user_password = $_POST['password']; // Use a different variable name for the user password

    // Create a new PDO instance for database connection
    $pdo = new PDO("mysql:host=$host;port=$port;dbname=$dbname", $db_username, $db_password);

    // Set the PDO error mode to exception
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Hash the user's password before inserting it into the database (use a strong hashing algorithm like bcrypt)
    $hashedPassword = password_hash($user_password, PASSWORD_BCRYPT);

    // Insert user data into the database
    $query = "INSERT INTO users (username, email, password) VALUES (:username, :email, :password)";
    $stmt = $pdo->prepare($query);

    // Bind parameters
    $stmt->bindParam(':username', $username, PDO::PARAM_STR);
    $stmt->bindParam(':email', $email, PDO::PARAM_STR);
    $stmt->bindParam(':password', $hashedPassword, PDO::PARAM_STR);

    // Execute the query
    $stmt->execute();

    // Close the database connection
    $pdo = null;

    echo "Registration successful! Username: $username, Email: $email";
} catch (PDOException $e) {
    // Handle database connection errors
    echo "Database error: " . $e->getMessage();
}
?>
