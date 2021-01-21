const Genre = require('../models/genre.model');
const Book = require('../models/book.model');



// Retrieve all genres from the database.
exports.findAllGenres = (req, res) => {
    const name = req.query.name;
    
    
    Genre.find()
        .populate('Genre')
        .sort([['name', 'ascending']])
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving genres."
            });
        })
    };


// Find a single genre with an id
exports.findGenre = (req, res) => {
    const id = req.params.id;

    Genre.findById(id)
        .then(data => {
            if(!data)
            res.status(404).send({ message: "Not found Genre with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
            .status(500)
            .send({ message: "Error retrieving Genre with id=" + id })
        });
};


// Create and Save a new Genre
exports.createGenre = [(req, res) => {
    if (!req.body.name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    const genre = new Genre({
        name: req.body.name
    });

    genre.save(genre)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: 
                    err.message || "Some error occurred while creating the Genre."
                });
            });
}];

//update genre with id
exports.updateGenre = [(req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    var genre = new Genre(
        {
            name: req.body.name,
            id: req.body.id
        }
    );

    const id = req.params.id;

    Genre.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if(!data) {
                res.status(404).send({
                    message: `Cannot update genre with id=${id}.`
                });
            } else  res.send({ message: "Genre was updated successfully."});

            
        })
        .catch(err => {
            res.sattus(500).send({
                message: "Error updating Tutorial with id=" + id
            });
        });
}]

//delete genre with id
exports.deleteGenre = (req, res) => {
    const id = req.params.id;

    Genre.findByIdAndRemove(id) 
        .then(data => {
            if(!data) {
                res.status(404).send({
                    message: `Cannot delete genre with id=${id}.`
                });
            } else {
                res.send({
                    message: "Genre was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Genre with id=" + id
            });
        });


};
