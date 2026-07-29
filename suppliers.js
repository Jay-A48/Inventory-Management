let suppliers = JSON.parse(localStorage.getItem("suppliers")) || [];

displaySuppliers();

function saveSuppliers(){
localStorage.setItem("suppliers",JSON.stringify(suppliers));
}

function addSupplier(){

let name=document.getElementById("supplierName").value;
let phone=document.getElementById("supplierPhone").value;
let email=document.getElementById("supplierEmail").value;
let address=document.getElementById("supplierAddress").value;

if(name==""||phone==""||email==""||address==""){
alert("Complete all fields");
return;
}

suppliers.push({
name,
phone,
email,
address
});

saveSuppliers();

displaySuppliers();

document.getElementById("supplierName").value="";
document.getElementById("supplierPhone").value="";
document.getElementById("supplierEmail").value="";
document.getElementById("supplierAddress").value="";
}

function displaySuppliers(){

let table=document.getElementById("supplierTable");

table.innerHTML="";

suppliers.forEach((supplier,index)=>{

table.innerHTML+=`

<tr>

<td>${supplier.name}</td>

<td>${supplier.phone}</td>

<td>${supplier.email}</td>

<td>${supplier.address}</td>

<td>

<button onclick="editSupplier(${index})">Edit</button>

<button class="deleteBtn" onclick="deleteSupplier(${index})">Delete</button>

</td>

</tr>

`;

});

}

function editSupplier(index){

let s=suppliers[index];

s.name=prompt("Supplier Name",s.name);
s.phone=prompt("Phone",s.phone);
s.email=prompt("Email",s.email);
s.address=prompt("Address",s.address);

saveSuppliers();

displaySuppliers();

}

function deleteSupplier(index){

if(confirm("Delete Supplier?")){

suppliers.splice(index,1);

saveSuppliers();

displaySuppliers();

}

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

function logout(){

    localStorage.removeItem("loggedIn");

    window.location.replace("login.html");

}