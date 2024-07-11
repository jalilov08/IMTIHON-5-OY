document.addEventListener("DOMContentLoaded", displayCart);

function displayCart() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsContainer = document.getElementById("cart-items");
  cartItemsContainer.innerHTML = ""; 

  let totalOldPrice = 0;

  if (cartItems.length == 0) {
    cartItemsContainer.innerHTML = "<p>Корзина пуста.</p>";
    cartItemsContainer.style.textAlign = 'center';
    cartItemsContainer.style.fontSize = '40px';
    cartItemsContainer.style.marginTop = '250px';
    document.getElementById("totalOldPrice").textContent = `$${totalOldPrice.toFixed(2)}`;
    return;
  }

  cartItems.forEach((product) => {
    const itemHtml = `
      <div class="item">
        <img src="${product.image}" alt="${product.name}">

        <div class = "information">
          <div class="info">
          <h3>${product.name}</h3> 
          <p>${product.newPrice} ₽</p>
          <div class="quantity">
            <label for="quantity-${product.id}"></label>
            <input type="number" id="quantity-${product.id}" name="quantity" value="${product.quantity}" min="1">
          </div>

          <button class = "oform">Оформить заказ</button>      
          <button class="trash" onclick="removeFromCart(${product.id})">
          <i class="fa-regular fa-trash-can"></i>  Удалить</button>
        </div>
       </div>
      </div>
    `;
    cartItemsContainer.innerHTML += itemHtml;

    totalOldPrice += product.oldPrice * product.quantity;
  });

}

function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((item) => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function updateQuantity(productId) {
  const quantityInput = document.getElementById(`quantity-${productId}`);
  const newQuantity = parseInt(quantityInput.value);

  if (isNaN(newQuantity) || newQuantity < 1) {
    alert("Пожалуйста, введите правильную сумму");
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const productIndex = cart.findIndex((item) => item.id === productId);

  if (productIndex > -1) {
    cart[productIndex].quantity = newQuantity;
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart(); 
  }
}

function goToCart() {
  window.location.href = "cart.html";
}

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const productIndex = cart.findIndex((item) => item.id === product.id);

  if (productIndex > -1) {
    cart[productIndex].quantity += 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  goToCart(); 
}
