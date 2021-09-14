const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DiscussPostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId
    },
    text: {
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

    replies: [
        {
            user: {
                type: Schema.Types.ObjectId
            },
            text: {
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

module.exports = mongoose.model('discussPost', DiscussPostSchema);