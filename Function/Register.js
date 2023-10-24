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

  username.addEventListener("input", async () => {
    let usernameCheck = await checkUsernameAndEmail(
      "username",
      username,
      getErrorSet(0),
      "u"
    );
    if (username.value.length === 0) {
      setErrorInput("u", username);
    } else if (usernameCheck) {
      setNormalSwitch("u", username);
    }
  });
  email.addEventListener("input", async () => {
    let emailCheck = await checkUsernameAndEmail(
      "email",
      email,
      getErrorSet(1),
      "e"
    );
    if (email.value.length === 0) {
      setErrorInput("e", email);
    } else if (emailCheck) {
      setNormalSwitch("e", email);
    }
  });

  passwordInput.addEventListener("input", () => {
    if (passwordInput.value.length === 0) {
      CheckPasswordRules(passwordInput.value);
      setErrorInput("p", passwordInput);
    } else if (checkSpace(passwordInput.value)) {
      CheckPasswordRules(passwordInput.value);
      setErrorInput("ps", passwordInput);
    } else {
      passwordRules.style.display = "block";
      CheckPasswordRules(passwordInput.value);
      setNormalSwitch("p", passwordInput);
    }
  });
  passwordRe.addEventListener("input", () => {
    if (passwordRe.value.length === 0) {
      setErrorInput("rp", passwordRe);
    } else {
      setNormalSwitch("rp", passwordRe);
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

function checkEmailFormat(email) {
  let domainName = ["outlook.com", "gmail.com", "hotmail.com"];
  return domainName.includes(String(email).toLowerCase().split("@")[1]);
}
function checkSpace(data) {
  var spaceRegex = /\s/;
  return spaceRegex.test(data);
}
function checkExtraCharacter(data) {
  var validCharactersRegex = /^[a-zA-Z0-9_.@-]+$/;
  return validCharactersRegex.test(data);
}

async function checkUsernameAndEmail(column, dataField, getErrorSet, func) {
  let Check = true,
    CheckEm = true;
  data = dataField.value;

  const isDataValid = await checkDataValid(column, data);
  if (data === "" || data.trim() === "") {
    getErrorSet.style.visibility = "visible";
    getErrorSet.textContent =
      column === "username" ? getMessage(0, 0) : getMessage(1, 0);
    Check = false;
  } else if (checkSpace(data)) {
    getErrorSet.style.visibility = "visible";
    getErrorSet.textContent =
      column === "username" ? getMessage(0, 2) : getMessage(1, 3);
    Check = false;
  } else if (isDataValid) {
    getErrorSet.style.visibility = "visible";
    getErrorSet.textContent =
      column === "username" ? getMessage(0, 1) : getMessage(1, 1);
    Check = false;
  }
  if (column === "email") {
    if (!checkEmailFormat(data)) {
      getErrorSet.style.visibility = "visible";
      getErrorSet.textContent = getMessage(1, 2);
      Check = false;
    }
    console.log("Status : " + !checkExtraCharacter(data));
    if (!checkExtraCharacter(data)) {
      getErrorSet.style.visibility = "visible";
      getErrorSet.textContent = getMessage(1, 4);
      Check = false;
    }
  }

  if (Check) {
    setNormalSwitch(func, dataField);
  } else if (column === "email") {
    setErrorInput("e", dataField, "s");
  } else {
    setErrorInput("u", dataField, "s");
  }

  return Check;
}

async function validateData() {
  // Retrieve form values
  const username = document.getElementById("username"),
    email = document.getElementById("email"),
    password = document.getElementById("password"),
    rePassword = document.getElementById("re-pass");

  let AllDataTrue = [
    await checkUsernameAndEmail("username", username, getErrorSet(0), "u"),
    await checkUsernameAndEmail("email", email, getErrorSet(1), "e"),
    CheckPassword(password, getErrorSet(2)),
    CheckRePassword(password, rePassword, getErrorSet(3)),
  ];

  if (AllDataTrue[0] && AllDataTrue[1] && AllDataTrue[2] && AllDataTrue[3]) {
    console.log("Status : Complete Data");
    SendPHP(username, email, password);
  } else {
    AllDataTrue.forEach(function (currentValue) {
      console.log("Status : " + currentValue);
    });
    console.log("Status : Incomplete Data");
  }
}

function CheckRePassword(passField, repassField, repassErr) {
  let Check = true,
    pass = passField.value,
    repass = repassField.value;

  if (repass === "") {
    repassErr.style.visibility = "visible";
    repassErr.textContent = getMessage(3, 0);
    Check = false;
  } else if (repass !== pass) {
    repassErr.style.visibility = "visible";
    repassErr.textContent = getMessage(3, 1);
    Check = false;
  }
  if (Check) {
    setNormalSwitch("rp", repassField);
  } else {
    setErrorInput("rp", repassField, "s");
  }
  return Check;
}

function CheckPassword(passField, passErr) {
  let Check = true,
    pass = passField.value;

  if (pass === "") {
    passErr.style.visibility = "visible";
    passErr.textContent = getMessage(2, 0);
    Check = false;
  } else if (!pass.match(setOfPassValidate("u"))) {
    passErr.style.visibility = "visible";
    passErr.textContent = getMessage(2, 2);
    Check = false;
  } else if (!pass.match(setOfPassValidate("l"))) {
    passErr.style.visibility = "visible";
    passErr.textContent = getMessage(2, 3);
    Check = false;
  } else if (!pass.match(setOfPassValidate("n"))) {
    passErr.style.visibility = "visible";
    passErr.textContent = getMessage(2, 4);
    Check = false;
  } else if (String(pass).length < 8) {
    passErr.style.visibility = "visible";
    passErr.textContent = getMessage(2, 1);
    Check = false;
  } else if (checkSpace(pass)) {
    passErr.style.visibility = "visible";
    passErr.textContent = getMessage(2, 5);
    Check = false;
  }
  if (Check) {
    setNormalSwitch("p", passField);
  } else {
    setErrorInput("p", passField, "s");
  }
  return Check;
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

  if (String(pass).length >= 8) {
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

function getMessage(index1, index2) {
  let msg = [
    [
      "Username missing! Let's fix that.",
      "This Username is already in use!",
      "The Username cannot contain space.",
    ],
    [
      "Email missing! Let's fix that.",
      "This Email is already in use!",
      "Invalid email format.",
      "The Email cannot contain Space.",
      "The Email cannot contain Extra Character.",
    ],
    [
      "Password missing! Let's fix that.",
      "Password must be more than 8 letters.",
      "Password must contain uppercase letter",
      "Password must contain lowercase letter",
      "Password must contain number",
      "The Password cannot contain space.",
    ],
    [
      "Re-enter Password missing! Let's fix that.",
      "Passwords don't match. Let's fix it!",
    ],
  ];
  return msg[index1][index2];
}
function getErrorSet(index) {
  var errorSet = [
    document.getElementById("erroruser"),
    document.getElementById("erroremail"),
    document.getElementById("errorpass"),
    document.getElementById("errorrepass"),
  ];
  return errorSet[index];
}

function setErrorInput(func, inputStyle, func2) {
  switch (func) {
    case "u": {
      setError(getErrorSet(0), getMessage(0, 0), inputStyle, func2);
      break;
    }
    case "us": {
      setError(getErrorSet(0), getMessage(0, 2), inputStyle, func2);
      break;
    }
    case "e": {
      setError(getErrorSet(1), getMessage(1, 0), inputStyle, func2);
      break;
    }
    case "ef": {
      setError(getErrorSet(1), getMessage(1, 2), inputStyle, func2);
      break;
    }
    case "es": {
      setError(getErrorSet(1), getMessage(1, 3), inputStyle, func2);
      break;
    }
    case "ex": {
      setError(getErrorSet(1), getMessage(1, 4), inputStyle, func2);
      break;
    }
    case "p": {
      setError(getErrorSet(2), getMessage(2, 0), inputStyle, func2);
      break;
    }
    case "ps": {
      setError(getErrorSet(2), getMessage(2, 5), inputStyle, func2);
      break;
    }
    case "rp": {
      setError(getErrorSet(3), getMessage(3, 0), inputStyle, func2);
      break;
    }
    default: {
      console.log("Invalid function in [setErrInput]", func2);
      break;
    }
  }
}

function setError(err, msg, inputStyle, func) {
  switch (func) {
    case "s": {
      inputStyle.style.backgroundColor = "#ff9999";
      inputStyle.style.borderColor = "#cf1919";
      inputStyle.style.setProperty("--placeholder-color", "var(--wrong-Text)");
      break;
    }
    default: {
      err.style.visibility = "visible";
      err.textContent = msg;
      inputStyle.style.backgroundColor = "#ff9999";
      inputStyle.style.borderColor = "#cf1919";
      inputStyle.style.setProperty("--placeholder-color", "var(--wrong-Text)");
      break;
    }
  }
}

function setNormalSwitch(func, inputStyle) {
  switch (func) {
    case "u": {
      setNormal(getErrorSet(0), inputStyle);
      break;
    }
    case "e": {
      setNormal(getErrorSet(1), inputStyle);
      break;
    }
    case "p": {
      setNormal(getErrorSet(2), inputStyle);
      break;
    }
    case "rp": {
      setNormal(getErrorSet(3), inputStyle);
      break;
    }
    default: {
      console.log("Invalid function in [setNormalSwitch]");
      break;
    }
  }
}

function setNormal(err, inputStyle) {
  err.style.visibility = "hidden";
  inputStyle.style.backgroundColor = "";
  inputStyle.style.borderColor = "";
  inputStyle.style.setProperty("--placeholder-color", "");
}

async function SendPHP(username, email, password) {
  // Create a FormData object to send the data
  const formData = new FormData();
  formData.append("action", "InsertData");
  formData.append("username", username.value);
  formData.append("email", String(email.value).toLowerCase());
  formData.append("password", password);

  // If all validation passes, you can send the data to PHP using AJAX
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "../php/Register_User.php", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // Handle the response from PHP
      console.log(xhr.responseText);

      // If data insertion is successful, you can redirect to a specific page
      window.location.href = "../Pages/LoginPage.html";
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
