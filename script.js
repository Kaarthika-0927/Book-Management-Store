let books = [];
let cart = JSON.parse(localStorage.getItem("cart")) || []; // Load saved cart

// 🔁 Fetch books from backend
fetch("http://localhost:5000/books")
  .then(res => res.json())
  .then(data => {
    books = data;
    displayBooks(books);
    displayCart(); // Show cart if already in localStorage
  })
  .catch(err => console.error("Error loading books:", err));

// 📚 Display all books
function displayBooks(bookArray) {
  const container = document.getElementById("book-list");
  container.innerHTML = "";

  bookArray.forEach((book, index) => {
    const card = document.createElement("div");
    card.className = "book-card";

    card.innerHTML = `
      <img src="${book.image}" alt="${book.title}" width="100">
      <h3>${book.title}</h3>
      <p>${book.price}</p>
      <button onclick="addToCart(${index})">Add to Cart</button>
    `;

    container.appendChild(card);
  });
}

// 🛒 Add to cart
function addToCart(index) {
  const book = books[index];
  cart.push(book);
  saveCart();
  alert(`${book.title} added to cart`);
  displayCart();
}

// 💾 Save cart in localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// 🧺 Display cart with remove and total price
function displayCart() {
  const cartBox = document.getElementById("cart");
  cartBox.innerHTML = "<h2>🛒 Cart</h2>";

  if (cart.length === 0) {
    cartBox.innerHTML += "<p>Cart is empty</p>";
    return;
  }

  let total = 0;
  cart.forEach((book, i) => {
    const priceNum = parseInt(book.price.replace(/[^\d]/g, ""));
    total += priceNum;

    cartBox.innerHTML += `
      <p>${book.title} - ${book.price}
      <button onclick="removeFromCart(${i})">🗑 Remove</button></p>
    `;
  });

  cartBox.innerHTML += `
    <p><strong>Total: ₹${total}</strong></p>
    <button onclick="checkout()">✅ Checkout</button>
  `;
}

// ❌ Remove from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  displayCart();
}

// ✅ Checkout
function checkout() {
  alert("🎉 Thanks for your order!");
  cart = [];
  saveCart();
  displayCart();
}

// 🔍 Search
document.getElementById("search").addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const filtered = books.filter(book =>
    book.title.toLowerCase().includes(query)
  );
  displayBooks(filtered);
});
