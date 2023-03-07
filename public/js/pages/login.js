import { login } from "../api.js";

const LOGIN_FORM = document.getElementById("login-form");
const EMAIL = document.getElementById("email");
const PASSWORD = document.getElementById("password");

LOGIN_FORM.addEventListener("submit", async (e) => {
  e.preventDefault();

  const result = await login(EMAIL.value, PASSWORD.value);

  if (result.error) {
    alert("Login failed: " + result.message[0].messages[0].message);
    return;
  }

  localStorage.setItem("auth", result.jwt);
  alert("Login succeeded!");

  window.location = "admin.html";
});
