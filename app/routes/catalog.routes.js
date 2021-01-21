const express = require('express');
const router = express.Router();

var bookController = require('../controllers/book.controller');
var genreController = require('../controllers/genre.controller');
var authorController = require('../controllers/author.controller');
var bookInstanceController = require('../controllers/bookinstance.controller');

// Catalog //
router.get('/', bookController.index);

// Book routes //

// Retrieve all books
router.get('/books', bookController.findAllBooks);

//retrieve single book
router.get('/book/:id', bookController.findBook);

//Create new book
router.post('/book/create', bookController.createBook);

//update book
router.put('/book/:id', bookController.updateBook);

//delete book
router.delete('/book/:id', bookController.deleteBook);

// Genre routes //

// Retrieve all genres
router.get('/genres', genreController.findAllGenres);

//Retrieve single genre
router.get('/genre/:id', genreController.findGenre);

// Create new genre
router.post('/genre/create', genreController.createGenre);

//update a genre
router.put('/genre/:id', genreController.updateGenre);

//delete a genre
router.delete('/genre/:id', genreController.deleteGenre);

// author routes //

// Retrieve all authors
router.get('/authors', authorController.findAllAuthors);

//Retrieve single author
router.get('/author/:id', authorController.findAuthor);

// Create new author
router.post('/author/create', authorController.createAuthor);

//update author
router.put('/author/:id', authorController.updateAuthor);

//delete author
router.delete('/author/:id', authorController.deleteAuthor);

// Bookinstance routes //

// Retrieve all bookinstances
router.get('/bookinstances', bookInstanceController.findAllBookInstances);

//Retrieve single bookinstances
router.get('/bookinstance/:id', bookInstanceController.findBookInstance);

// Create new bookinstances
router.post('/bookinstance/create', bookInstanceController.createBookInstance);

//update bookinstance
router.put('/bookinstance/:id', bookInstanceController.updateBookInstance);

//delete bookinstance
router.delete('/bookinstance/:id', bookInstanceController.deleteBookInstance);



module.exports = router;

