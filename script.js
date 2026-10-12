const myLibrary = [];

const mainContent = document.querySelector(".main-content");

const form = document.querySelector("form")
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const yearInput = document.querySelector("#year");
const pagesInput = document.querySelector("#pages");

const formDialog = document.querySelector("#form-dialog");

const totalOutput = document.querySelector(".total-output");
const readOutput = document.querySelector(".read-output");
const notReadOutput = document.querySelector(".notread-output");



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

// Book Counter
function totalBookCounter (arr) {
    const totalBook = arr.length;
    totalOutput.value = totalBook
}
totalBookCounter(myLibrary); //current book counter

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
    if (data === "read") {
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
    card.dataset.bookId = book.id;
}

function createDelButton() {
    const card = mainContent.firstElementChild;
    const delButton = document.createElement("button");
    delButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-trash">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M4 7l16 0" />
                            <path d="M10 11l0 6" />
                            <path d="M14 11l0 6" />
                            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                        </svg>`;   
    delButton.classList.add("del-button");
    delButton.type = "button";
    card.appendChild(delButton);
}

function toggleReadClass (readButton, isRead) {
    readButton.classList.toggle("read-true", isRead);
    readButton.classList.toggle("read-false", !isRead)
}

function createReadButton(book) {
    const card = mainContent.firstElementChild;
    const readButton = document.createElement("button");
    readButton.type = "button";
    dataRegister(book, readButton, "read");
    readButton.classList.add("read-button");
    toggleReadClass(readButton, book.isRead);
    card.appendChild(readButton);
    
}

Book.prototype.changeReadStatus = function () {
    if (this.isRead === true) {
        this.isRead = false;
    } else {
        this.isRead = true;
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
    createReadButton(book);
    createDelButton();
    totalBookCounter(myLibrary);

    form.reset();
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
    totalBookCounter(myLibrary);
})

mainContent.addEventListener("click", (e) => {
    const item = e.target.closest(".read-button");
    if (!item) return;

    const card = item.closest(".book-card");
    const cardId = card.dataset.bookId
    const bookIndex = myLibrary.findIndex(book => book.id === cardId);
    const readButton = card.querySelector(".read-button");
    let bookReadStatus = myLibrary[bookIndex].isRead;
    let readDisplay = card.querySelector(".book-read");

    if (bookReadStatus) {
        myLibrary[bookIndex].changeReadStatus();
        toggleReadClass(readButton, myLibrary[bookIndex].isRead);
        readDisplay.textContent = "Read: ✗";
    } else {
        myLibrary[bookIndex].changeReadStatus();
        toggleReadClass(readButton, myLibrary[bookIndex].isRead);
        readDisplay.textContent = "Read: ✓";
    }
})



function readBookCounter (arr) {
    arr.reduce((acc, num) => {
        
    })
}


