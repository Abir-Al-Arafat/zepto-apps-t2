// script.js

const bookList = document.getElementById("book-list");
const wishlistContainer = document.getElementById("wishlist");
const searchInput = document.getElementById("search-input");
const genreFilter = document.getElementById("genre-filter");
const pagination = document.getElementById("pagination");
const wishlistPage = document.getElementById("wishlist-page");
const homeLink = document.getElementById("home-link");
const wishlistLink = document.getElementById("wishlist-link");

let books = [];
let currentPage = 1;
let totalPages = 1;
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

async function fetchBooks(page = 1) {
  const res = await fetch(`https://gutendex.com/books?page=${page}`);
  const data = await res.json();
  books = data.results;
  totalPages = Math.ceil(data.count / 32);
  renderBooks(books);
  renderPagination();
  populateGenres();
}

function renderBooks(bookArray) {
  bookList.innerHTML = "";
  bookArray.forEach((book) => {
    const card = document.createElement("div");
    card.className = "book-card";

    const image = document.createElement("img");
    image.src = book.formats["image/jpeg"];
    image.alt = book.title;

    const title = document.createElement("div");
    title.className = "book-title";
    title.textContent = book.title;

    const author = document.createElement("div");
    author.className = "book-author";
    author.textContent = `Author: ${book.authors[0]?.name || "Unknown"}`;

    const genre = document.createElement("div");
    genre.className = "book-genre";
    genre.textContent = `Genre: ${book.subjects[0] || "N/A"}`;

    const id = document.createElement("div");
    id.className = "book-id";
    id.textContent = `ID: ${book.id}`;

    const wishlistIcon = document.createElement("span");
    wishlistIcon.className = "wishlist-icon";
    wishlistIcon.innerHTML = wishlist.includes(book.id) ? "❤️" : "🤍";
    if (wishlist.includes(book.id)) wishlistIcon.classList.add("active");

    wishlistIcon.onclick = () => toggleWishlist(book);

    card.append(image, title, author, genre, id, wishlistIcon);
    bookList.appendChild(card);
  });
}

function renderPagination() {
  pagination.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPage) btn.style.backgroundColor = "#555";
    btn.onclick = () => {
      currentPage = i;
      fetchBooks(currentPage);
    };
    pagination.appendChild(btn);
  }
}

function toggleWishlist(book) {
  const index = wishlist.indexOf(book.id);
  if (index > -1) {
    wishlist.splice(index, 1);
  } else {
    wishlist.push(book.id);
  }
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  fetchBooks(currentPage);
  renderWishlist();
}

function renderWishlist() {
  wishlistContainer.innerHTML = "";
  books
    .filter((book) => wishlist.includes(book.id))
    .forEach((book) => {
      const card = document.createElement("div");
      card.className = "book-card";
      card.innerHTML = `
      <img src="${book.formats["image/jpeg"]}" alt="${book.title}" />
      <div class="book-title">${book.title}</div>
      <div class="book-author">Author: ${
        book.authors[0]?.name || "Unknown"
      }</div>
      <div class="book-genre">Genre: ${book.subjects[0] || "N/A"}</div>
      <div class="book-id">ID: ${book.id}</div>
    `;
      wishlistContainer.appendChild(card);
    });
}

// Init
fetchBooks();
