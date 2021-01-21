const bookInstance = require('../models/bookInstance.model');
const Book = require('../models/book.model');
const Author = require('../models/author.model');
const Genre = require('../models/genre.model');

var async = require('async');

// Display list of all bookinstances.
exports.findAllBookInstances = (req, res) => {
    bookInstance.find()
        .populate('book')
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving book instances."
            });
        });
};

//retrieve single book instance
exports.findBookInstance = (req, res) => {
    const id = req.params.id;

    bookInstance.findById(id)
        .populate('book')
        .then(data => {
            if(!data)
                res.status(404).send({ message: "Not found Book instance with id " + id });
                else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Book instance with id=" + id })
        });
};

// Create and Save a new Book instance
exports.createBookInstance = (req, res) => {

    var bookinstance = new bookInstance(
        {
            book: req.body.book,
            imprint: req.body.imprint,
            status: req.body.status,
            due_back: req.body.due_back
        }
    );

    bookinstance
        .save(bookinstance)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the Bookinstance."
            });
        });
};

//update bookinstance with id
exports.updateBookInstance = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    var bookinstance = new bookInstance(
        {
            book:req.body.book,
            imprint: req.body.imprint,
            status: req.body.status,
            due_back: req.body.due_back,
            id: req.params.id
        }
    );

    bookInstance.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if(!data) {
                res.status(404).send({
                    message:  `Cannot update bookinstance with id=${id}.`
                });
            } else res.send({ message: "Bookinstance was updated successfully."  });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Bookinstance with id=" + id
            });
        });
};

//delete bookinstance with id
exports.deleteBookInstance = (req, res) => {
    const id = req.params.id;

    bookInstance.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete bookinstance with id=${id}.`
                });
            } else {
                res.send({
                    message: "Bookinstance was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete bookinstance with id=" + id
            });
        });
};

