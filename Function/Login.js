function checkInputNull(input) {
  if (input === "" || input.trim() === "") {
    return false;
  } else {
    return true;
  }
}

function checkSpace(data) {
  var spaceRegex = /\s/;
  return spaceRegex.test(data);
}

function validateInput(func) {
  var username = document.getElementById("username"),
    password = document.getElementById("password");

  var erroruser = document.getElementById("erroruser"),
    errorpass = document.getElementById("errorpass");
  (isValidUser = checkInputNull(username.value)),
    (isValidPass = checkInputNull(password.value)),
    (conSpaceUser = checkSpace(username.value)),
    (conSpacePass = checkSpace(password.value));
  let checkAndSet = true;
  switch (func) {
    case "u": {
      checkAndSet = setStyle(
        "u",
        username,
        isValidUser,
        conSpaceUser,
        erroruser
      );
      break;
    }
    case "p": {
      checkAndSet = setStyle(
        "p",
        password,
        isValidPass,
        conSpacePass,
        errorpass
      );
      break;
    }
    default: {
      console.log("No Function Found in [validateInput]");
      break;
    }
  }

  return checkAndSet;
}

function setStyle(func, inputStyle, isValid, conSpace, err) {
  let check = true;

  console.log(isValid + " and " + conSpace);
  if (!isValid) {
    setError(inputStyle, err, func === "u" ? getErrMsg(0, 0) : getErrMsg(1, 0));
    check = false;
  } else if (conSpace) {
    setError(inputStyle, err, func === "u" ? getErrMsg(0, 1) : getErrMsg(1, 1));
    check = false;
  } else {
    setNormal(inputStyle, err);
  }

  return check;
}

function getErrMsg(index1, index2) {
  let errMsg = [
    [
      "Username missing! Let's fix that.",
      "The Username are not contain space.",
    ],
    [
      "Password missing! Let's fix that.",
      "The Password are not contain space.",
    ],
  ];
  return errMsg[index1][index2];
}

function setError(inputStyle, err, msg) {
  setVisibilityandMessage(err, "v", msg);
  inputStyle.style.backgroundColor = "#ffe3e3";
  inputStyle.style.borderColor = "#cf1919";
  inputStyle.style.setProperty("--placeholder-color", "var(--wrong-Text)");
}

function setVisibilityandMessage(err, v, msg) {
  switch (v) {
    case "v": {
      err.style.visibility = "visible";
      err.textContent = msg;
      break;
    }
    case "h": {
      err.style.visibility = "hidden";
      break;
    }
    default: {
      console.log("Not Function Found in [setVisibility]");
      break;
    }
  }
}
function setMessage() {}

function setNormal(inputStyle, err) {
  setVisibilityandMessage(err, "h");
  inputStyle.style.backgroundColor = "";
  inputStyle.style.borderColor = "";
  inputStyle.style.setProperty("--placeholder-color", "");
}

// Attach the validateInput function to a button click event
document.addEventListener("DOMContentLoaded", function () {
  var loginBTN = document.getElementById("login"),
    registerBTN = document.getElementById("register");

  loginBTN.addEventListener("click", async function () {
    let Search = [validateInput("u"), validateInput("p")];
    if (Search[0] && Search[1]) {
      await login();
    }
  });

  registerBTN.addEventListener("click", () => {
    window.location.href = "../Pages/RegisterPage.html";
  });

  var username = document.getElementById("username");
  username.addEventListener("input", function () {
    validateInput("u");
  });
  username.addEventListener("blur", function () {
    validateInput("u");
  });

  var password = document.getElementById("password");
  password.addEventListener("input", function () {
    validateInput("p");
  });
  password.addEventListener("blur", function () {
    validateInput("p");
  });

  const shButton1 = document.getElementById("shBtn1"),
    icon1 = document.getElementById("icon1");

  shButton1.addEventListener("click", function () {
    showPasswordEye(icon1, password);
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

async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "../php/Login_User.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      if (response.success) {
        console.log("Login successful.");
      } else {
        console.log("Login failed. Invalid username or password.");
      }
    }
  };

  // Send the username and password as plain text to the server
  xhr.send("username=" + username + "&password=" + password);
}
