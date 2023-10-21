document.addEventListener("DOMContentLoaded", function () {
  const registerButton = document.getElementById("register");
  registerButton.addEventListener("click", function () {
    validateData();
  });
});

async function callPhpMethod(method, column, data) {
  console.log("Use PHP");
  try {
    const response = await fetch("../php/Register_User.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `action=${method}&column=${column}&data=${data}`,
    });
    const result = await response.text();

    if (result === "false" || result === "true") {
      console.log("Done");
    } else {
      console.error("Unexpected response:" + result);
    }

    console.log("Use PHP result : " + result);
    return result;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

async function checkUserName(func) {
  const username = document.getElementById("username").value;
  console.log("Check User");
  if (func === 1) {
    if (username === "") {
      return false;
    }
  } else {
    const result = await callPhpMethod("Checker", "username", username);
    return result;
  }
}

function validateData() {
  // Retrieve form values
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const rePassword = document.getElementById("re-pass").value;

  var errorSet = [
    document.getElementById("erroruser"),
    document.getElementById("erroremail"),
    document.getElementById("errorpass"),
    document.getElementById("errorrepass"),
  ];

  checkUserName(1).then((isUsernameValid) => {
    errorSet[0].style.visibility = isUsernameValid ? "hidden" : "visible";
    errorSet[0].textContent = "Username missing! Let's fix that.";
    return;
  });
  checkUserName(2).then((isUsernameValid) => {
    errorSet[0].style.visibility = isUsernameValid ? "hidden" : "visible";
    errorSet[0].textContent = "This Username is already been use!";
    return;
  });
  // You can perform client-side validation here

  // if (email === "") {
  //   alert("Email is required.");
  //   return;
  // }

  // if (password === "") {
  //   alert("Password is required.");
  //   return;
  // }

  // if (password !== rePassword) {
  //   alert("Passwords do not match.");
  //   return;
  // }
}

function SendPHP() {
  // // If all validation passes, you can send the data to PHP using AJAX
  // const xhr = new XMLHttpRequest();
  // xhr.open("POST", "../php/Register_User.php", true);
  // xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  // xhr.onreadystatechange = function () {
  //     if (xhr.readyState === 4 && xhr.status === 200) {
  //         // Handle the response from PHP
  //         alert(xhr.responseText);
  //     }
  // };
  // const data = `username=${username}&email=${email}&password=${password}`;
  // xhr.send(data);
}
