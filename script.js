const myLibrary = [];

const mainContent = document.querySelector(".main-content");

// const tableBody = document.querySelector("tbody");

const form = document.querySelector("form")
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const yearInput = document.querySelector("#year");
const pagesInput = document.querySelector("#pages");





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
    pElement.textContent = `${book[data]}`;
    card.appendChild(title);
}

function insertNewBook(book) {
    const card = insertNewCard()

    dataRegister(book, card, "title");
    dataRegister(book, card, "author");
    dataRegister(book, card, "year");
    dataRegister(book, card, "pages");
    dataRegister(book, card, "read");
}

// function insertNewRow() {
//     const tableRow = document.createElement("tr");
    
//     if (tableBody.hasChildNodes()) {
//             const firstTableRow = tableBody.children[0];
//             tableBody.insertBefore(tableRow, firstTableRow);
//     } else {
//         tableBody.appendChild(tableRow);
//     }

//     for (let i=0; i < 7; i++) {
//         const tableData = document.createElement("td");        
//         tableRow.appendChild(tableData);
//     }
// };


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

// function insertNewBook(book) {
//     const tableRow = document.querySelector("tbody tr:first-child");
//     const delButton = createDelButton();
//     const readButton = createReadButton(book);

//     tableRow.children[0].textContent = `${book.title}`;
//     tableRow.children[1].textContent = `${book.author}`;
//     tableRow.children[2].textContent = `${book.year}`;
//     tableRow.children[3].textContent = `${book.pages}`;
//     tableRow.children[4].appendChild(readButton);
//     tableRow.children[5].textContent = `${book.id}`;
//     tableRow.children[6].appendChild(delButton);    
// }


addBookToLibrary("The Two Towers", "J.R.R. Tolkien", 352, 1954, "yes");
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, 1937, "no");
addBookToLibrary("Pride and Prejudice", "Jane Austen", 279, 1813, "no");
// addBookToLibrary("1984", "George Orwell", 328, 1949, "no");
// addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, 1960, "yes");
// addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, 1925, "yes");
// addBookToLibrary("Brave New World", "Aldous Huxley", 311, 1932, "no");
// addBookToLibrary("Fahrenheit 451", "Ray Bradbury", 194, 1953, "yes");
// addBookToLibrary("The Catcher in the Rye", "J.D. Salinger", 224, 1951, "no");
// addBookToLibrary("Slaughterhouse-Five", "Kurt Vonnegut", 275, 1969, "no");

function currentLibrary(myLibrary) {
    for (let book of myLibrary) {
        insertNewRow();
        insertNewBook(book);
    };
};

currentLibrary(myLibrary)

Book.prototype.changeReadStatus = function () {
    if (this.isRead === "yes") {
        this.isRead = "no";
    } else {
        this.isRead = "yes";
    };
};

form.addEventListener("submit", (e) => {
    e.preventDefault()
    const readInput = document.querySelector("input[name='isRead']:checked");
    let book = new Book(titleInput.value, authorInput.value, pagesInput.value, yearInput.value, readInput.value);
    myLibrary.push(book);
    console.log(myLibrary[myLibrary.length-1]);
    insertNewRow();
    insertNewBook(book);
    form.reset()
});

// Event Delegation
tableBody.addEventListener("click", (e) => {
    const item = e.target.closest(".del-button");
    if (!item) return;
    
    const currentTR = item.closest("tr");
    tableBody.removeChild(currentTR);
});

tableBody.addEventListener("click", (e) => {
        const readButton = e.target.closest(".read-button");
        if (!readButton) return;

        const uniqueID = readButton.closest("tr").children[5].textContent;
        let uniqueBook = myLibrary.find(item => item.id == uniqueID);

        uniqueBook.changeReadStatus(); 
        readButton.textContent = uniqueBook.isRead;
    })