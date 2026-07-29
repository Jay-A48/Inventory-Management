let products=JSON.parse(localStorage.getItem("products"))||[];

let table=document.getElementById("reportTable");

let totalProducts=products.length;

let totalStock=0;

let totalValue=0;

products.forEach(product=>{

totalStock+=product.stock;

totalValue+=product.price*product.stock;

table.innerHTML+=`

<tr>

<td>${product.name}</td>

<td>${product.category}</td>

<td>₱${product.price}</td>

<td>${product.stock}</td>

<td>₱${(product.price*product.stock).toFixed(2)}</td>

</tr>

`;

});

document.getElementById("summary").innerHTML=`

<h3>Total Products : ${totalProducts}</h3>

<h3>Total Stock : ${totalStock}</h3>

<h3>Total Inventory Value : ₱${totalValue.toFixed(2)}</h3>

`;

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

function logout(){

    localStorage.removeItem("loggedIn");

    window.location.replace("login.html");

}