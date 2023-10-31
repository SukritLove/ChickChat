export async function addFriend(username) {
  try {
    let add = await addFriendToDB("addFriend", username);
    return add;
  } catch (error) {
    console.error("Error adding friend:", error);
    return false;
  }
}

async function addFriendToDB(method, username) {
  return new Promise((resolve, reject) => {
    var userID = sessionStorage.getItem("user_id");
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "../php/Push.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        console.log(response)
        if (response) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    };

    // Send data as a URL-encoded string
    xhr.send(
      "action=" + method + "&userId=" + userID + "&requestTo=" + username
    );
  });
}

export async function addLog(message) {
  let status = await addLogToDB("addLog", message);
  console.log(status);

  return status;
}

async function addLogToDB(method,message) {
  return new Promise((resolve, reject) => {
    var userID = sessionStorage.getItem("user_id");
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "../php/Push.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        console.log(response)
        if (response) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    };

    xhr.send(
      "action=" + method + "&userId=" + userID + "&message=" + message
    );
  });
}
