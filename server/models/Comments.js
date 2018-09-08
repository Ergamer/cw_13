const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentsSchema = new Schema({
    text: {
        type: String,
        required: true
    }
});

const Comments = mongoose.model('Comments', CommentsSchema);

module.exports = Comments;