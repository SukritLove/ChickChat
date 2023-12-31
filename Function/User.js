import { getUsername } from "./GetData.js";
import { addLog } from "./PushData.js";

document.addEventListener("DOMContentLoaded", async function () {
  var userPage = document.getElementById("User"),
    friendReP = document.getElementById("FriendRequests"),
    chatPage = document.getElementById("Chat");

  await addLog("Login");
  var userID = sessionStorage.getItem("user_id");
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

  var deleteUser = document.getElementById("delAcc");
  deleteUser.addEventListener("click", async () => {
    let del_con = confirm("Wanna delete your account?");
    console.log(del_con);
    // let delStatus = await addLog('Sign Out');
    // if (delStatus) {
    //   sessionStorage.removeItem("user_id");
    //   window.location.href = "../Pages/LoginPage.html";
    // }
  });

  var signOutBtn = document.getElementById("signOut");
  signOutBtn.addEventListener("click", async () => {
    let status = await addLog("Sign Out");
    if (status) {
      sessionStorage.removeItem("user_id");
      window.location.href = "../Pages/LoginPage.html";
    }
  });
});
