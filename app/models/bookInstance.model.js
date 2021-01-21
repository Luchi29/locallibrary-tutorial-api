const mongoose = require('mongoose');
const toJson = require('@meanie/mongoose-to-json');

var Schema = mongoose.Schema;

var BookInstanceSchema = new Schema(
    {
        book: {type: Schema.Types.ObjectId, ref: 'Book', required: true },
        imprint: {type: String, required: true },
        status: {type: String, required: true, enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'], default: 'Maintenance'},
        due_back: {type: Date, default: Date.now}
    }
);

BookInstanceSchema.plugin(toJson);

module.exports = mongoose.model('BookInstance', BookInstanceSchema);