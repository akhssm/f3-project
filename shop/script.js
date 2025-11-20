const productContainer = document.getElementById("products");
const searchInput = document.getElementById("search");
const categoryFilters = document.querySelectorAll(".filter-category");
const applyBtn = document.getElementById("apply-filters");

let productList = [];

// LOAD PRODUCTS
async function loadProducts() {
  let res = await fetch("https://fakestoreapi.com/products");
  productList = await res.json();
  displayProducts(productList);
}
loadProducts();

// DISPLAY PRODUCTS
function displayProducts(products) {
  productContainer.innerHTML = "";

  products.forEach(product => {
    let card = document.createElement("div");
    card.classList.add("item");

    card.innerHTML = `
      <img src="${product.image}" alt="Product Image">

      <div class="info">
        <div class="row">
          <div class="price">$${product.price}</div>
          <div class="sized">S, M, L</div>
        </div>

        <div class="colors">
          Colors:
          <div class="row">
            <div class="circle" style="background:black"></div>
            <div class="circle" style="background:#4938af"></div>
            <div class="circle" style="background:#203d3e"></div>
          </div>
        </div>

        <div class="row">Rating: ${product.rating.rate}</div>
      </div>

      <button class="add-btn">Add To Cart</button>
    `;

    card.querySelector(".add-btn").addEventListener("click", () => {
      addToCart(product);
    });

    productContainer.appendChild(card);
  });
}

// ADD TO CART
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push({
    id: product.id,
    title: product.title,
    price: product.price,
    image: product.image,
  });

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Item added to cart!");
}

// DEFAULT SORT BY PRICE (LOW → HIGH)
function sortProducts(list) {
  return [...list].sort((a, b) => a.price - b.price);
}

// APPLY FILTERS
function applyAllFilters() {
  let filtered = [...productList];

  // SEARCH FILTER
  let searchValue = searchInput.value.toLowerCase();
  if (searchValue) {
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(searchValue)
    );
  }

  // CATEGORY FILTER (FIXED)
  let activeCat = document
    .querySelector(".filter-category.active")
    .getAttribute("value");

  if (activeCat && activeCat !== "") {
    filtered = filtered.filter(
      p => p.category.toLowerCase() === activeCat.toLowerCase()
    );
  }

  // RATING FILTER
  let ratingValue = document.getElementById("rating-range").value;
  filtered = filtered.filter(p => p.rating.rate >= ratingValue);

  // PRICE FILTER
  let priceChecks = [...document.querySelectorAll(".price-filter:checked")];
  if (priceChecks.length > 0) {
    filtered = filtered.filter(p => {
      return priceChecks.some(box => {
        let range = box.value;

        if (range === "0-25") return p.price <= 25;
        if (range === "25-50") return p.price > 25 && p.price <= 50;
        if (range === "50-100") return p.price > 50 && p.price <= 100;
        if (range === "100+") return p.price > 100;
      });
    });
  }

  // DEFAULT SORT: LOW → HIGH
  filtered = sortProducts(filtered);

  displayProducts(filtered);
}

// EVENT LISTENERS
applyBtn.addEventListener("click", applyAllFilters);
searchInput.addEventListener("input", applyAllFilters);

categoryFilters.forEach(filter => {
  filter.addEventListener("click", () => {
    categoryFilters.forEach(f => f.classList.remove("active"));
    filter.classList.add("active");

    // Auto update category on click
    applyAllFilters();
  });
});
