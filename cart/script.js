// Load cart from localStorage
function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let container = document.getElementById("cart-container");
    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = "<h2>Your cart is empty</h2>";
        document.getElementById("total-price").innerText = 0;
        return;
    }

    container.innerHTML = "";

    cart.forEach((item, index) => {
        total += item.price * item.qty;

        container.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" />

                <div class="cart-details">
                    <div class="cart-title">${item.title}</div>
                    <div class="cart-price">₹ ${item.price}</div>
                </div>

                <button class="remove-btn" onclick="removeItem(${index})">
                    Remove
                </button>
            </div>
        `;
    });

    document.getElementById("total-price").innerText = total;
}

// Remove item from cart
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

// Start Razorpay payment
function payNow() {
    let total = Number(document.getElementById("total-price").innerText);

    var options = {
        key: "rzp_test_123456789",  // Replace with your Razorpay test key
        amount: total * 100,
        currency: "INR",
        name: "MeShop Payment",
        description: "Order Checkout",

        handler: function (response) {
            alert("Payment Successful!");
            localStorage.removeItem("cart");
            window.location.href = "../razorpay/success.html";
        }
    };

    let rzp = new Razorpay(options);
    rzp.open();
}
