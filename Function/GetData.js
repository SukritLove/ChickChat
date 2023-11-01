export async function getUsername() {
  var userID = sessionStorage.getItem("user_id");
  let name = await getUserFrmID("getUsername", userID);
  console.log(name.username);

  return name.username;
}
async function getUserFrmID(method, userID) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "../php/Get.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        if (response.success) {
          resolve({ success: true, username: response.username });
        } else {
          resolve(false);
        }
      }
    };

    xhr.send("action=" + method + "&userId=" + userID);
  });
}

export async function getUsernameFriendRe() {
  let Friendname = await getFriend("getFriend");
  console.log(Friendname);
  return Friendname;
}
async function getFriend(method) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "../php/Get.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        if (response) {
          resolve(response);
        } else {
          resolve([0]);
        }
      }
    };

    xhr.send("action=" + method);
  });
}

export async function getFriendAdd() {
  let addedUsername = await getAdd("getFriendAdded");
  console.log(addedUsername);

  return addedUsername;
}
async function getAdd(method) {
  return new Promise((resolve, reject) => {
    var userID = sessionStorage.getItem("user_id");
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "../php/Get.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);

        if (response) {
          resolve(response);
        } else {
          resolve(false);
        }
      }
    };
    xhr.send("action=" + method + "&userId=" + userID);
  });
}

export async function getUserID(username) {
  let id = await getUserIDFrmUsername("getUserID", username);
  console.log(username);
  console.log(id);

  return id;
}

async function getUserIDFrmUsername(method, username) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "../php/Get.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        if (response) {
          resolve(response);
        } else {
          resolve(false);
        }
      }
    };
    console.log(username);
    xhr.send("action=" + method + "&username=" + username);
  });
}
