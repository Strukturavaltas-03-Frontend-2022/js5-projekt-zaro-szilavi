const url = "http://localhost:3000/users";
let modedUser = {};

//itt még rá kéne jönnöm, hogy a methodok miként működnek

//kiolvasom a szerverről az adatokat és megjelenítem az oldalon
async function get(url) {
  const response = await fetch(url);
  const users = await response.json();
  return users;
}
get(url);

async function setUpTable() {
  const users = await get(url);
  const tBody = document.querySelector("table tbody");
  for (let i = 0; i < users.length; i++) {
    //létrehozok egy sort
    const tr = document.createElement("tr");
    tBody.appendChild(tr);
    //ID létrehozása
    const id = document.createElement("td");
    tr.appendChild(id);
    id.textContent = users[i].id;
    //név létrehozása
    const name = document.createElement("input");
    name.readOnly = true;
    tr.appendChild(name);
    name.value = users[i].name;
    //e-mail létrehozása
    const email = document.createElement("input");
    email.readOnly = true;
    tr.appendChild(email);
    email.value = users[i].emailAddress;
    //adress létrehozása
    const adress = document.createElement("input");
    adress.readOnly = true;
    tr.appendChild(adress);
    adress.value = users[i].address;
    //szerkesztés gomb létrehozása
    const edit = document.createElement("button");
    edit.classList.add("edit");
    tr.appendChild(edit);
    edit.textContent = `Szerkesztés`;
    //törlés gomb létrehozása
    const remove = document.createElement("button");
    remove.classList.add("remove");
    tr.appendChild(remove);
    remove.textContent = `Törlés`;
    //módosítás gomb létrehozása
    const save = document.createElement("button");
    save.classList.add("save");
    save.style.visibility = "hidden";
    tr.appendChild(save);
    save.textContent = `Módosítás`;
    //elvetés gomb létrehozása
    const cancel = document.createElement("button");
    cancel.classList.add("cancel");
    cancel.style.visibility = "hidden";
    tr.appendChild(cancel);
    cancel.textContent = `Elvetés`;
  }
  showButtons();
}

setUpTable();

async function deleteUser(user) {
  const response = await fetch(user, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  const users = await response.json();
  console.log(response);
  console.log(users);
}

async function editUser(user) {
  const response = await fetch(user, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(modedUser),
  });
  const users = await response.json();
  console.log(response);
  console.log(users);
}

function showButtons() {
  const editBtn = document.querySelectorAll(".edit");
  const removeBtn = document.querySelectorAll(".remove");
  removeBtn.forEach((element) => {
    element.addEventListener("click", deleteRow);
  });
  function deleteRow(e) {
    let userId = e.target.closest("tr").firstChild.innerHTML;
    e.target.closest("tr").remove();
    deleteUser(`http://localhost:3000/users/${userId}`);
    //console.log(e.target.closest("tr").children[1].value);
  }

  editBtn.forEach((element) => {
    element.addEventListener("click", editRow);
  });

  function editRow(e) {
    let userId = e.target.closest("tr").firstChild.innerHTML;
    let userName = e.target.closest("tr").children[1];
    let emailAddress = e.target.closest("tr").children[2];
    let address = e.target.closest("tr").children[3];
    tempUser = {
      id: userId,
      name: userName.value,
      emailAddress: emailAddress.value,
      address: address.value,
    };
    userName.readOnly = false;
    emailAddress.readOnly = false;
    address.readOnly = false;
    //itt unlock az összes inputot a rowban és disabled az összes másik gomb
    //a mentés és a mégse gomb megjeelnítése
    //a mégse gombra visszalockolom, majd az összes readonlyt true-ra állítom és újra klikkelhetővé teszem a gombokat
    //ha a módosítás gombra kattintok, akkor jön fügvény
  }
}

function mod() {
  let userId = e.target.closest("tr").firstChild.innerHTML;
  let userName = e.target.closest("tr").children[1];
  let emailAddress = e.target.closest("tr").children[2];
  let address = e.target.closest("tr").children[3];
  modedUser = {
    id: userId,
    name: userName.value,
    emailAddress: emailAddress.value,
    address: address.value,
  };
  userName.readOnly = true;
  emailAddress.readOnly = true;
  address.readOnly = true;
  editUser(`http://localhost:3000/users/${userId}`);
}

//tryokat pls
//disabledek legyenek a gombok
//visbilityit használni a gomboknál, azoknak új td
