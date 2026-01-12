<script>
fetch("products.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("products");

    data.forEach(item => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img src="${item.image}" alt="${item.name}" onclick="openImage('${item.image}', '${item.name}')">
        <div class="info">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <p class="price">${item.price}</p>
        </div>
      `;

      container.appendChild(card);
    });
  })
  .catch(err => {
    document.getElementById("products").innerHTML = "Failed to load data";
  });

/* Image open function */
function openImage(src, name) {
  document.getElementById("imgModal").style.display = "block";
  document.getElementById("modalImg").src = src;
  document.getElementById("caption").innerText = name;
}

/* Close modal */
document.querySelector(".close").onclick = function() {
  document.getElementById("imgModal").style.display = "none";
};
</script>
