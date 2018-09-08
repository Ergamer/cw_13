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
    },
    date: {
        type: String,
        required: true
    },
    comments: {
        type: [{
            text: {
                type: String,
                required: true
            }
        }],
    },
    votes: {
        type: [{
            rate: {
                type: Number,
                required: true
            },
            rateUser: {
                type: Schema.Types.ObjectId,
                ref: 'Users',
                required: true
            }
        }]
    },
    rating: {
        type: Number,
        default: 0
    }
});

const Cafes = mongoose.model('Cafes', CafesSchema);

module.exports = Cafes;