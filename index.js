const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const mysql = require("mysql2");

const { Server } = require("socket.io");
const io = new Server(server);

// Create a MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "Sukrit",
  password: "admin435123",
  database: "ChickChatData",
  port: 3306, // MySQL default port is 3306
});

// Connect to the MySQL database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

io.on("connection", (socket) => {
  console.log("a user connected");
}); 

// Serve static files for your website
app.use(express.static(__dirname + "/ChickChat.com"));

server.listen(process.env.PORT || 3000, () => {
  console.log("Server is listening on port 3000");
});
