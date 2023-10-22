document.addEventListener("DOMContentLoaded", function () {
  const registerButton = document.getElementById("register");
  registerButton.addEventListener("click", function () {
    validateData();
  });

  // Get a reference to the password input field and the password rules box
  const passwordInput = document.getElementById("password");
  const passwordRules = document.getElementById("password-rules");

  passwordInput.addEventListener("focus", () => {
    passwordRules.style.display = "block";
  });
  // Add a blur event listener to hide the password rules box when focus is lost
  passwordInput.addEventListener("blur", () => {
    if (passwordInput.value.length === 0) {
      passwordRules.style.display = "none";
    }
  });

  passwordInput.addEventListener("input", () => {
    if (passwordInput.value.length === 0) {
      passwordRules.style.display = "none";
    } else {
      passwordRules.style.display = "block";
      CheckPasswordRules(passwordInput.value);
    }
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

  const errorSet = [
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

  CheckPassword(password, errorSet[2]);
}

function CheckPassword(pass, passErr) {
  let countCheck = 10;

  if (pass === "") {
    passErr.style.visibility = "visible";
    passErr.textContent = "Password missing! Let's fix that.";
  } else if (String(pass).length < 8) {
    passErr.style.visibility = "visible";
    passErr.textContent = "Password must be more than 8 letters.";
  } else {
    setNormal("p");
  }
}

function CheckPasswordRules(pass) {
  var letter = document.getElementById("letter"),
    upper = document.getElementById("upper"),
    lower = document.getElementById("lower"),
    number = document.getElementById("number");

  var LetterUpper = /[A-Z]/g,
    LetterLower = /[a-z]/g,
    LetterNum = /[0-9]/g;

  var setOfListText = [
    "At least 8 characters",
    "Contain at least one uppercase letter",
    "Contain at least one lowercase letter",
    "Contain at least one number",
  ];

  if (String(pass).length > 8) {
    setRuleTrueOrFalse("t", letter, 0);
  } else {
    setRuleTrueOrFalse("f", letter, 0);
  }

  if (pass.match(LetterUpper)) {
    setRuleTrueOrFalse("t", upper, 1);
  } else {
    setRuleTrueOrFalse("f", upper, 1);
  }
}
function setRuleTrueOrFalse(func, rule, msg) {
  var addElement = document.createElement("s");
  var setOfListText = [
    "At least 8 characters",
    "Contain at least one uppercase letter",
    "Contain at least one lowercase letter",
    "Contain at least one number",
  ];
  switch (func) {
    case "t": {
      addElement.textContent = setOfListText[msg];
      rule.textContent = "";
      rule.appendChild(addElement);
      rule.style.color = "var(--correct-Text)";
      break;
    }
    case "f": {
      rule.textContent = setOfListText[msg];
      rule.style.color = "var(--wrong-Text)";
      break;
    }
    default: {
      break;
    }
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
    case "p": {
      console.log("No error Found");
      errorSet[2].style.visibility = "hidden";
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
