const mongoose = require('mongoose');
const toJson = require('@meanie/mongoose-to-json');

var Schema = mongoose.Schema;

var GenreSchema = new Schema (
    {
        name: { type: String, required: true, min: 3, max: 100},
    }
);

GenreSchema.plugin(toJson);


module.exports = mongoose.model('Genre', GenreSchema);






