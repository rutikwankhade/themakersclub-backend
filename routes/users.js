const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

const User = require('../models/User')
// route - Get all users
// access public

router.post('/', async (req, res) => {

    const { name, email, password } = req.body;

    try {

        //check if user exists
        //if yes send error
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: 'User already exists' });
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

        await user.save()

        res.send('user registered')

        //return json webtoken



    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }




});

module.exports = router;