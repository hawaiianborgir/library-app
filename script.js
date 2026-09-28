const myLibrary = [];

const mainContent = document.querySelector(".main-content");

const form = document.querySelector("form")
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const yearInput = document.querySelector("#year");
const pagesInput = document.querySelector("#pages");
const formDialog = document.querySelector("#form-dialog")


function Book(title, author, pages, year, read) {
    if(!new.target) {
        throw Error("Must use the new operator to call the function");
    }
    
    this.title = title;
    this.author = author;
    this.year = year;
    this.pages = pages;
    this.isRead = read;
    this.id = crypto.randomUUID();
}


function addBookToLibrary(title, author, pages, year, isRead) {
    let book = new Book(title, author, pages, year, isRead);
    myLibrary.push(book);
}

// Current Book, for array database only
addBookToLibrary("The Two Towers", "J.R.R. Tolkien", 352, 1954, true);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, 1960, true);
addBookToLibrary("Pride and Prejudice", "Jane Austen", 279, 1813, false);

function insertNewCard() {
    const card = document.createElement("div")
    card.classList.add("book-card")

    if (mainContent.hasChildNodes()) {
        const firstCard = mainContent.children[0];
        mainContent.insertBefore(card, firstCard);
    } else {
        mainContent.appendChild(card);
    }
}

function dataRegister(book, card, data) {
    const pElement = document.createElement("p");
    pElement.classList.add(`book-${data}`);
    
    if (data === "read") {
        if (book[data] === true) {
            pElement.textContent = "✓";
        } else {
            pElement.textContent = "✗"
        }
    } else {
        pElement.textContent = book[data];
    }
    
    card.appendChild(pElement);
}

function insertNewBook(book) {
    insertNewCard();

    const card = mainContent.firstElementChild;

    dataRegister(book, card, "title");
    dataRegister(book, card, "author");
    dataRegister(book, card, "year");
    dataRegister(book, card, "pages");
    dataRegister(book, card, "isRead");
}

function createDelButton() {
    const delButton = document.createElement("button");
    delButton.textContent = "X";   
    delButton.classList.add("del-button");
    return delButton;
}

function createReadButton(book) {
    const readButton = document.createElement("button");
    readButton.textContent = `${book.isRead}`;
    readButton.classList.add("read-button");
    return readButton;
}

Book.prototype.changeReadStatus = function () {
    if (this.isRead === "yes") {
        this.isRead = "no";
    } else {
        this.isRead = "yes";
    };
};

function readStatus(readCheckbox) {
    if (readCheckbox.checked) {
        return true;
    } else {
        return false;
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault()

    const readInput = document.querySelector("input[type='checkbox']");
    let book = new Book(titleInput.value, authorInput.value, Number(pagesInput.value), Number(yearInput.value), readStatus(readInput));
    
    console.log(book.title);
    console.log(book.isRead);
    
    myLibrary.push(book);
    console.log(myLibrary);

    insertNewBook(book);

    form.reset()
    formDialog.close();
});
