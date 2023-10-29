var userID = sessionStorage.getItem("user_id");
const greetingUser = document.getElementById("greetingUser");
greetingUser.textContent = userID;

document.addEventListener("DOMContentLoaded", async function () {
  var userPage = document.getElementById("User"),
    friendReP = document.getElementById("FriendRequests"),
    chatPage = document.getElementById("Chat");

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
