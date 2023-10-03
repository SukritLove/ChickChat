function checkInput(username, password) {
  if (password.value === null || password.value.trim() === "") {
    return false;
  } else {
    return true;
  }
}

function validateInput() {
  var username = document.getElementById("username"),
    password = document.getElementById("password"),
    isValid = checkInput(username, password);
  if (isValid) {
    password.style.backgroundColor= "";
    password.style.borderColor = "";
  } else {
    password.style.backgroundColor= "#FF6969";
    password.style.borderColor = "#cf1919";
  }
}

// Attach the validateInput function to a button click event
document.addEventListener("DOMContentLoaded", function () {
  var button = document.getElementById("login");
  button.addEventListener("click", validateInput);
});
