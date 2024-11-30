var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productDescInput = document.getElementById("productDesc");
var productCategoryInput = document.getElementById("productCategory");
var productImageInput = document.getElementById("productImage");
var searchInput = document.getElementById("searchInput");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");

var updatedIndex;
var productsContainer = [];

if (localStorage.getItem("Products") !== null) {
  productsContainer = JSON.parse(localStorage.getItem("Products"));
  displayProduct(productsContainer);
}

function addProduct() {
  // console.log(productImageInput.files[0].name);
  // console.log(productImageInput.value);
  var dataError = document.getElementById("dataError");
  if (
    validateProductName() &&
    validateProductPrice() &&
    validateProductCategory() &&
    validateProductDesc()
  ) {
    dataError.classList.add("d-none");
    var product = {
      code: productNameInput.value,
      price: productPriceInput.value,
      category: productCategoryInput.value,
      desc: productDescInput.value,
      image: `imgs/${productImageInput.files[0]?.name}`,
    };
    productsContainer.push(product);
    localStorage.setItem("Products", JSON.stringify(productsContainer));
    displayProduct(productsContainer);
    clearForm();
  } else {
    dataError.classList.remove("d-none");
  }
}

function clearForm() {
  productNameInput.value = null;
  productPriceInput.value = null;
  productCategoryInput.value = null;
  productDescInput.value = null;
  productImageInput.value = null;
}

function displayProduct(arr) {
  var cartona = ``;
  for (var i = 0; i < arr.length; i++) {
    cartona += `
        <div class="col-lg-3 col-md-4 col-sm-6">
          <div class="card border-0">
            <img
              class="w-100"
              src="${arr[i].image}"
              alt=""
            />
            <div class="card-footer bg-white">
              <h3 class="h6">
                <span class="fw-bold">Name: ${arr[i].code}
              </h3>
              <p class="text-secondary mb-2">${arr[i].desc}</p>
              <h3 class="h6"><span class="fw-bold">Price: </span>${arr[i].price}</h3>
              <h3 class="h6"><span class="fw-bold">Category: </span>${arr[i].category}</h3>
            </div>
            <button onclick = 'deleteProduct(${i})' class = 'btn btn-outline-danger btn-sm w-100 my-2'>Delete<i class="fas fa-trash ps-1"></i></button>
            <button onclick = 'setFormForUpdate(${i})' class = 'btn btn-outline-warning btn-sm w-100 my-2 pe-1'>Update<i class="fas fa-pen ps-1"></i></button>
          </div>
        </div>`;
  }

  document.getElementById("rowData").innerHTML = cartona;
}

function deleteProduct(deletedIndex) {
  productsContainer.splice(deletedIndex, 1);
  displayProduct(productsContainer);
  localStorage.setItem("Products", JSON.stringify(productsContainer));
  console.log(productsContainer);
}

function searchProducts() {
  var term = searchInput.value;
  var searchResult = [];
  for (var i = 0; i < productsContainer.length; i++) {
    if (productsContainer[i].code.toLowerCase().includes(term.toLowerCase())) {
      searchResult.push(productsContainer[i]);
    }
    displayProduct(searchResult);
  }
}

function setFormForUpdate(i) {
  updatedIndex = i;
  addBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
  productNameInput.value = productsContainer[i].code;
  productPriceInput.value = productsContainer[i].price;
  productCategoryInput.value = productsContainer[i].category;
  productDescInput.value = productsContainer[i].desc;
}

function updateProduct() {
  addBtn.classList.remove("d-none");
  updateBtn.classList.add("d-none");

  productsContainer[updatedIndex].code = productNameInput.value;
  productsContainer[updatedIndex].price = productPriceInput.value;
  productsContainer[updatedIndex].desc = productDescInput.value;
  productsContainer[updatedIndex].category = productCategoryInput.value;

  displayProduct(productsContainer);
  localStorage.setItem("Products", JSON.stringify(productsContainer));
  clearForm();
}

function validateProductName() {
  var regex = /^[A-Z][a-z]{1,10}$/;
  validateProductPrice();
  validateProductDesc();
  validateProductCategory();
  var nameError = document.getElementById("nameError");
  if (regex.test(productNameInput.value)) {
    productNameInput.classList.add("is-valid");
    productNameInput.classList.remove("is-invalid");
    nameError.classList.add("d-none");
    return true;
  } else {
    productNameInput.classList.remove("is-valid");
    productNameInput.classList.add("is-invalid");
    nameError.classList.remove("d-none");
    return false;
  }
}

function validateProductPrice() {
  var regex = /^(100|[1-9]\d{2,4}|100000)$/;

  var priceError = document.getElementById("priceError");
  if (regex.test(productPriceInput.value)) {
    productPriceInput.classList.add("is-valid");
    productPriceInput.classList.remove("is-invalid");
    priceError.classList.add("d-none");
    return true;
  } else {
    productPriceInput.classList.remove("is-valid");
    productPriceInput.classList.add("is-invalid");
    priceError.classList.remove("d-none");
    return false;
  }
}

function validateProductCategory() {
  var regex = /^(TV|Mobile|Laptop|Screen|Electronics|Other)$/;
  var categoryError = document.getElementById("categoryError");
  if (regex.test(productCategoryInput.value)) {
    productCategoryInput.classList.add("is-valid");
    productCategoryInput.classList.remove("is-invalid");
    categoryError.classList.add("d-none");
    return true;
  } else {
    productCategoryInput.classList.remove("is-valid");
    productCategoryInput.classList.add("is-invalid");
    categoryError.classList.remove("d-none");
    return false;
  }
}

function validateProductDesc() {
  var regex = /^.{3,}$/;
  var ProductDescError = document.getElementById("ProductDescError");
  if (regex.test(productDescInput.value)) {
    productDescInput.classList.add("is-valid");
    productDescInput.classList.remove("is-invalid");
    ProductDescError.classList.add("d-none");
    return true;
  } else {
    productDescInput.classList.remove("is-valid");
    productDescInput.classList.add("is-invalid");
    ProductDescError.classList.remove("d-none");
    return false;
  }
}
