document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");
    const product = await fetchProduct(productId);
    display(product);
  });
  
  async function fetchProduct(productId) {
    try {
      const response = await fetch(`https://cars-pagination.onrender.com/products/${productId}`);
      if (!response.ok) {
        throw new Error("Mahsulotni topishda xatolik yuz berdi.");
      }
      const product = await response.json();
      return product;
    } catch (error) {
      console.error("Mahsulotni olishda xatolik yuz berdi:", error.message);
    }
  }
  
  function display(product) {
    const productDetailContainer = document.getElementById("product-detail-container");
    if (!product) {
      productDetailContainer.innerHTML = "<p>Mahsulot topilmadi.</p>";
      return;
    }
  
    productDetailContainer.innerHTML = `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
          <h3>${product.name}</h3>
          <br><br>
          <p>Цена</p> 
          <div class="price">
            <span class="new-price"> ${product.newPrice} ₽</span>
            <span class="old-price">${product.oldPrice} ₽</span>
          </div>
          <button onclick="addToCart(${product.id}, '${product.name}', '${product.image}', ${product.oldPrice}, ${product.newPrice}, '${product.category}', ${product.star})" class="add-to-cart-button">Добавить в корзину</button>
        </div>
      </div>
    `;
  }
  
  function addToCart(id, name, image, oldPrice, newPrice, category, star) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = cart.findIndex(item => item.id === id);
  
    if (existingProductIndex > -1) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push({ id, name, image, oldPrice, newPrice, category, star, quantity: 1 });
    }
  
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Товар добавлен в корзину.");
  }
  
  function goToCart() {
    window.location.href = "cart.html";
  }
  