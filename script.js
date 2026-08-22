const myLibrary = [];

function Book(title, author, pages, year, read) {
    if(!new.target) {
        throw Error("Must use the new operator to call the function");
    }
    this.id = crypto.randomUUID()
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.year = year;
    this.isRead = read;
}

function addBookToLibrary(title, author, pages, year, isRead) {
    let bookName = title.replaceAll("");

    bookName = new Book(title, author, pages, year, isRead);

    myLibrary.push(bookName);
}

function displayLibrary() {
    for (let book of myLibrary) {
        console.log(book)
    }
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

displayLibrary()