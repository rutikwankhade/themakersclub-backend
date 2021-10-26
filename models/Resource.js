const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResourceSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId
    },
    url: {
        type: String,
        required: true
    },
    category: {
        type: String
    }
    
});

module.exports = mongoose.model('resource', ResourceSchema);