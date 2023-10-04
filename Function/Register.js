document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("register").addEventListener("click", function () {
    // Get input values
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // Prepare data to send to the server
    var data = {
      username: username,
      email: email,
      password: password,
    };

    // Send a POST request to your server's /register endpoint
    fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          // Registration successful, do something (e.g., redirect to a success page)
          console.log("Registration successful!");
        } else {
          // Registration failed, show an error message
          console.error("Registration failed: " + result.message);
        }
      })
      .catch((error) => {
        
      });
  });
});
