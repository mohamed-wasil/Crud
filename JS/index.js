var productNameInput = document.getElementById("productNameInput");
var productPriceInput = document.getElementById("productPriceInput");
var productCategoryInput = document.getElementById("productCategoryInput");
var productDescInput = document.getElementById("productDescInput");
var productCountInput = document.getElementById("productCountInput");
var productSearchInput = document.getElementById("productSearchInput");

// arry contain many product as object
productContainer = [];

if (localStorage.getItem("product") != null) {
    productContainer = JSON.parse(localStorage.getItem("product"));
    displayProducut();
}


// Add function 
function addProduct() {
    if (productNameInput.value != "" && productPriceInput.value != "" && productCategoryInput.value != "" && productDescInput.value != "") {
        var product = {
            name: productNameInput.value,
            price: productPriceInput.value,
            category: productCategoryInput.value,
            desc: productDescInput.value,
            count: productCountInput.value
        }
        productContainer.push(product);
        localStorage.setItem("product", JSON.stringify(productContainer));
        displayProducut();
        clearInputs()
    }
}

// Clear function
function clearInputs() {
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescInput.value = "";
    productCountInput.value = "";
}

// Display function
function displayProducut() {
    var productBox = "";
    for (var i = 0; i < productContainer.length; i++) {
        productBox += `
                <tr>
                        <td class="bg-light">${i + 1}</td>
                        <td>${productContainer[i].name} </td>
                        <td class="bg-light">${productContainer[i].category} </td>
                        <td>${calcRandomPrice(productContainer[i].price, productContainer[i].count)} </td>
                        <td>${productContainer[i].count}</td>
                        <td class="bg-light">${productContainer[i].desc} </td>
                        <td><button class="btn btn-warning" onclick="updateProduct(${i})">Update</button></td>  
                        <td class="bg-light"><button class="btn btn-danger" onclick="deleteProduct(${i})">Delete One</button></td>
                </tr>
        `
    }
    document.getElementById("tableBody").innerHTML = productBox;
}

// function to know type of search
var searchType = "name";
function getSearchType(btnId) {
    if (btnId == "SearchByName") {
        searchType = "name"
    }
    else {
        searchType = "category"
    }
    console.log(searchType);
    productSearchInput.placeholder = "Search by " + searchType;
    productSearchInput.focus();
    productSearchInput.value = "";
    displayProducut();
}

// search function
function SearchProducts(key) {
    var productBox = ``;
    for (var i = 0; i < productContainer.length; i++) {
        if (searchType == "name") {
            if (productContainer[i].name.toUpperCase().includes(key.toUpperCase().trim())) {
                productBox += `
                    <tr>
                        <td class="bg-light">${i + 1}</td>
                        <td>${productContainer[i].name} </td>
                        <td class="bg-light">${productContainer[i].category} </td>
                        <td>${calcRandomPrice(productContainer[i].price, productContainer[i].count)} </td>
                        <td>${productContainer[i].count}</td>
                        <td class="bg-light">${productContainer[i].desc} </td>
                        <td><button class="btn btn-warning" onclick="updateProduct(${i})">Update</button></td>  
                        <td class="bg-light"><button class="btn btn-danger" onclick="deleteProduct(${i})">Delete One</button></td>
                    </tr>
            `
            }
        }
        else {
            if (productContainer[i].category.toUpperCase().includes(key.toUpperCase().trim())) {
                productBox += `
                    <tr>
                        <td class="bg-light">${i + 1}</td>
                        <td>${productContainer[i].name} </td>
                        <td class="bg-light">${productContainer[i].category} </td>
                        <td>${calcRandomPrice(productContainer[i].price, productContainer[i].count)} </td>
                        <td>${productContainer[i].count}</td>
                        <td class="bg-light">${productContainer[i].desc} </td>
                        <td><button class="btn btn-warning" onclick="updateProduct(${i})">Update</button></td>  
                        <td class="bg-light"><button class="btn btn-danger" onclick="deleteProduct(${i})">Delete One</button></td>
                    </tr>
            `
            }
        }

    }
    document.getElementById("tableBody").innerHTML = productBox;
}

// Delete all Function
function deleteAll() {
    productContainer.splice(0);
    localStorage.setItem("product", JSON.stringify(productContainer));
    displayProducut();
    clearInputs();
}

// delete item function
function deleteProduct(itemDelete) {
    if (productContainer[itemDelete].count > 1) {
        productContainer[itemDelete].count--;
    }
    else {
        productContainer.splice(itemDelete, 1);
    }
    localStorage.setItem("product", JSON.stringify(productContainer));
    displayProducut();
}

// Update function 
var currentIndex; // global to us it in saveChange function
function updateProduct(itemUpdate) {
    currentIndex = itemUpdate;

    // to show data of product which you need to update
    productNameInput.value = productContainer[itemUpdate].name;
    productPriceInput.value = productContainer[itemUpdate].price;
    productCategoryInput.value = productContainer[itemUpdate].category;
    productDescInput.value = productContainer[itemUpdate].desc;
    productCountInput.value = productContainer[itemUpdate].count;

    // to hidden button of add and add button update
    document.getElementById("addButton").style.display = "none"
    document.getElementById("updateButton").style.display = "inline-block"
}

function saveChange() {1
    // to add update in array
    productContainer[currentIndex].name = productNameInput.value;
    productContainer[currentIndex].price = productPriceInput.value;
    productContainer[currentIndex].category = productCategoryInput.value;
    productContainer[currentIndex].desc = productDescInput.value;
    productContainer[currentIndex].count = productCountInput.value;

    // to add update in local storage
    localStorage.setItem("product", JSON.stringify(productContainer));
    displayProducut();
    clearInputs();

    // to hidden button of update and add button add
    document.getElementById("addButton").style.display = "inline-block"
    document.getElementById("updateButton").style.display = "none"
}

// to calc random price
function calcRandomPrice(priceOfProduct, countOFProduct) {
    var randomPrice = priceOfProduct * countOFProduct;
    return randomPrice;
}






