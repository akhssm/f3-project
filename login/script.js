const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let foundUser = users.find(
    user => user.email === email && user.password === password
  );

  if (!foundUser) {
    alert("Invalid email or password!");
    return;
  }

  // Create user session
  let token = Math.random().toString(36).substring(2);

  localStorage.setItem(
    "currentUser",
    JSON.stringify({
      email: foundUser.email,
      token: token
    })
  );

  alert("Login successful!");

  // ✅ Correct redirect (to shop page)
  window.location.href = "../shop/index.html";
});
