const bookStatuses = {
  notInLibrary: null,
  available: 'Available',
  notAvailable: 'notAvailable',
}

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.status = bookStatuses.notInLibrary; // Изначально книга не в библиотеке
  }

  changeStatus(status) {
    this.status = status;
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    book.changeStatus(bookStatuses.available)
    this.books.push(book);
  }

  borrowBook(isbn) {
    const bookToBorrow = this.books.find((book) => book.isbn === isbn);

    if (!bookToBorrow) {
      throw new Error(`В библиотеке нет книги с ISBN ${isbn}`);
    }

    if (bookToBorrow.status !== bookStatuses.available) {
      throw new Error(`Книгу с ISBN ${isbn} уже кто-то взял.`);
    }

    bookToBorrow.status = bookStatuses.notAvailable;
  }

  returnBook(isbn) {
    const returnedBook = this.books.find((book) => book.isbn === isbn);

    if (!returnedBook) {
      throw new Error(`В библиотеке не было книги с ISBN ${isbn}`);
    }

    if (returnedBook.status !== bookStatuses.notAvailable) {
        throw new Error(`Книга с ISBN ${isbn} уже доступна.`);
    }

    returnedBook.status = bookStatuses.available;
  }

  listAvailableBooks() {
    return this.books.filter((book) => book.status === bookStatuses.available);
  }
}

const library = new Library();

library.addBook(new Book('Война и мир', 'Лев Толстой', '11'));
library.addBook(new Book('Преступление и наказание', 'Федор Достоевский', '12'));
library.addBook(new Book('Мастер и Маргарита', 'Михаил Булгаков', '13'));

console.log(library.listAvailableBooks());

library.borrowBook('11');

console.log(library.listAvailableBooks());

//Попробуем вернуть книгу, которой не было в библиотеке
try {
  library.returnBook('14');
} catch (error) {
  console.error(error.message);
}

//Попробуем взять книгу, которой нет в библиотеке

try {
  library.borrowBook('21');
} catch (error) {
  console.error(error.message);
}

console.log(library.listAvailableBooks());
