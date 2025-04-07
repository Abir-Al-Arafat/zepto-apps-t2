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

// Init
fetchBooks();
