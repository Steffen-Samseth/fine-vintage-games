
const LOGIN_LINK = document.getElementById("login-link");

if (localStorage.getItem("auth")) {
  LOGIN_LINK.innerText = "Log out";
  LOGIN_LINK.href = "#";

  LOGIN_LINK.addEventListener("click", (e) => {
    e.preventDefault();

    localStorage.removeItem("auth");
    window.location.reload();
  });

  // Insert admin panel link
  const adminPanelLink = document.createElement("a");
  adminPanelLink.innerText = "Admin panel";
  adminPanelLink.href = "admin.html";
  adminPanelLink.id = "admin-panel-link";

  LOGIN_LINK.parentNode.insertBefore(adminPanelLink, LOGIN_LINK);
}
