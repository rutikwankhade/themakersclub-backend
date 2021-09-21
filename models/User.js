// user schema

const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userName: {
        type: String,  
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required:true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})


module.exports = User = mongoose.model('user', UserSchema)