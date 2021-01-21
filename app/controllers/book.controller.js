const Book = require('../models/book.model');
const Author = require('../models/author.model');
const Genre = require('../models/genre.model');
const BookInstance = require('../models/bookInstance.model');

var async = require('async');

exports.index = function (req, res) {

    async.parallel({
book_count: function (callback) {
    Book.countDocuments({}, callback);
},
book_instance_count: function (callback) {
    BookInstance.countDocuments({}, callback);

},
book_instance_available_count: function (callback) {
    BookInstance.countDocuments({ status: 'Available'},
    callback);
},
author_count: function (callback) {
    Author.countDocuments({}, callback);
},
genre_count: function (callback) {
    Genre.countDocuments({}, callback);
},
    })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({ message: err.message })



        });
};

// Display list of all books.
exports.findAllBooks = (req, res) => {
    Book.find({}, 'title author summary isbn')
        .populate('author')
        .populate('genre')
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving books."
            });
        });
};

// Find a single book with an id
exports.findBook = (req, res) => {
    const id = req.params.id;

    async.parallel({
        book: function (callback) {
            Book.findById(id)
                .populate('author')
                .populate('genre')
                .exec(callback);
        },
        book_instance: function (callback) {
            BookInstance.find({ 'book': req.params.id })
                .exec(callback);
        },
    })
        .then(data => {
            if (!data.book)
                res.status(404).send({ message: "Not found Book with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Tutorial with id=" + id });
        });


};

// Create and Save a new Book
exports.createBook = (req, res) => {
    //convert genre to array
    if (!(req.body.genre instanceof Array)) {
        if (typeof req.body.genre === 'undefined')
            req.body.genre = [];
        else
            req.body.genre = new Array(req.body.genre);
    }

    var book = new Book(
        {
            title: req.body.title,
            author: req.body.author,
            summary: req.body.summary,
            isbn: req.body.isbn,
            genre: req.body.genre,
        }
    );


    book.save(book)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Book."
            });
        });
};

//update book with id
exports.updateBook = (req, res) => {
    if (!req.body.title && !req.body.author && !req.body.aummary
        && !req.body.summary && !req.body.isbn && !req.body.genre) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    var book = new Book(
        {
            title: req.body.title,
            author: req.body.author,
            summary: req.body.summary,
            isbn: req.body.isbn,
            genre: (typeof req.body.genre === 'undefined') ? [] :
                req.body.genre,
            id: req.body.id
        }
    );

    const id = req.params.id;

    Book.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update book with id=${id}.`
                });
            } else res.send({ message: "Book was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Book with id=" + id
            });
        });
};

//delete book with id
exports.deleteBook = (req, res) => {
    const id = req.params.id;

    Book.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete book with id=${id}.`
                });
            } else {
                res.send({
                    message: "Book was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Book with id=" + id
            });
        });
};