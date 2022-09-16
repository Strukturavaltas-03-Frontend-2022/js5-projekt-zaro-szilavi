const url = "http://localhost:3000/users/";
let modedUser = {};
let newUser = {};

//ADATOK KIOLVASÁSA ÉS MEGJELENÍTÉSE--------------------------------------------
async function get(url) {
  const response = await fetch(url);
  const users = await response.json();
  return users;
}
get(url);

async function setUpTable() {
  let rowsHTML = "";
  const users = await get(url);

  for (let i = 0; i < users.length; i++) {
    rowsHTML += `
    <tr>
    <td class="id">${users[i].id}</td>
    <td><input class="input-name" readonly="" value="${users[i].name}"></td>
    <td><input class="input-email" readonly="" value="${users[i].emailAddress}"></td>
    <td><input class="input-address" readonly="" value="${users[i].address}"></td>
    <td><button type="button" class="edit">Szerkesztés</button></td>
    <td><button type="button" class="remove">Törlés</button></td>
    <td><button type="button" class="save" style="visibility: hidden;">Mentés</button></td>
    <td><button type="button" class="cancel" style="visibility: hidden;">Visszavonás</button></td>
    </tr>
    `;
  }
  document.querySelector("table tbody").innerHTML = rowsHTML;
  buttonsAction();
}

setUpTable();

//FETCH METÓDUSOK--------------------------------------------------------------------------------

async function deleteUser(userId) {
  const response = await fetch(url + userId, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
}

async function editUser(userId) {
  const response = await fetch(url + userId, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(modedUser),
  });
}

async function addUser() {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });
}

//GOMBOK MŰKÖDÉSRE BÍRÁSA-----------------------------------------------------------------------

function buttonsAction() {
  const editBtn = document.querySelectorAll(".edit");
  const removeBtn = document.querySelectorAll(".remove");

  //USER TÖRLÉSE--------------------------------------------------------------------------------

  removeBtn.forEach((element) => {
    element.addEventListener("click", deleteRow);
  });

  function deleteRow(e) {
    let userId = e.target.closest("tr").querySelector(".id").textContent;
    e.target.closest("tr").remove();
    deleteUser(userId);
  }

  //USER MÓDOSÍTÁSA ----------------------------------------------------------------------------

  editBtn.forEach((element) => {
    element.addEventListener("click", editRow);
  });

  function editRow(e) {
    let userId = e.target.closest("tr").querySelector("td.id").textContent;
    let userName = e.target.closest("tr").querySelector(".input-name");
    let emailAddress = e.target.closest("tr").querySelector(".input-email");
    let address = e.target.closest("tr").querySelector(".input-address");

    tempUser = {
      id: userId,
      name: userName.value,
      emailAddress: emailAddress.value,
      address: address.value,
    };

    changeBtnStatus(e);

    //USER ADATAINAK MÓDOSÍTÁSÁNAK VISSZAVONÁSA  ---------------------------------------------

    const cancelBtn = document.querySelectorAll(".cancel");

    cancelBtn.forEach((element) => {
      element.addEventListener("click", cancelModifi);
    });

    function cancelModifi() {
      userId.value = tempUser.id;
      userName.value = tempUser.name;
      emailAddress.value = tempUser.emailAddress;
      address.value = tempUser.address;

      changeBtnStatus(e);
    }

    const saveBtn = document.querySelectorAll(".save");

    saveBtn.forEach((element) => {
      element.addEventListener("click", modifiUserData);
    });
    //user módosításának megerősítése -----------------------
    function modifiUserData() {
      modedUser = {
        id: userId,
        name: userName.value,
        emailAddress: emailAddress.value,
        address: address.value,
      };
      changeBtnStatus(e);
      editUser(userId);
    }
  }

  // új user hozzáadása ------------------------------
  const createNewUser = document.querySelector(".newUser");

  createNewUser.addEventListener("click", createNewRow);

  function createNewRow() {
    const newUserBtn = document.querySelector(".newUser");
    newUserBtn.disabled = true;
    const tBody = document.querySelector("table tbody");
    const userId = document.querySelectorAll(".id");
    let highestNum = 0;
    userId.forEach((i) => {
      if (Number(i.textContent) > highestNum) {
        highestNum = Number(i.textContent);
      }
    });
    const newUSerRow = `<tr>
    <td class="id">${highestNum + 1}</td>
    <td><input class="newUser-input-name"></td>
    <td><input class="newUser-input-email"></td>
    <td><input class="newUser-input-address"></td>
    <td><button type="button" class="addUser" style="visibility: visible;">Hozzáad</button></td>
    <td><button type="button" class="undoUser" style="visibility: visible;">Mégse</button></td>
    </tr>
    `;
    tBody.innerHTML = newUSerRow + tBody.innerHTML;

    const newUserId = document.querySelector(".id");
    const newUserName = document.querySelector(".newUser-input-name");
    const newUserEmail = document.querySelector(".newUser-input-email");
    const newUserAddress = document.querySelector(".newUser-input-address");
    const addNewUserBtn = document.querySelector(".addUser");
    const undoNewUserBtn = document.querySelector(".undoUser");

    addNewUserBtn.addEventListener("click", postNewUser);

    function postNewUser() {
      newUser = {
        id: Number(newUserId.textContent),
        name: newUserName.value,
        emailAddress: newUserEmail.value,
        address: newUserAddress.value,
      };
      newUserBtn.disabled = false;
      addUser();
    }

    undoNewUserBtn.addEventListener("click", undoNewUser);

    function undoNewUser(e) {
      e.target.closest("tr").remove();
      newUserBtn.disabled = false;
    }
  }
}

function changeBtnStatus(e) {
  const editBtn = document.querySelectorAll(".edit");
  const removeBtn = document.querySelectorAll(".remove");
  let userName = e.target.closest("tr").querySelector(".input-name");
  let emailAddress = e.target.closest("tr").querySelector(".input-email");
  let address = e.target.closest("tr").querySelector(".input-address");
  userName.readOnly === false
    ? (userName.readOnly = true)
    : (userName.readOnly = false);
  emailAddress.readOnly === false
    ? (emailAddress.readOnly = true)
    : (emailAddress.readOnly = false);
  address.readOnly === false
    ? (address.readOnly = true)
    : (address.readOnly = false);

  e.target.closest("tr").querySelector(".save").style.visibility === "visible"
    ? (e.target.closest("tr").querySelector(".save").style.visibility =
        "hidden")
    : (e.target.closest("tr").querySelector(".save").style.visibility =
        "visible");
  e.target.closest("tr").querySelector(".cancel").style.visibility === "visible"
    ? (e.target.closest("tr").querySelector(".cancel").style.visibility =
        "hidden")
    : (e.target.closest("tr").querySelector(".cancel").style.visibility =
        "visible");
  e.target.closest("tr").querySelector(".edit").style.visibility === "hidden"
    ? (e.target.closest("tr").querySelector(".edit").style.visibility =
        "visible")
    : (e.target.closest("tr").querySelector(".edit").style.visibility =
        "hidden");
  e.target.closest("tr").querySelector(".remove").style.visibility === "hidden"
    ? (e.target.closest("tr").querySelector(".remove").style.visibility =
        "visible")
    : (e.target.closest("tr").querySelector(".remove").style.visibility =
        "hidden");

  editBtn.forEach((element) => {
    element.disabled === true
      ? (element.disabled = false)
      : (element.disabled = true);
  });

  removeBtn.forEach((element) => {
    element.disabled === true
      ? (element.disabled = false)
      : (element.disabled = true);
  });
}

//a módosítás és a visszavonás csak elsőre működik, másodjára nem

//tryokat pls
