document.addEventListener("DOMContentLoaded", function () {
  const registerButton = document.getElementById("register");
  registerButton.addEventListener("click", function () {
    validateData();
  });

  const username = document.getElementById("username"),
    email = document.getElementById("email"),
    passwordInput = document.getElementById("password"),
    passwordRe = document.getElementById("re-pass"),
    passwordRules = document.getElementById("password-rules");
  passwordInput.addEventListener("focus", () => {
    passwordRules.style.display = "block";
  });

  passwordInput.addEventListener("blur", () => {
    if (passwordInput.value.length === 0) {
      passwordRules.style.display = "none";
    }
  });

  username.addEventListener("input", () => {
    if (username.value.length === 0) {
      setErrorInput("u");
    } else {
      setNormal("u");
    }
  });
  email.addEventListener("input", () => {
    if (email.value.length === 0) {
      setErrorInput("e");
    } else {
      setNormal("e");
    }
  });

  passwordInput.addEventListener("input", () => {
    if (passwordInput.value.length === 0) {
      CheckPasswordRules(passwordInput.value);
      setErrorInput("p");
    } else {
      passwordRules.style.display = "block";
      CheckPasswordRules(passwordInput.value);
      setNormal("p");
    }
  });
  passwordRe.addEventListener("input", () => {
    if (passwordRe.value.length === 0) {
      setErrorInput("rp");
    } else {
      setNormal("rp");
    }
  });

  const shButton1 = document.getElementById("shBtn1"),
    shButton2 = document.getElementById("shBtn2");
  const icon1 = document.getElementById("icon1"),
    icon2 = document.getElementById("icon2");

  shButton1.addEventListener("click", function () {
    showPasswordEye(icon1, passwordInput);
  });

  shButton2.addEventListener("click", function () {
    showPasswordEye(icon2, passwordRe);
  });
});

function showPasswordEye(icon, passField) {
  if (icon.getAttribute("src").includes("../Art/EyeC.svg")) {
    icon.setAttribute("src", "../Art/EyeO.svg");
    icon.setAttribute("alt", "Icon 1");
    passField.setAttribute("type", "text");
  } else {
    icon.setAttribute("src", "../Art/EyeC.svg");
    icon.setAttribute("alt", "Icon 2");
    passField.setAttribute("type", "password");
  }
}

async function checkDataValid(column, data) {
  console.log("CheckDataValid");
  const result = await callPhpMethod("Checker", column, data);
  return result;
}

function checkUsernameAndEmail(column, data, errorSet, func) {
  checkDataValid(column, data).then((isDataValid) => {
    console.log(isDataValid);
    if (data === "") {
      errorSet.style.visibility = "visible";
      errorSet.textContent =
        column === "username" ? errMsg(0, 0) : errMsg(1, 0);
    } else if (isDataValid) {
      errorSet.style.visibility = "visible";
      errorSet.textContent =
        column === "username" ? errMsg(0, 1) : errMsg(1, 1);
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

  SendPHP(username, email, password);
}

function CheckRePassword(pass, repass, repassErr) {
  if (repass === "") {
    repassErr.style.visibility = "visible";
    repassErr.textContent = errMsg(3, 0);
  } else if (repass !== pass) {
    repassErr.style.visibility = "visible";
    repassErr.textContent = errMsg(3, 1);
  } else {
    setNormal("rp");
  }
}

function CheckPassword(pass, passErr) {
  if (pass === "") {
    passErr.style.visibility = "visible";
    passErr.textContent = errMsg(2, 0);
  } else if (String(pass).length < 8) {
    passErr.style.visibility = "visible";
    passErr.textContent = errMsg(2, 1);
  } else if (!pass.match(setOfPassValidate("u"))) {
    passErr.style.visibility = "visible";
    passErr.textContent = errMsg(2, 2);
  } else if (!pass.match(setOfPassValidate("l"))) {
    passErr.style.visibility = "visible";
    passErr.textContent = errMsg(2, 3);
  } else if (!pass.match(setOfPassValidate("n"))) {
    passErr.style.visibility = "visible";
    passErr.textContent = errMsg(2, 4);
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

function errMsg(index1, index2) {
  let msg = [
    ["Username missing! Let's fix that.", "This Username is already in use!"],
    ["Email missing! Let's fix that.", "This Email is already in use!"],
    [
      "Password missing! Let's fix that.",
      "Password must be more than 8 letters.",
      "Password must contain uppercase letter",
      "Password must contain lowercase letter",
      "Password must contain number",
    ],
    [
      "Re-enter Password missing! Let's fix that.",
      "Passwords don't match. Let's fix it!",
    ],
  ];
  return msg[index1][index2];
}

function setErrorInput(func) {
  var errorSet = [
    document.getElementById("erroruser"),
    document.getElementById("erroremail"),
    document.getElementById("errorpass"),
    document.getElementById("errorrepass"),
  ];
  switch (func) {
    case "u": {
      setError(errorSet[0], errMsg(0, 0));
      break;
    }
    case "e": {
      setError(errorSet[1], errMsg(1, 0));
      break;
    }
    case "p": {
      setError(errorSet[2], errMsg(2, 0));
      break;
    }
    case "rp": {
      setError(errorSet[3], errMsg(3, 0));
      break;
    }
    default: {
      console.log("Invalid function in [setErrInput]");
      break;
    }
  }
}

function setError(err, msg) {
  err.style.visibility = "visible";
  err.textContent = msg;
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

function SendPHP(username, email, password) {
  // Create a FormData object to send the data
  const formData = new FormData();
  formData.append("action", "InsertData");
  formData.append("username", username);
  formData.append("email", email);
  formData.append("password", password);

  // If all validation passes, you can send the data to PHP using AJAX
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "../php/Register_User.php", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // Handle the response from PHP
      alert(xhr.responseText);
    }
  };

  xhr.send(formData);
}

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
