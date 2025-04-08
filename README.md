# 📚 Gutendex Book Explorer

A responsive web application to explore books from the [Gutendex](https://gutendex.com/) API. Users can search, filter, and paginate through books, as well as manage a wishlist stored in localStorage.

## 🌟 Features

- 🔍 **Search** by book title in real-time
- 🎯 **Filter** books by genre/topic
- 💖 **Wishlist**: Add/remove books and store them in localStorage
- 📄 **Pagination**: Navigate through thousands of books easily
- 🏠 **Pages**:
  - **Home**: Book list view
  - **Wishlist**: Shows user's favorited books
- 📱 **Responsive UI** using Vanilla CSS 

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/Abir-Al-Arafat/zepto-apps-t2.git
cd zepto-apps-t2
```

### 2. Run locally
#### Using VS Code Live Server
- Install the [Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
- Right-click `index.html` > "Open with Live Server"

## 📁 Project Structure

```
📦 gutendex-book-explorer
├── index.html
├── styles.css
├── script.js
└── README.md
```

## 📚 API Reference
- Data sourced from [Gutendex](https://gutendex.com/)
- Pagination: `/books?page=1`
- Search: `/books?search=alice`
