// ===============================
// Login Protection
// ===============================

if(localStorage.getItem("loggedIn") !== "true"){
    window.location.href = "login.html";
}

// ===============================
// Welcome User
// ===============================

document.getElementById("welcomeUser").textContent =
"Welcome, " + localStorage.getItem("username");

// ===============================
// Load Products
// ===============================

let products = JSON.parse(localStorage.getItem("products")) || [];

// ===============================
// Dashboard
// ===============================

function dashboard(){

    // Reload latest products
    products = JSON.parse(localStorage.getItem("products")) || [];

    // Dashboard Cards
    document.getElementById("totalProducts").textContent = products.length;

    let low = 0;
    let out = 0;

    // Tables
    const recentTable = document.getElementById("recentProducts");
    const lowTable = document.getElementById("lowStockList");
    const outTable = document.getElementById("outStockList");

    recentTable.innerHTML = "";
    lowTable.innerHTML = "";
    outTable.innerHTML = "";

    // Show latest 5 products
    products.slice(-5).reverse().forEach(product => {

        recentTable.innerHTML += `
        <tr>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>₱${Number(product.price).toLocaleString("en-PH",{minimumFractionDigits:2})}</td>
            <td>${product.stock}</td>
        </tr>
        `;

    });

    // Low Stock & Out of Stock
    products.forEach(product => {

        // Low Stock (1-20)

        if(product.stock > 0 && product.stock <= 20){

            low++;

            lowTable.innerHTML += `
            <tr>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${product.stock}</td>
            </tr>
            `;

        }

        // Out of Stock

        if(product.stock == 0){

            out++;

            outTable.innerHTML += `
            <tr>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>₱${Number(product.price).toLocaleString("en-PH",{minimumFractionDigits:2})}</td>
            </tr>
            `;

        }

    });

    // Update Dashboard Counters
    document.getElementById("lowStock").textContent = low;
    document.getElementById("outStock").textContent = out;

}

// Load Dashboard
dashboard();

// ===============================
// Dark Mode
// ===============================

function toggleDarkMode(){

    document.body.classList.toggle("dark");

    localStorage.setItem(
        "darkMode",
        document.body.classList.contains("dark")
    );

}

if(localStorage.getItem("darkMode") === "true"){
    document.body.classList.add("dark");
}

// ===============================
// Logout
// ===============================

function logout(){

    if(confirm("Are you sure you want to logout?")){

        localStorage.removeItem("loggedIn");

        window.location.replace("login.html");

    }

}