const myLibrary = [];

const tableBody = document.querySelector("tbody");

const form = document.querySelector("form")
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const yearInput = document.querySelector("#year");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("#read");




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


function insertNewRow() {
    const tableRow = document.createElement("tr");
    
    if (tableBody.hasChildNodes()) {
            const firstTableRow = tableBody.children[0];
            tableBody.insertBefore(tableRow, firstTableRow);
    } else {
        tableBody.appendChild(tableRow);
    }

    for (let i=0; i < 7; i++) {
        const tableData = document.createElement("td");        
        tableRow.appendChild(tableData);
    }
};

function uniqueID(book) {
    book.id = crypto.randomUUID()
}

function createDelButton() {
    const delButton = document.createElement("button");
    delButton.textContent = "X";   
    delButton.classList.add("del-button");
    return delButton;
}

function createReadButton(book) {
    const readButton = document.createElement("button");
    if (book.isRead) {
        readButton.textContent = "yes";
    } else {
        readButton.textContent = "no";
    };
    readButton.classList.add("read-button");
    return readButton;
}

function insertNewBook(book) {
    const tableRow = document.querySelector("tbody tr:first-child")
    const delButton = createDelButton();
    const readButton = createReadButton(book);

    tableRow.children[0].textContent = `${book.title}`;
    tableRow.children[1].textContent = `${book.author}`;
    tableRow.children[2].textContent = `${book.year}`;
    tableRow.children[3].textContent = `${book.pages}`;
    tableRow.children[4].appendChild(readButton);
    tableRow.children[5].textContent = `${book.id}`;
    tableRow.children[6].appendChild(delButton);    
}


addBookToLibrary("The Two Towers", "J.R.R. Tolkien", 352, 1954, true);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, 1937, false);
addBookToLibrary("Pride and Prejudice", "Jane Austen", 279, 1813, false);
addBookToLibrary("1984", "George Orwell", 328, 1949, false);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, 1960, true);
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, 1925, true);
addBookToLibrary("Brave New World", "Aldous Huxley", 311, 1932, false);
addBookToLibrary("Fahrenheit 451", "Ray Bradbury", 194, 1953, true);
addBookToLibrary("The Catcher in the Rye", "J.D. Salinger", 224, 1951, false);
addBookToLibrary("Slaughterhouse-Five", "Kurt Vonnegut", 275, 1969, false);

function currentLibrary(myLibrary) {
    for (let book of myLibrary) {
        insertNewRow();
        insertNewBook(book);
    }
}
currentLibrary(myLibrary)

form.addEventListener("submit", (e) => {
    e.preventDefault()
    const formData = new FormData(form);
    const formObj = Object.fromEntries(formData)
    uniqueID(formObj)
    insertNewRow()
    insertNewBook(formObj)
})

// Event Delegation
tableBody.addEventListener("click", (e) => {
    const item = e.target.closest(".del-button");
    if (!item) return;
    
    const currentTR = item.closest("tr");
    tableBody.removeChild(currentTR);
})