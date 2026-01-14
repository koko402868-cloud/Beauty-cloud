let products = [];

/* LOAD PRODUCTS */
fetch("products.json")
  .then(res => res.json())
  .then(data => {
    products = data;
    renderProducts(products);
  });

/* RENDER PRODUCTS */
function renderProducts(list) {
  const container = document.getElementById("products");
  container.innerHTML = "";

  list.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";

    let label = "";
    if (item.stock === 0) label = `<div class="stock-label">OUT OF STOCK</div>`;
    else if (item.stock < 10) label = `<div class="stock-label low-stock">LOW STOCK</div>`;

    card.innerHTML = `
      ${label}
      <img src="${item.image}" onclick="openOverlay(${item.id})">
      <div class="info">
        <h3>${item.name}</h3>
        <p class="price">${item.price}</p>
      </div>
    `;
    container.appendChild(card);
  });
}

/* SEARCH */
function searchProducts() {
  const text = document.getElementById("searchInput").value.toLowerCase();
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(text)
  );
  renderProducts(filtered);
}

/* OPEN OVERLAY */
function openOverlay(id) {
  const item = products.find(p => p.id === id);

  document.getElementById("overlay").style.display = "flex";
  document.getElementById("oImg").src = item.image;
  document.getElementById("oName").innerText = item.name;
  document.getElementById("oDesc").innerText = item.description;
  document.getElementById("oPrice").innerText = "Price: " + item.price;

  const stockText = document.getElementById("oStock");

  if (item.stock === 0) {
    stockText.innerText = "Status: OUT OF STOCK";
    stockText.style.color = "red";
  } else if (item.stock < 10) {
    stockText.innerText = "Status: LOW STOCK";
    stockText.style.color = "orange";
  } else {
    stockText.innerText = "In Stock";
    stockText.style.color = "green";
  }
}

/* CLOSE OVERLAY */
function closeOverlay() {
  document.getElementById("overlay").style.display = "none";
}
