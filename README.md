# 📚 Library App

A simple, browser-based library manager where you can add books, mark them as read/unread, and remove them from your collection. Built with vanilla HTML, CSS, and JavaScript.

## Features

- **Add books** — Enter a title, author, year, and page count, and mark whether you've read it.
- **Track read status** — Toggle a book's read/unread status with a single click.
- **Remove books** — Delete any book from the library with the delete button.
- **Preloaded library** — Starts with 10 classic books so the table isn't empty on first load.
- **Unique IDs** — Each book gets a UUID (via `crypto.randomUUID()`) for reliable tracking.

## Project Structure

```
.
├── index.html   # Page markup: form + book table
├── style.css    # Layout and styling
└── script.js    # Library logic (Book constructor, DOM rendering, event handling)
```

## How It Works

- Each book is created with the `Book` constructor, which requires the `new` keyword and stores a `title`, `author`, `year`, `pages`, `isRead` status, and a generated `id`.
- `myLibrary` is the in-memory array holding all `Book` objects.
- Submitting the form reads the input values, creates a new `Book`, pushes it to `myLibrary`, and inserts a new row at the top of the table.
- The table uses **event delegation** on the `<tbody>` — a single click listener handles both the read-toggle and delete buttons for every row, including ones added dynamically.
- The `isRead` status is stored as `"yes"` / `"no"` strings and flipped by `Book.prototype.changeReadStatus()`.

## Getting Started

No build step or dependencies required.

1. Download or clone the project files.
2. Open `index.html` in any modern web browser.
3. Fill out the form and click **New Book** to add entries to the library.

## Notes / Possible Improvements

- Data is stored only in memory — refreshing the page resets the library to the default 10 books. Adding `localStorage` persistence would fix this.
- Form validation could be added for the year and page fields beyond the basic `pattern`/`inputmode` attributes already in place.
- The ID column is currently visible in the table; it could be hidden and used only internally.