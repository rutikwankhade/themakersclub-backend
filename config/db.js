const mongoose = require('mongoose')

require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.mongoURI);
        console.log('MongoDB connected')

    } catch (err) {
        console.log(err);
        //exit process with failure
        process.exit(1)

    }
}

module.exports = connectDB;

