function showMessage() {
  alert("Welcome to CleanTO!");
}
document.addEventListener("DOMContentLoaded", function () {

  const modal = document.getElementById("signupModal");
  const openBtn = document.getElementById("openSignup");
  const closeBtn = document.querySelector(".close");
  const form = document.getElementById("signupForm");
  const message = document.getElementById("message");

  if (openBtn) {
    openBtn.onclick = function () {
      modal.style.display = "block";
    };
  }

  if (closeBtn) {
    closeBtn.onclick = function () {
      modal.style.display = "none";
    };
  }

  window.onclick = function (e) {
    if (e.target == modal) {
      modal.style.display = "none";
    }
  };

  if (form) {
    form.onsubmit = function (e) {
      e.preventDefault();

      let name = document.getElementById("name").value;
      let email = document.getElementById("email").value;

      if (name === "" || email === "") {
        message.innerText = "Please fill all fields!";
        message.className = "error";
      } else {
        message.innerText = "Signup completed successfully!";
        message.className = "success";
        form.reset();
      }
    };
  }

});