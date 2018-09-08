const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CafesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
        type: String,
        required: true
    }
});

const Cafes = mongoose.model('Cafes', CafesSchema);

module.exports = Cafes;