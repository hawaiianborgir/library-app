const myLibrary = [];

function Book(title, author, pages, year) {
    if(!new.target) {
        throw Error("Must use the new operator to call the function");
    }
    this.id = crypto.randomUUID()
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.year = year;
}

function addBookToLibrary(title, author, pages, year) {
    let bookName = title.replaceAll("");

    bookName = new Book(title, author, pages, year);

    myLibrary.push(bookName);
}

function displayLibrary() {
    for (let book of myLibrary) {
        console.log(book)
    }
}

addBookToLibrary("The Two Towers", "J.R.R. Tolkien", 352, 1954);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, 1937);
addBookToLibrary("Pride and Prejudice", "Jane Austen", 279, 1813);
addBookToLibrary("1984", "George Orwell", 328, 1949);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, 1960);
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, 1925);
addBookToLibrary("Brave New World", "Aldous Huxley", 311, 1932);
addBookToLibrary("Fahrenheit 451", "Ray Bradbury", 194, 1953);
addBookToLibrary("The Catcher in the Rye", "J.D. Salinger", 224, 1951);
addBookToLibrary("Slaughterhouse-Five", "Kurt Vonnegut", 275, 1969);

displayLibrary()