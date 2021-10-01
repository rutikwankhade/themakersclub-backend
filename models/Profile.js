const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    userName: {
        type:String
    },

    bio: {
        type: String
    },
    points: {
        type: Number
    },

    github: {
        type: String
    },
    twitter: {
        type: String
    },
    website: {
        type: String
    },
    linkedin: {
        type: String
    },

    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('profile', ProfileSchema);