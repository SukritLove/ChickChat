document.addEventListener("DOMContentLoaded", function () {
    const registerButton = document.getElementById("register");

    registerButton.addEventListener("click", function () {
        // Retrieve form values
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const rePassword = document.getElementById("re-pass").value;

        // You can perform client-side validation here
        if (username === "") {
            alert("Username is required.");
            return;
        }

        if (email === "") {
            alert("Email is required.");
            return;
        }

        if (password === "") {
            alert("Password is required.");
            return;
        }

        if (password !== rePassword) {
            alert("Passwords do not match.");
            return;
        }

        // If all validation passes, you can send the data to PHP using AJAX
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "register.php", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                // Handle the response from PHP
                alert(xhr.responseText);
            }
        };
        const data = `username=${username}&email=${email}&password=${password}`;
        xhr.send(data);
    });
});
