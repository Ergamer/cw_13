const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CafesSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    images: {
        type: String,
        required: true
    },
    comments: {
        type: String,
        required: true
    }
});

const Cafes = mongoose.model('Cafes', CafesSchema);

module.exports = Cafes;