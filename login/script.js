document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let found = users.find(u => u.email === email && u.password === password);

  if (!found) {
    alert("Invalid email or password!");
    return;
  }

  localStorage.setItem("activeUser", JSON.stringify(found));
  localStorage.setItem("token", Math.random().toString(36).substring(2));

  alert("Login Successful!");
  window.location.href = "../profile/index.html";
});
