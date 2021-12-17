const router = require('express').Router();
const books = require('./dummy_books');

let booksDirectory = books;

// POSTMAN: GET - localhost:5000/api/v1/books
router.get('/books', function (req, res) {
    res.send(booksDirectory);
});

// POSTMAN: GET - localhost:5000/api/v1/books/1933988673
router.get('/books/:id', function (req, res) {
    const { id } = req.params;

    const book = booksDirectory.find(book => book.isbn === id);
    if (!book) return res.status(404).send('Book does not exist!');

    res.send(book);
});

// POSTMAN: POST - localhost:5000/api/v1/books + a body with data
router.post('/books', function (req, res) {
    const {
        title,
        isbn,
        pageCount,
        publishedDate,
        thumbnailUrl,
        shortDescription,
        longDescription,
        status,
        authors,
        categories
    } = req.body;

    const bookExist = booksDirectory.find(book => book.isbn === isbn)
    if (bookExist) return res.send('Book already exists!');

    const book = {
        title,
        isbn,
        pageCount,
        publishedDate,
        thumbnailUrl,
        shortDescription,
        longDescription,
        status,
        authors,
        categories
    };
    booksDirectory.push(book);

    res.send(book);
});

// POSTMAN: PUT - localhost:5000/api/v1/books/1933988673 + a body with new data
router.put('/books/:id', function (req, res) {
    const { id } = req.params;
    const {
        title,
        pageCount,
        publishedDate,
        thumbnailUrl,
        shortDescription,
        longDescription,
        status,
        authors,
        categories
    } = req.body;

    const book = booksDirectory.find(book => book.isbn === id);
    if (!book) return res.send('Book does not exist!');

    const updateField = (val, prev) => !val ? prev : val;

    const updatedBook = {
        ...book,
        title: updateField(title, book.title),
        pageCount: updateField(pageCount, book.pageCount),
        publishedDate: updateField(publishedDate, book.publishedDate),
        thumbnailUrl: updateField(thumbnailUrl, book.thumbnailUrl),
        shortDescription: updateField(shortDescription, book.shortDescription),
        longDescription: updateField(longDescription, book.longDescription),
        status: updateField(status, book.status),
        authors: updateField(authors, book.authors),
        categories: updateField(categories, book.categories)
    };

    const bookIndex = booksDirectory.findIndex(book => book.isbn === id);
    booksDirectory.splice(bookIndex, 1, updatedBook);

    res.send(updatedBook);
});

//POSTMAN: DELETE - localhost:5000/api/v1/books/1933988673
router.delete('/books/:id', function (req, res) {
    const { id } = req.params;

    let book = booksDirectory.find(book => book.isbn === id);
    if (!book) return res.status(404).send('Book does not exist!');

    booksDirectory = booksDirectory.filter(book => book.isbn !== id);

    res.send('Book deleted!');
});

module.exports = router;