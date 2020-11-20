
let myLibrary = [];

class Book {
    constructor(author, title, pages, read = false, currentlyReading = false) {
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

// const book1 = new Book("Tolkien", "The Hobbit", 515, false, true);
// const book2 = new Book("Stephenson", "Snowcrash", 817, true);
// const book3 = new Book("King", "The Dome", 1167);
// addBookToLibrary(book1);
// addBookToLibrary(book2);
// addBookToLibrary(book3);

if (localStorage.getItem('books')) {
    myLibrary = JSON.parse(localStorage.getItem('books'))
}

function displayBooks() {
    let bookGridHtml = myLibrary.map(book => {
        return `
        <div class="book">   
            <div><span class="font-normal block sm:inline">${book.author}</span> "${book.title}"</div>
            <div class="font-normal text-sm">${book.pages} Pages ${book.read ? `, already read` : ``}${book.currentlyReading ? `, currently reading` : ``}</div>
        </div>`


    }).join("");
    const bookGrid = document.querySelector(".book-grid");
    bookGrid.innerHTML = bookGridHtml;
}
displayBooks();

const formAddBook = document.addBook;
const addBookButton = document.querySelector("#add-book");
addBookButton.addEventListener('click', getNewBook);
formAddBook.addEventListener("submit", e => e.preventDefault());
function getNewBook() {
    const author = formAddBook.querySelector("[name=author]").value;
    const title = formAddBook.querySelector("[name=title]").value;
    const pages = formAddBook.querySelector("[name=pages]").value;
    const read = formAddBook.querySelector("[name=read]").checked;
    addBookToLibrary(new Book( author, title, pages, read));
    displayBooks();
    localStorage.setItem('books', JSON.stringify(myLibrary));
}
