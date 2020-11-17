
let myLibrary = [];

class Book {
    constructor(title, author, pages, read = false, currentlyReading = false) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.currentlyReading = currentlyReading;
    }
}

function  addBookToLibrary(book) {
    myLibrary.push(book);
}

const book1 = new Book("Tolkien", "The Hobbit", 515);
const book2 = new Book("Stephenson", "Snowcrash", 817);
const book3 = new Book("King", "The Dome", 1167);
addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);