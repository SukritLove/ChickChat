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
      CheckPasswordRules(passwordInput.value);
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

function checkUsernameAndEmail(column, data, errorSet, func) {
  let msg = ["", ""];
  switch (func) {
    case "u": {
      msg[0] = "Username missing! Let's fix that.";
      msg[1] = "This Username is already in use!";
      break;
    }
    case "e": {
      msg[0] = "Email missing! Let's fix that.";
      msg[1] = "This Email is already in use!";
      break;
    }
    default: {
      console.log("Invalid function in [checkUsernameAndEmail]");
      break;
    }
  }

  checkDataValid(column, data).then((isDataValid) => {
    console.log(isDataValid);
    if (data === "") {
      errorSet.style.visibility = "visible";
      errorSet.textContent = msg[0];
    } else if (isDataValid) {
      errorSet.style.visibility = "visible";
      errorSet.textContent = msg[1];
    } else {
      setNormal(func);
    }
  });
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

  checkUsernameAndEmail("username", username, errorSet[0], "u");
  checkUsernameAndEmail("email", email, errorSet[1], "e");
  CheckPassword(password, errorSet[2]);
  CheckRePassword(password, rePassword, errorSet[3]);
}

function CheckRePassword(pass, repass, repassErr) {
  if (repass === "") {
    repassErr.style.visibility = "visible";
    repassErr.textContent = "Re-enter Password missing! Let's fix that.";
  } else if (repass !== pass) {
    repassErr.style.visibility = "visible";
    repassErr.textContent = "Passwords don't match. Let's fix it!";
  } else {
    setNormal("rp");
  }
}

function CheckPassword(pass, passErr) {
  if (pass === "") {
    passErr.style.visibility = "visible";
    passErr.textContent = "Password missing! Let's fix that.";
  } else if (String(pass).length < 8) {
    passErr.style.visibility = "visible";
    passErr.textContent = "Password must be more than 8 letters.";
  } else if (!pass.match(setOfPassValidate("u"))) {
    passErr.style.visibility = "visible";
    passErr.textContent = "Password must contain uppercase letter";
  } else if (!pass.match(setOfPassValidate("l"))) {
    passErr.style.visibility = "visible";
    passErr.textContent = "Password must contain lowercase letter";
  } else if (!pass.match(setOfPassValidate("n"))) {
    passErr.style.visibility = "visible";
    passErr.textContent = "Password must contain number";
  } else {
    setNormal("p");
  }
}

function setOfPassValidate(type) {
  var LetterUpper = /[A-Z]/g,
    LetterLower = /[a-z]/g,
    LetterNum = /[0-9]/g;

  switch (type) {
    case "u": {
      return LetterUpper;
    }
    case "l": {
      return LetterLower;
    }
    case "n": {
      return LetterNum;
    }
    default: {
      console.log("Invalid function in [setOfPassValidate]");
      break;
    }
  }
}

function CheckPasswordRules(pass) {
  var letter = document.getElementById("letter"),
    upper = document.getElementById("upper"),
    lower = document.getElementById("lower"),
    number = document.getElementById("number");

  if (String(pass).length > 8) {
    setRuleTrueOrFalse("t", letter, 0);
  } else {
    setRuleTrueOrFalse("f", letter, 0);
  }

  if (pass.match(setOfPassValidate("u"))) {
    setRuleTrueOrFalse("t", upper, 1);
  } else {
    setRuleTrueOrFalse("f", upper, 1);
  }

  if (pass.match(setOfPassValidate("l"))) {
    setRuleTrueOrFalse("t", lower, 2);
  } else {
    setRuleTrueOrFalse("f", lower, 2);
  }

  if (pass.match(setOfPassValidate("n"))) {
    setRuleTrueOrFalse("t", number, 3);
  } else {
    setRuleTrueOrFalse("f", number, 3);
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
      console.log("Invalid function in [setRuleTrueOrFalse]");
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
      errorSet[2].style.visibility = "hidden";
      break;
    }
    case "rp": {
      errorSet[3].style.visibility = "hidden";
      break;
    }
    default: {
      console.log("Invalid function in [SetNormal]");
      break;
    }
  }
}

function SendPHP() {
  // If all validation passes, you can send the data to PHP using AJAX
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "../php/Register_User.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // Handle the response from PHP
      alert(xhr.responseText);
    }
  };
  const data = `username=${username}&email=${email}&password=${password}`;
  xhr.send(data);
}
