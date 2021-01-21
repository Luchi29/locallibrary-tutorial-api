const mongoose = require('mongoose');
const toJson = require('@meanie/mongoose-to-json');

var AuthorSchema = mongoose.Schema(
    {
        first_name: { type: String, required: true },
        family_name: { type: String, required: true },
        date_of_birth: { type: Date },
        date_of_death: { type: Date },
    }

);

AuthorSchema.plugin(toJson);

module.exports = mongoose.model('Author', AuthorSchema);
