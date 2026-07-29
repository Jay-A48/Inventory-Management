function dashboard(){

    let products = JSON.parse(localStorage.getItem("products")) || [];
    let categories = JSON.parse(localStorage.getItem("categories")) || [];
    let suppliers = JSON.parse(localStorage.getItem("suppliers")) || [];

    document.getElementById("totalProducts").textContent = products.length;
    document.getElementById("totalCategories").textContent = categories.length;
    document.getElementById("totalSuppliers").textContent = suppliers.length;

    let totalValue = 0;
    let lowStock = 0;
    let outStock = 0;

    let recentTable = document.getElementById("recentProducts");
    let lowTable = document.getElementById("lowStockList");
    let outTable = document.getElementById("outStockList");

    recentTable.innerHTML = "";
    lowTable.innerHTML = "";
    outTable.innerHTML = "";

    products.forEach(product => {

        totalValue += Number(product.price) * Number(product.stock);

        let status = "";

        if(product.stock == 0){

            status = "❌ Out of Stock";
            outStock++;

            outTable.innerHTML += `
            <tr>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>₱${Number(product.price).toLocaleString("en-PH",{minimumFractionDigits:2})}</td>
            </tr>`;

        }
        else if(product.stock <= 20){

            status = "⚠ Low Stock";
            lowStock++;

            lowTable.innerHTML += `
            <tr>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${product.stock}</td>
            </tr>`;

        }
        else{

            status = "✅ In Stock";

        }

        recentTable.innerHTML += `
        <tr>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>₱${Number(product.price).toLocaleString("en-PH",{minimumFractionDigits:2})}</td>
            <td>${product.stock}</td>
            <td>${status}</td>
        </tr>`;
    });

    document.getElementById("totalValue").textContent =
        "₱" + totalValue.toLocaleString("en-PH",{minimumFractionDigits:2});

    document.getElementById("lowStock").textContent = lowStock;
    document.getElementById("outStock").textContent = outStock;
}

dashboard();