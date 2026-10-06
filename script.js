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
function addIdToCurrentBook() {
    const cards = document.querySelectorAll(".book-card");
    for (let i = 0; i < 3; i++) {
        cards[i].dataset.bookId = myLibrary[i].id
    }
}
addBookToLibrary("The Two Towers", "J.R.R. Tolkien", 352, 1954, true);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, 1960, true);
addBookToLibrary("Pride and Prejudice", "Jane Austen", 279, 1813, false);
addIdToCurrentBook()

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

function dataModifier(book, data, element) {
    if (data === "isRead") {
        if (book[data] === true) {
            element.textContent = "Read: ✓";
        } else {
            element.textContent = "Read: ✗";
        }
    } else if (data === "pages") {
        element.textContent = `${book[data]} pages`;
    } else if (data === "year") {
        element.textContent = `Published: ${book[data]}`;
    } else if (data === "author") {
        element.textContent = `by ${book[data]}`;
    } else {
        element.textContent = book[data];
    }
}

function dataRegister(book, card, data) {
    const pElement = document.createElement("p");
    pElement.classList.add(`book-${data}`);
    dataModifier(book, data, pElement);
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
    card.dataset.bookId = book.id;
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

// Add New Book
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

// Event Delegation
mainContent.addEventListener("click", (e) => {
    const item = e.target.closest(".del-button");
    if (!item) return;
    
    const card = item.closest(".book-card");
    const cardId = card.dataset.bookId
    const bookIndex = myLibrary.findIndex(book => book.id === cardId);
    myLibrary.splice(bookIndex,1);
    mainContent.removeChild(card);
})

mainContent.addEventListener("click", (e) => {
    const item = e.target.closest(".read-button");
    if (!item) return;

    const card = item.closest(".book-card");
    const cardId = card.dataset.bookId
    const bookIndex = myLibrary.findIndex(book => book.id === cardId);
    let bookReadStatus = myLibrary[bookIndex].isRead;
    console.log(bookReadStatus);
    let readDisplay = card.querySelector(".book-read");
    console.log(readDisplay);

    if (bookReadStatus) {
        myLibrary[bookIndex].isRead = false;
        readDisplay.textContent = "Read: ✗";
    } else {
        myLibrary[bookIndex].isRead = true;
        readDisplay.textContent = "Read: ✓";
    }

    // todo: integrate the prototype method
})