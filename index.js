const express = require('express');
const connectDB = require('./config/db')

const app = express();
const PORT = process.env.PORT || 5000;


//connect database
connectDB();

//init middleware
app.use(express.json({ extended: false }))


//define routes
app.use('/api/users', require('./routes/users'));


app.get('/', (req, res) => res.send('API running'))


app.listen(PORT, () => console.log('Server started on port'))