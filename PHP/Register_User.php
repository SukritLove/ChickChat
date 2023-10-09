<?php
try {
    // Database configuration
    $host = 'localhost';
    $port = 3306;
    $dbname = 'ChickChatData';
    $username = 'Sukrit';
    $password = 'admin435123';

    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Create a new PDO instance
    $pdo = new PDO("mysql:host=$host;port=$port;dbname=$dbname", $username, $password);

    // Set the PDO error mode to exception
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Insert user data into the database
    $query = "INSERT INTO users (username, email, password) VALUES (:username, :email, :password)";
    $stmt = $pdo->prepare($query);

    // Hash the password before inserting it into the database (use a strong hashing algorithm like bcrypt)
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

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
