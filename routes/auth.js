const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const User = require('../models/User')
const jwt = require('jsonwebtoken');
require('dotenv').config()
const bcrypt = require('bcryptjs');


router.get('/', auth, async (req, res) => {


    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)

    } catch (err) {
        res.status(500).send('Server error')

    }
});



// route - /api/auth
// desc - authenticate user and send token
//access - public


router.post('/', async (req, res) => {

    const { email, password } = req.body;

    try {

        //check if user exists
        //if yes send error
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }


        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        //return json webtoken
        const payload = {
            user: {
                id: user.id
            }
        }


        jwt.sign(payload, process.env.jwtSecret,
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token })
            })




    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }




});

module.exports = router;