import { getUsername, getUsernameFriendRe } from "./GetData.js";

document.addEventListener("DOMContentLoaded", async function () {
  var userPage = document.getElementById("User"),
    friendReP = document.getElementById("FriendRequests"),
    chatPage = document.getElementById("Chat");

  populateFriendList();

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
    const username = await getUsername();
    const friendName = await getUsernameFriendRe();
    const container = document.getElementById("friendlist");

    friendName.forEach((name) => {
      if (name !== username) {
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

        cardDiv.appendChild(imgElement);
        cardDiv.appendChild(paragraph);

        container.appendChild(cardDiv);
        console.log(cardDiv);
      }
    });
  } catch (error) {
    console.error("Error: " + error);
  }
}
