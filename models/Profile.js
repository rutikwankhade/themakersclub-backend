const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    bio: {
        type: String
    },
    points: {
        type:Number
    },

    social: {
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

    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('profile', ProfileSchema);