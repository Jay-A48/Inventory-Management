// ===============================
// Load Categories
// ===============================

let categories = JSON.parse(localStorage.getItem("categories")) || [];

displayCategories();

// ===============================
// Save Categories
// ===============================

function saveCategory(){
    localStorage.setItem("categories", JSON.stringify(categories));
}

// ===============================
// Add Category
// ===============================

function addCategory(){

    let name = document.getElementById("categoryName").value.trim();

    if(name === ""){
        alert("Please enter a category.");
        return;
    }

    // Prevent duplicate categories
    if(categories.includes(name)){
        alert("Category already exists.");
        return;
    }

    categories.push(name);

    saveCategory();

    displayCategories();

    document.getElementById("categoryName").value = "";

}

// ===============================
// Display Categories
// ===============================

function displayCategories(){

    let table = document.getElementById("categoryTable");

    table.innerHTML = "";

    // Get all products
    let products = JSON.parse(localStorage.getItem("products")) || [];

    categories.forEach((category,index)=>{

        // Find all products in this category
        let productList = products
            .filter(product => product.category === category)
            .map(product => product.name)
            .join(", ");

        if(productList === ""){
            productList = "No Products";
        }

        table.innerHTML += `
        <tr>
            <td>${category}</td>

            <td>${productList}</td>

            <td>
                <button class="editBtn" onclick="editCategory(${index})">
                    Edit
                </button>

                <button class="deleteBtn" onclick="deleteCategory(${index})">
                    Delete
                </button>
            </td>
        </tr>
        `;

    });

}

// ===============================
// Edit Category
// ===============================

function editCategory(index){

    let newName = prompt("Edit Category", categories[index]);

    if(newName !== null){

        newName = newName.trim();

        if(newName === ""){
            alert("Category cannot be empty.");
            return;
        }

        if(categories.includes(newName)){
            alert("Category already exists.");
            return;
        }

        categories[index] = newName;

        saveCategory();

        displayCategories();

    }

}

// ===============================
// Delete Category
// ===============================

function deleteCategory(index){

    if(confirm("Delete this category?")){

        categories.splice(index,1);

        saveCategory();

        displayCategories();

    }

}

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

    localStorage.removeItem("loggedIn");

    window.location.replace("login.html");

}