function checkInput(input) {
  if (input.value === null || input.value.trim() === "") {
    return false;
  } else {
    return true;
  }
}

function validateInput(func) {
  var username = document.getElementById("username"),
    password = document.getElementById("password"),
    isValidUser = checkInput(username),
    isValidPass = checkInput(password);

  if (func === 1) {
    setStyle(username, isValidUser);
  } else if (func === 2) {
    setStyle(password, isValidPass);
  } else {
    setStyle(username, isValidUser);
    setStyle(password, isValidPass);
  }
}

function setStyle(inputStyle, isValid) {
  if (!isValid) {
    setError(inputStyle);
  } else {
    setNormal(inputStyle);
  }
}

function setError(inputStyle) {
  inputStyle.style.backgroundColor = "#ff9999";
  inputStyle.style.borderColor = "#cf1919";
  inputStyle.style.setProperty("--placeholder-color", "var(--wrong-Text)");
}

function setNormal(inputStyle) {
  inputStyle.style.backgroundColor = "";
  inputStyle.style.borderColor = "";
  inputStyle.style.setProperty("--placeholder-color", "");
}

// Attach the validateInput function to a button click event
document.addEventListener("DOMContentLoaded", function () {
  var loginBTN = document.getElementById("login"),
      registerBTN = document.getElementById("register");
  loginBTN.addEventListener("click", validateInput);
  registerBTN.addEventListener("click", ()=>{
    window.location.href = "../Pages/RegisterPage.html"
  });

  var username = document.getElementById("username");

  username.addEventListener("input", function () {
    validateInput(1);
  });
  username.addEventListener("blur", function () {
    validateInput(1);
  });

  var password = document.getElementById("password");
  password.addEventListener("input", function () {
    validateInput(2);
  });
  password.addEventListener("blur", function () {
    validateInput(2);
  });
});
