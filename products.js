let products = JSON.parse(localStorage.getItem("products")) || [];

displayProducts();

function saveData(){
    localStorage.setItem("products", JSON.stringify(products));
}

function addProduct(){

    let name = document.getElementById("name").value;
    let category = document.getElementById("category").value;
    let price = document.getElementById("price").value;
    let stock = document.getElementById("stock").value;

    if(name=="" || category=="" || price=="" || stock==""){
        alert("Please fill all fields");
        return;
    }

    products.push({
        name:name,
        category:category,
        price:Number(price),
        stock:Number(stock)
    });
    
    // Auto Add Category
let categories = JSON.parse(localStorage.getItem("categories")) || [];

if(!categories.includes(category)){
    categories.push(category);
    localStorage.setItem("categories", JSON.stringify(categories));
}

    saveData();

    displayProducts();

    document.getElementById("name").value="";
    document.getElementById("category").value="";
    document.getElementById("price").value="";
    document.getElementById("stock").value="";
}

function displayProducts(){

    let table = document.getElementById("productTable");

    table.innerHTML="";

    products.forEach((product,index)=>{

        let status="";

        if(product.stock==0){
            status="<span style='color:red;font-weight:bold;'>❌ Out of Stock</span>";
        }
        else if(product.stock<=20){
            status="<span style='color:orange;font-weight:bold;'>⚠ Low Stock</span>";
        }
        else{
            status="<span style='color:green;font-weight:bold;'>✅ In Stock</span>";
        }

        table.innerHTML += `

        <tr>

        <td>${product.name}</td>

        <td>${product.category}</td>

        <td>₱${Number(product.price).toLocaleString("en-PH",{minimumFractionDigits:2})}</td>

        <td>${product.stock}</td>

        <td>${status}</td>

        <td>

        <button class="editBtn" onclick="editProduct(${index})">
        Edit
        </button>

        <button class="deleteBtn" onclick="deleteProduct(${index})">
        Delete
        </button>

        </td>

        </tr>

        `;

    });

}

function editProduct(index){

    let product = products[index];

    let newName = prompt("Product Name", product.name);
    let newCategory = prompt("Category", product.category);
    let newPrice = prompt("Price (₱)", product.price);
    let newStock = prompt("Stock", product.stock);

    if(
        newName !== null &&
        newCategory !== null &&
        newPrice !== null &&
        newStock !== null
    ){

        product.name = newName;
        product.category = newCategory;
        product.price = Number(newPrice);
        product.stock = Number(newStock);

        saveData();

        displayProducts();

        alert("Product updated successfully!");

    }

}

function deleteProduct(index){

    if(confirm("Delete this product?")){

        products.splice(index,1);

        saveData();

        displayProducts();

    }

}

function searchProduct(){

    let keyword = document
    .getElementById("search")
    .value
    .toLowerCase();

    let rows = document.querySelectorAll("#productTable tr");

    rows.forEach(row=>{

        let text = row.textContent.toLowerCase();

        row.style.display =
        text.includes(keyword) ? "" : "none";

    });

}

// Dark Mode

function toggleDarkMode(){

    document.body.classList.toggle("dark");

    localStorage.setItem(
    "darkMode",
    document.body.classList.contains("dark")
    );

}

if(localStorage.getItem("darkMode")=="true"){

    document.body.classList.add("dark");

}

// Logout

function logout(){

    localStorage.removeItem("loggedIn");

    window.location.replace("login.html");

}