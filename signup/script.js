const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let fname = document.getElementById("fname").value.trim();
  let lname = document.getElementById("lname").value.trim();
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();
  let cpassword = document.getElementById("cpassword").value.trim();

  if (password !== cpassword) {
    alert("Passwords do not match!");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let exists = users.some(user => user.email === email);
  if (exists) {
    alert("User already exists! Please login.");
    return;
  }

  let newUser = {
    fname,
    lname,
    email,
    password
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Signup successful! Please login.");
  window.location.href = "../login/index.html";
});
