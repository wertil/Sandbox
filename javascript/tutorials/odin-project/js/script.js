function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        console.log(`"${title}" by ${author}, ${pages} pages, ${read}`);
    }
}

const book = new Book("The Hobbit", "JRR Tolkien", 295, "not yet read");
book.info();