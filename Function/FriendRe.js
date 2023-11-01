import {
  getUsername,
  getUsernameFriendRe,
  getFriendAdd,
  getUserID,
} from "./GetData.js";
import { addFriend, addLog } from "./PushData.js";

document.addEventListener("DOMContentLoaded", async function () {
  var userPage = document.getElementById("User"),
    friendReP = document.getElementById("FriendRequests"),
    chatPage = document.getElementById("Chat");

  populateFriendList();
  populateFriendRequest();

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

async function populateFriendList() {
  try {
    const username = [await getUsername()];
    const friendNames = await getUsernameFriendRe();
    const Friended = await getFriendAdd();
    console.log(Friended);
    friendNames.forEach((name) => {
      if (name !== username[0] && name !== "admin") {
        if (!Friended) {
          createCard(name);
        } else {
          if (!Friended.includes(name)) {
            createCard(name);
          }
        }
      }
    });
  } catch (error) {
    console.error("Error: " + error);
  }
}

async function createCard(name) {
  const container = document.getElementById("friendlist");
  var cardDiv = document.createElement("div");
  cardDiv.className = "card";

  var imgElement = document.createElement("img");
  imgElement.id = "icon";
  imgElement.src = "../Art/userIcon.svg";
  imgElement.alt = "";
  imgElement.width = 70;
  imgElement.height = 70;

  var paragraph = document.createElement("p");
  paragraph.textContent = name;

  var button = document.createElement("button");
  button.id = "addFndBtn";
  button.textContent = "Add Friend";
  button.addEventListener("click", async function () {
    try {
      let addStatus = await addFriend(String(name));
      let userID = await getUserID(name);
      if (addStatus) {
        let status = await addLog(
          "Added Friend To user_Id " + "[" + userID + "]"
        );
        if (status) {
          button.textContent = "Friend Request Sent";
          button.disabled = true;
          location.reload();
        }
      } else {
        // Handle the case where adding a friend failed.
        console.error("Failed to add friend.");
      }
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  });

  cardDiv.appendChild(imgElement);
  cardDiv.appendChild(paragraph);
  cardDiv.appendChild(button);

  container.appendChild(cardDiv);
}

async function populateFriendRequest() {
  const container = document.getElementById("friendlist");
  try {
    const Friended = await getFriendAdd();
    const container = document.getElementById("friendRelist");
    console.log(Friended !== false);
    if (Friended) {
      Friended.forEach((name) => {
        var cardDiv = document.createElement("div");
        cardDiv.className = "card";

        var imgElement = document.createElement("img");
        imgElement.id = "icon";
        imgElement.src = "../Art/userIcon.svg";
        imgElement.alt = "";
        imgElement.width = 70;
        imgElement.height = 70;

        var paragraph = document.createElement("p");
        paragraph.textContent = name;

        var status = document.createElement("p");
        status.textContent = "Pending...";

        cardDiv.appendChild(imgElement);
        cardDiv.appendChild(paragraph);
        cardDiv.appendChild(status);

        container.appendChild(cardDiv);
      });
    }
  } catch (error) {
    console.error("Error: " + error);
  }
}
