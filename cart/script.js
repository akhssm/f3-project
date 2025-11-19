const cartContainer = document.getElementById("cart-container");
const checkoutList = document.getElementById("checkout-list");
const totalBox = document.getElementById("total");
const checkoutBtn = document.getElementById("checkoutBtn");

/* ============================
   LOAD CART ITEMS
============================ */

function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cartContainer.innerHTML = "";
    checkoutList.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<h2>Your cart is empty.</h2>";
        totalBox.innerText = "₹0";
        return;
    }

    cart.forEach((item, index) => {
        total += Number(item.price);

        let div = document.createElement("div");
        div.classList.add("cart-item");

        div.innerHTML = `
            <img src="${item.image}" />
            <div class="cart-details">
                <h3 class="cart-title">${item.title}</h3>
                <p class="cart-price">₹${item.price}</p>
            </div>
            <button class="remove-btn" data-index="${index}">Remove</button>
        `;

        cartContainer.appendChild(div);

        let li = document.createElement("li");
        li.innerHTML = `<span>${index + 1}. ${item.title}</span> <span>₹${item.price}</span>`;
        checkoutList.appendChild(li);
    });

    totalBox.innerText = "₹" + total;

    document.querySelectorAll(".remove-btn").forEach(btn => {
        btn.addEventListener("click", removeItem);
    });
}

function removeItem(e) {
    let index = e.target.dataset.index;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

loadCart();

/* ============================
   PAYMENT BUTTON (Razorpay)
============================ */

checkoutBtn.addEventListener("click", function (e) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let total = cart.reduce((sum, item) => sum + Number(item.price), 0);

    let options = {
        key: "<API_KEY>", 
        amount: total * 100,
        currency: "INR",
        name: "MeShop Checkout",
        description: "Payment for your cart items",
        theme: { color: "#000" },

        handler: function () {
            alert("Payment Successful!");
            localStorage.removeItem("cart");
            loadCart();
        }
    };

    let payment = new Razorpay(options);
    payment.open();

    e.preventDefault();
});
