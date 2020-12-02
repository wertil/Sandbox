let myLibrary = [];
const formAddBook = document.addBook;
const formEditBook = document.editBook;
const editAuthor = formEditBook.author;
const editTitle = formEditBook.title;
const editPages = formEditBook.pages;
const editRead = formEditBook.read;
const editNo = formEditBook.no;
const addBookButton = document.querySelector("#add-book");
const editBookButton = document.querySelector("#edit-book");
const bookGridContainer = document.querySelector(".book-grid-container");
const plusButton = document.querySelector('.plus-button');
const addBoxContainer = document.querySelector('.add-box-container');
const editBoxContainer = document.querySelector('.edit-box-container');
addBookButton.addEventListener('click', getNewBook);
editBookButton.addEventListener('click', updateBook);
formAddBook.addEventListener("submit", e => e.preventDefault());
formEditBook.addEventListener("submit", e => e.preventDefault());
let deleteBooks;
let editBooks;
let readBooks;

class Book {
    constructor(author, title, pages, read = false, currentlyReading = false) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.currentlyReading = currentlyReading;
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}


function displayBooks(type) {
    if (localStorage.getItem('books')) {
        myLibrary = JSON.parse(localStorage.getItem('books'))
    }
    let count = -1;
    let bookGridHtml = myLibrary.map(book => {
        count++;
        return `
        <div class="book relative ${book.read ? 'x--read' : ''}" data-count=${count}>   
            <div><span class="font-normal block sm:inline">${book.author}</span> "${book.title}"</div>
            <div class="font-normal text-sm">${book.pages} Pages ${book.read ? `, already read` : ``}${book.currentlyReading ? `, currently reading` : ``}</div>
            <div class="delete-icon icon-button -top-2 -left-2 ">
                <svg class="h-5 w-5 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
            </div>
            <div class="edit-icon icon-button -top-2 -right-2">
                <svg class="h-5 w-5 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                  <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
                </svg>
            </div>
            <div class="read-icon icon-button -bottom-2 -right-2">
                <svg class="h-5 w-5 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
            </div>
        </div>`


    }).join("");
    bookGridContainer.innerHTML = bookGridHtml;
    // initialize Icons and Eventhandlers again after DOM update:
    deleteBooks = document.querySelectorAll('.delete-icon');
    editBooks = document.querySelectorAll('.edit-icon');
    readBooks = document.querySelectorAll('.read-icon');
    if(type==="update") iconHandlers();
}

displayBooks();





function getNewBook() {
    const author = formAddBook.querySelector("[name=author]").value;
    const title = formAddBook.querySelector("[name=title]").value;
    const pages = formAddBook.querySelector("[name=pages]").value;
    const read = formAddBook.querySelector("[name=read]").checked;
    addBookToLibrary(new Book(author, title, pages, read));
    toggleForm();
    localStorage.setItem('books', JSON.stringify(myLibrary));
    displayBooks("update");
}

function updateBook() {
    const author = editAuthor.value;
    const title = editTitle.value;
    const pages = editPages.value;
    const read = editRead.checked;
    console.log("huhu",myLibrary[editNo.value]);
    myLibrary[editNo.value] = {
        author: author,
        currentlyReading: false,
        pages: pages,
        read: read,
        title: title
    }
    toggleEditForm();
    localStorage.setItem('books', JSON.stringify(myLibrary));
    displayBooks("update");
}

// Open Form
function toggleForm() {
    addBoxContainer.classList.toggle("hidden");
}

function toggleEditForm() {
    editBoxContainer.classList.toggle("hidden");
}

// open Form
plusButton.addEventListener('click', toggleForm)

function iconHandlers() {
    // delete Book
    deleteBooks.forEach(icon => {
        icon.addEventListener('click', e => {
            const bookNo = e.target.parentNode.dataset.count;
            myLibrary.splice(bookNo, 1);
            localStorage.setItem('books', JSON.stringify(myLibrary));
            displayBooks("update");
        })
    })
    readBooks.forEach(icon => {
        icon.addEventListener('click', e => {
            const bookNo = e.target.parentNode.dataset.count;
            myLibrary[bookNo].read = !myLibrary[bookNo].read;
            localStorage.setItem('books', JSON.stringify(myLibrary));
            displayBooks("update");
        })
    })
    editBooks.forEach(icon => {
        icon.addEventListener('click', e => {
            const bookNo = e.target.parentNode.dataset.count;
            toggleEditForm();
            console.log(myLibrary[bookNo].author);
            editAuthor.value = myLibrary[bookNo].author;
            editTitle.value = myLibrary[bookNo].title;
            editPages.value = myLibrary[bookNo].pages;
            editNo.value = bookNo;
            myLibrary[bookNo].read ? editRead.setAttribute("checked", "") : editRead.removeAttribute("checked", "");
        })
    })
}
iconHandlers();


