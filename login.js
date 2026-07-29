// Create default account only once
if (localStorage.getItem("username") === null) {
    localStorage.setItem("username", "admin");
    localStorage.setItem("password", "admin123");
}

// Login
function login() {

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let savedUser = localStorage.getItem("username");
    let savedPass = localStorage.getItem("password");

    if (username === savedUser && password === savedPass) {

        localStorage.setItem("loggedIn", "true");

        window.location.href = "index.html";

    } else {

        document.getElementById("message").innerHTML =
            "Invalid Username or Password";

    }
}

// Show / Hide Password
function showPassword() {

    let pass = document.getElementById("password");

    if (pass.type === "password") {
        pass.type = "text";
    } else {
        pass.type = "password";
    }
}

// Change Username & Password
function changeCredentials() {

    let currentUser = prompt("Enter Current Username:");
    let currentPass = prompt("Enter Current Password:");

    if (
        currentUser === localStorage.getItem("username") &&
        currentPass === localStorage.getItem("password")
    ) {

        let newUser = prompt("Enter New Username:");
        let newPass = prompt("Enter New Password:");

        if (
            newUser !== null &&
            newPass !== null &&
            newUser.trim() !== "" &&
            newPass.trim() !== ""
        ) {

            localStorage.setItem("username", newUser);
            localStorage.setItem("password", newPass);

            alert("Username and Password changed successfully!");

        } else {

            alert("Username or Password cannot be empty.");

        }

    } else {

        alert("Current Username or Password is incorrect.");

    }
}

// Dark Mode
function toggleDarkMode() {

    document.body.classList.toggle("dark");

    localStorage.setItem(
        "darkMode",
        document.body.classList.contains("dark")
    );
}

// Load Dark Mode
if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
}