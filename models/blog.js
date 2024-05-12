const moogoose = require('mongoose');

const Schema = moogoose.Schema;

const BlogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    author: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: false
    },
    read_count: {
        type: Number,
        required: false
    },
    reading_time: {
        type: Number,
        default: Date.now
    },
    tags: {
        type: [String],
        required: false
    },
    body: {
        type: String,
        required: false
    },
    timestamp: {
        type: Date,
        default: Date.now
    },

});

module.exports = moogoose.model('Blog', BlogSchema);