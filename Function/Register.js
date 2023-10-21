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
    console.log("PHP Return : " + result);
    if (result === "false" || result === "true") {
      return JSON.parse(result);
    } else {
      console.error("Unexpected response:" + result);
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

async function checkDataValid(column, data) {
  console.log("CheckDataValid");
  const result = await callPhpMethod("Checker", column, data);
  return result;
}

function validateData() {
  // Retrieve form values
  const username = document.getElementById("username").value,
    email = document.getElementById("email").value,
    password = document.getElementById("password").value,
    rePassword = document.getElementById("re-pass").value;

  var errorSet = [
    document.getElementById("erroruser"),
    document.getElementById("erroremail"),
    document.getElementById("errorpass"),
    document.getElementById("errorrepass"),
  ];

  checkDataValid("username", username).then((isUsernameValid) => {
    console.log(isUsernameValid);
    if (username === "") {
      errorSet[0].style.visibility = "visible";
      errorSet[0].textContent = "Username missing! Let's fix that.";
    } else if (isUsernameValid) {
      errorSet[0].style.visibility = "visible";
      errorSet[0].textContent = "This Username is already in use!";
    } else {
      setNormal("u");
    }
  });

  checkDataValid("email", email).then((isUsernameValid) => {
    console.log(isUsernameValid);
    if (email === "") {
      errorSet[1].style.visibility = "visible";
      errorSet[1].textContent = "Email missing! Let's fix that.";
    } else if (isUsernameValid) {
      errorSet[1].style.visibility = "visible";
      errorSet[1].textContent = "This Email is already in use!";
    } else {
      setNormal("e");
    }
  });

  if (password === "") {
    alert("Password is required.");
    return;
  }
  

  if (password !== rePassword) {
    alert("Passwords do not match.");
    return;
  }
}

function setNormal(func) {
  var errorSet = [
    document.getElementById("erroruser"),
    document.getElementById("erroremail"),
    document.getElementById("errorpass"),
    document.getElementById("errorrepass"),
  ];
  switch (func) {
    case "u": {
      errorSet[0].style.visibility = "hidden";
      break;
    }
    case "e": {
      errorSet[1].style.visibility = "hidden";
      break;
    }
    default: {
      break;
    }
  }
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
