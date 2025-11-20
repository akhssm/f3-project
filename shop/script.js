const productContainer = document.getElementById("products");
const searchInput = document.getElementById("search");
const categoryFilters = document.querySelectorAll(".filter-category");

let productList = [];

async function loadProducts() {
  try {
    let res = await fetch("https://fakestoreapi.com/products");
    productList = await res.json();
    displayProducts(productList);
  } catch (err) {
    console.log("Error fetching products:", err);
  }
}
loadProducts();

function displayProducts(products) {
  productContainer.innerHTML = "";

  products.forEach(product => {
    let card = document.createElement("div");
    card.classList.add("item");

    card.innerHTML = `
      <img src="${product.image}" alt="Product Image" />

      <div class="info">
        <div class="row">
          <div class="price">$${product.price}</div>
          <div class="sized">S, M, L</div>
        </div>

        <div class="colors">
          Colors:
          <div class="row">
            <div class="circle" style="background-color:black"></div>
            <div class="circle" style="background-color:#4938af"></div>
            <div class="circle" style="background-color:#203d3e"></div>
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

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push({
    id: product.id,
    title: product.title,
    price: product.price,
    image: product.image
  });

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Item added to cart!");
}

searchInput.addEventListener("input", () => {
  let value = searchInput.value.toLowerCase();
  let filtered = productList.filter(p =>
    p.title.toLowerCase().includes(value)
  );
  displayProducts(filtered);
});

categoryFilters.forEach(filter => {
  filter.addEventListener("click", () => {
    categoryFilters.forEach(f => f.classList.remove("active"));
    filter.classList.add("active");

    let selectedCategory = filter.getAttribute("value");

    if (selectedCategory === "") {
      displayProducts(productList);
      return;
    }

    let filtered = productList.filter(
      p => p.category.toLowerCase() === selectedCategory.toLowerCase()
    );

    displayProducts(filtered);
  });
});
