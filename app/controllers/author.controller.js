const Author = require('../models/author.model');
const Book = require('../models/book.model');

// Retrieve all authors from the database.
exports.findAllAuthors = (req, res) => {
    
    Author.find()
        .populate('author')
        .sort([['family_name', 'ascending']])
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving authors."
            });
        });
};

// Find a single author with an id
exports.findAuthor = (req, res) => {
    const id = req.params.id;

    Author.findById(id)
        .then(data => {
            if(!data)
            res.status(404).send({ message: "Not found Author with id " + id});
            else res.send(data);
        })
        .catch(err => {
            res
            .status(500)
            .send({ message: "Error retrieving Author with id=" + id });
        });
};

// Create and Save a new Author
exports.createAuthor = (req, res) => {
    //validate request
    if (!req.body.first_name && !req.body.family_name && 
        !req.body.date_of_birth && !req.body.date_of_death) {
            res.status(400).send({ message: "Content can not be empty!" });
            return;
        }

    //create
    const author = new Author({
        first_name: req.body.first_name,
        family_name: req.body.family_name,
        date_of_birth: req.body.date_of_birth,
        date_of_death: req.body.date_of_death
    });
    
    //save author
    author.save(author)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: 
                    err.message || "Some error occurred while creating the Autrhor."
                });
            });
};

//update author with id
exports.updateAuthor = (req, res) => {
    if(!req.body.first_name && !req.body.family_name && 
        !req.body.date_of_birth && !req.body.date_of_death) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    var author = new Author(
        {
            first_name: req.body.first_name,
            family_name: req.body.family_name,
            date_of_birth: req.body.date_of_birth,
            date_of_death: req.body.date_of_death,
            id: req.params.id 
        }
    );
    const id = req.params.id;

    Author.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if(!data) {
                res.status(404).send({
                    message:  `Cannot update Author with id=${id}.`
                });
            } else res.send({ message:  "Author was updated successfully."});
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Author with id=" + id
            });
        });

};

//delete author with id
exports.deleteAuthor = (req, res) => {
    const id = req.params.id;

    Author.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Author with id=${id}.`
                });
            } else {
                res.send({
                    message: "Author was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id
            });
        });
};