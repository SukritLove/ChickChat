import { getUsername } from "./GetData.js";

document.addEventListener("DOMContentLoaded", async function () {
  var userPage = document.getElementById("User"),
    friendReP = document.getElementById("FriendRequests"),
    chatPage = document.getElementById("Chat");

  getUsername()
    .then((username) => {
      // This code is inside the .then() block, ensuring that the username is available.
      document.getElementById("greetingUser").textContent =
        "Welcome Back: " + username + " !!!";
    })
    .catch((error) => {
      // Handle any errors that may occur during the Promise resolution.
      console.error("Error fetching username: " + error);
    });

  userPage.addEventListener("click", () => {
    window.location.href = "../Pages/UserPage.html";
  });

  friendReP.addEventListener("click", () => {
    window.location.href = "../Pages/FriendRequests.html";
  });
  chatPage.addEventListener("click", () => {
    window.location.href = "../Pages/ChatPage.html";
  });
});
