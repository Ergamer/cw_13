const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Users = require('../models/Users');

const ImagesSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
    cafe: {
        type: String.Types.ObjectId,
        required: true,
        ref: 'Cafes'
    }
});

const Images = mongoose.model('Images', ImagesSchema);

module.exports = Images;
