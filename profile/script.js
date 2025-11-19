// Load user profile on page load
window.onload = function () {
  loadProfile();
};

// Load profile details
function loadProfile() {
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (!currentUser || !currentUser.email) {
    alert("You must login first!");
    window.location.href = "../login/index.html";
    return;
  }

  // Find logged-in user data
  let user = users.find(u => u.email === currentUser.email);

  if (!user) {
    alert("User not found!");
    return;
  }

  // Fill profile inputs
  document.getElementById("fname").value = user.fname;
  document.getElementById("lname").value = user.lname;
}



// Save updated name information
document.getElementById("profileForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  let users = JSON.parse(localStorage.getItem("users")) || [];

  let updatedFname = document.getElementById("fname").value.trim();
  let updatedLname = document.getElementById("lname").value.trim();

  if (!updatedFname || !updatedLname) {
    alert("All fields are required!");
    return;
  }

  // Update the user inside users array
  users = users.map(u => {
    if (u.email === currentUser.email) {
      return {
        ...u,
        fname: updatedFname,
        lname: updatedLname
      };
    }
    return u;
  });

  // Save back to localStorage
  localStorage.setItem("users", JSON.stringify(users));

  alert("Profile updated successfully!");
});




// Handle password change
document.getElementById("passwordForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  let users = JSON.parse(localStorage.getItem("users")) || [];

  let oldPass = document.getElementById("oldpass").value.trim();
  let newPass = document.getElementById("newpass").value.trim();
  let cnewPass = document.getElementById("cnewpass").value.trim();

  let user = users.find(u => u.email === currentUser.email);

  if (!user) {
    alert("User not found!");
    return;
  }

  // Old password check
  if (oldPass !== user.password) {
    alert("Old password is incorrect!");
    return;
  }

  if (!newPass) {
    alert("New password cannot be empty!");
    return;
  }

  if (newPass !== cnewPass) {
    alert("New passwords do not match!");
    return;
  }

  // Update password
  users = users.map(u => {
    if (u.email === currentUser.email) {
      return {
        ...u,
        password: newPass
      };
    }
    return u;
  });

  localStorage.setItem("users", JSON.stringify(users));

  alert("Password changed successfully!");
});




// Logout
document.querySelector(".logout").addEventListener("click", function () {
  localStorage.removeItem("currentUser");
  alert("Logged out!");
  window.location.href = "../login/index.html";
});
