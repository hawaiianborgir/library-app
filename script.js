const myLibrary = [];

function Book(title, author, pages, year) {
    if(!new.target) {
        throw Error("Must use the new operator to call the function");
    }

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.year = year;
}

function addBookToLibrary(title, author, pages, year) {
    
}