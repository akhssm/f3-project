// Write your script here
// Load profile details
function loadProfile() {
    let user = JSON.parse(localStorage.getItem("activeUser"));

    if (!user) {
        alert("You must login first!");
        window.location.href = "../login/index.html";
        return;
    }

    document.getElementById("name").value = user.name;
    document.getElementById("email").value = user.email;
    document.getElementById("password").value = user.password;
}


// Save edited user data
function saveProfile() {
    let updatedName = document.getElementById("name").value;
    let updatedPassword = document.getElementById("password").value;

    if (!updatedName || !updatedPassword) {
        alert("Name and password cannot be empty!");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let currentUser = JSON.parse(localStorage.getItem("activeUser"));

    // Update the user inside users array
    users = users.map(u => {
        if (u.email === currentUser.email) {
            return {
                email: u.email,
                name: updatedName,
                password: updatedPassword
            };
        }
        return u;
    });

    // Save updated data back to localStorage
    localStorage.setItem("users", JSON.stringify(users));

    // Update activeUser
    localStorage.setItem("activeUser", JSON.stringify({
        email: currentUser.email,
        name: updatedName,
        password: updatedPassword
    }));

    alert("Profile Updated Successfully!");
}


// Logout user
function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("activeUser");

    alert("Logged out!");

    window.location.href = "../login/index.html";
}
