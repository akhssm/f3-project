document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let fname = document.getElementById("fname").value;
  let lname = document.getElementById("lname").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let cpassword = document.getElementById("cpassword").value;

  if (password !== cpassword) {
    alert("Passwords do not match!");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if user already exists
  if (users.some(u => u.email === email)) {
    alert("User already exists!");
    return;
  }

  let newUser = {
    name: fname + " " + lname,
    email,
    password
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Signup Successful!");
  window.location.href = "../login/index.html";
});
