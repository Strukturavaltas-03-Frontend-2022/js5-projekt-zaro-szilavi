let toastContainer;

(function initToast() {
  document.body.insertAdjacentHTML(
    "afterbegin",
    `<div class="toast__container"</div>`
  );
  toastContainer = document.querySelector(".toast__container");
})();

function createDeleteUserToast() {
  toastContainer.insertAdjacentHTML(
    "beforeend",
    `<p class='deleteUserToast'>
    Sikeresen törölted a felhasználót!
    </p>`
  );
  const toast = toastContainer.lastElementChild;
  toast.addEventListener("animationend", () => {
    toast.remove();
  });
}

function createModifiUserToast() {
  toastContainer.insertAdjacentHTML(
    "beforeend",
    `<p class='modifiUserToast'>
    Sikeresen módosítottad a felhasználó adatait!
    </p>`
  );
  const toast = toastContainer.lastElementChild;
  toast.addEventListener("animationend", () => {
    toast.remove();
  });
}

function createNewUserToast() {
  toastContainer.insertAdjacentHTML(
    "beforeend",
    `<p class='NewUserToast'>
    Sikeresen hozzáadtál egy új felhasználót a listához!
    </p>`
  );
  const toast = toastContainer.lastElementChild;
  toast.addEventListener("animationend", () => {
    toast.remove();
  });
}
