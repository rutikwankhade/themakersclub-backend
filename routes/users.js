const express = require('express');
const router = express.Router()
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/User')


// register user
// POST /api/users
// public

router.post('/', async (req, res) => {

    const { name, email, password } = req.body;

    try {

        //check if user exists
        //if yes send error
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json('User already exists');
        }

        //if no 
        //get user gravtar

        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm',
            protocol: 'https'
        })


        user = new User({
            name,
            email,
            avatar,
            password
        })


        //encrypt password
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)

        await user.save();


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
            });


    } catch (err) {
        console.log(err)
        res.status(400).json('server error')
    }

});

module.exports = router;