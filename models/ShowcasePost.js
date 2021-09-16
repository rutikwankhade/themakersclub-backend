const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShowcasePostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId
    },
    desc: {
        type: String,
        required: true
    },
    title: {
        type: String
    },
    name: {
        type: String
    },
    avatar: {
        type: String
    },

    feedbacks: [
        {
            user: {
                type: Schema.Types.ObjectId
            },
            feedback: {
                type: String,
                required: true
            },
            feedbackType: {
                type: String,
                required: true
            },
            name: {
                type: String
            },
            avatar: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('showcasePost', ShowcasePostSchema);