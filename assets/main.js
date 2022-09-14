const url = "http://localhost:3000/users/";
let modedUser = {};
let newUser = {};

//itt még rá kéne jönnöm, hogy a methodok miként működnek

//kiolvasom a szerverről az adatokat és megjelenítem az oldalon
async function get(url) {
  const response = await fetch(url);
  const users = await response.json();
  return users;
}
get(url);


async function setUpTable() {
  let rowsHTML = '';
  const users = await get(url);
  
  for (let i = 0; i < users.length; i++) {
    //console.log(users[i]);
    rowsHTML += `
    <tr>
    <td class="id">${users[i].id}</td>
    <td><input class="input-name" readonly="" value="${users[i].name}"></td>
    <td><input class="input-email" readonly="" value="${users[i].emailAddress}"></td>
    <td><input class="input-address" readonly="" value="${users[i].address}"></td>
    <td><button type="button" class="edit">Szerkesztés</button></td>
    <td><button type="button" class="remove">Törlés</button></td>
    <td><button type="button" class="save" style="visibility: hidden;">Módosítás</button></td>
    <td><button type="button" class="cancel" style="visibility: hidden;">Elvetés</button></td>
    </tr>
    `;
  }
  document.querySelector("table tbody").innerHTML=rowsHTML;
  buttonsAction();
}

setUpTable();

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

async function addUser(userId) {
  const response = await fetch(url + userId, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });
}

function buttonsAction() {
  const editBtn = document.querySelectorAll(".edit");
  const removeBtn = document.querySelectorAll(".remove");
  removeBtn.forEach((element) => {
    element.addEventListener("click", deleteRow);
  });
  function deleteRow(e) {
    let userId = e.target.closest("tr").querySelector('.id').textContent;
    e.target.closest("tr").remove();
    deleteUser(userId);
  }

  editBtn.forEach((element) => {
    element.addEventListener("click", editRow);
  });

  function editRow(e) {
    let userId = e.target.closest("tr").querySelector('td.id').textContent;
    let userName = e.target.closest("tr").querySelector('.input-name');
    let emailAddress = e.target.closest("tr").querySelector('.input-email');
    let address = e.target.closest("tr").querySelector('.input-address');
    tempUser = {
      id: userId,
      name: userName.value,
      emailAddress: emailAddress.value,
      address: address.value,
    };
    userName.readOnly = false;
    emailAddress.readOnly = false;
    address.readOnly = false;

    e.target.closest("tr").querySelector('.save').style.visibility = "visible";
    e.target.closest("tr").querySelector('.cancel').style.visibility = "visible";
    e.target.closest("tr").querySelector('.edit').style.visibility = "hidden";
    e.target.closest("tr").querySelector('.remove').style.visibility = "hidden";

    const allEditBtn = document.querySelectorAll(".edit");
    const allDeleteBtn = document.querySelectorAll(".remove");

    allEditBtn.forEach((element) => {
      element.disabled = true;
    });

    allDeleteBtn.forEach((element) => {
      element.disabled = true;
    });

    const cancelBtn = document.querySelectorAll(".cancel");

    cancelBtn.forEach((element) => {
      element.addEventListener("click", cancelModifi);
    });

    function cancelModifi() {
      userId.value = tempUser.id;
      userName.value = tempUser.name;
      emailAddress.value = tempUser.emailAddress;
      address.value = tempUser.address;

      userName.readOnly = true;
      emailAddress.readOnly = true;
      address.readOnly = true;

      e.target.closest("tr").querySelector('.save').style.visibility = "hidden";
      e.target.closest("tr").querySelector('.cancel').style.visibility = "hidden";
      e.target.closest("tr").querySelector('.edit').style.visibility = "visible";
      e.target.closest("tr").querySelector('.remove').style.visibility = "visible";

      const allEditBtn = document.querySelectorAll(".edit");
      const allDeleteBtn = document.querySelectorAll(".remove");

      allEditBtn.forEach((element) => {
        element.disabled = false;
      });

      allDeleteBtn.forEach((element) => {
        element.disabled = false;
      });
    }
    
    const saveBtn = document.querySelectorAll(".save");
  

    saveBtn.forEach((element) => {
      element.addEventListener("click", modifiUserData);
    });

    function modifiUserData() {
      modedUser = {
        id: userId,
        name: userName.value,
        emailAddress: emailAddress.value,
        address: address.value,
      };
      userName.readOnly = true;
      emailAddress.readOnly = true;
      address.readOnly = true;

      e.target.closest("tr").querySelector('.save').style.visibility = "visible";
      e.target.closest("tr").querySelector('.cancel').style.visibility = "visible";
      e.target.closest("tr").querySelector('.edit').style.visibility = "hidden";
      e.target.closest("tr").querySelector('.remove').style.visibility = "hidden";

      const allEditBtn = document.querySelectorAll(".edit");
      const allDeleteBtn = document.querySelectorAll(".delete");

      allEditBtn.forEach((element) => {
        element.disabled = false;
      });

      allDeleteBtn.forEach((element) => {
        element.disabled = false;
      });
      editUser(userId);
    }
  }
  
  const createNewUser = document.querySelector('.newUser')

  createNewUser.addEventListener('click', createNewRow)

  function createNewRow() {
    const tBody = document.querySelector("table tbody");
    tBody.innerHTML = `<tr>
    <td class="id"></td>
    <td><input class="input-name" readonly="" value=""></td>
    <td><input class="input-email" readonly="" value=""></td>
    <td><input class="input-address" readonly="" value=""></td>
    <td><button type="button" class="save" style="visibility: visible;">Módosítás</button></td>
    <td><button type="button" class="cancel" style="visibility: visible;">Elvetés</button></td>
    </tr>
    ` + tBody.innerHTML;
  }
}

//tryokat pls
