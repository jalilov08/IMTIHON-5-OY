document.addEventListener("DOMContentLoaded", fetchProducts);

async function fetchProducts() {
  try {
    const response = await fetch("https://cars-pagination.onrender.com/products");
    const data = await response.json();
    const randomProducts = random(data, 13);
    display(randomProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

function random(products, count) {
  const rand = products.sort(() => 0.5 - Math.random());
  return rand.slice(0, count);
}

function display(products) {
  const container = document.getElementById("products-container");
  container.innerHTML = "";

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" onclick="viewProduct(${product.id})">
      <div id="still" class="rating">
        <span> ${product.star}⭐️⭐️⭐️☆☆</span>
        <p>(12) отзывов</p>
      </div>

      <h3 id="still">${product.name}</h3>
      <div id="still" class="prices">
        <div class="new-price">${product.newPrice} ₽</div>
        <div class="old-price">${product.oldPrice} ₽</div>
      </div>
    `;
    container.appendChild(productCard);
  });
}

function viewProduct(productId) {
  window.location.href = `detail.html?id=${productId}`;
}

document.getElementById("price-filter").addEventListener("change", filterProductsByPrice);

function filterProductsByPrice() {
  const priceRange = document.getElementById("price-filter").value;
}
