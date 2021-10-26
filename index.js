const express = require('express');
const connectDB = require('./config/db')
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());


//connect database
connectDB();

//init middleware
app.use(express.json());


//define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/discuss-post', require('./routes/discussPost'));
app.use('/api/showcase', require('./routes/showcasePost'));
app.use('/api/resources', require('./routes/resources'));




app.get('/', (req, res) => res.send('API is running'))
app.listen(PORT, () => console.log('Server started '))