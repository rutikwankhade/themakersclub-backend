const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const ShowcasePost = require('../models/ShowcasePost');
const User = require('../models/User')


//add showcase post
//POST /api/showcase
//access private

router.post('/', auth, async (req, res) => {

    const { showcaseUrl, showcaseText, showcaseTitle } = req.body;

    try {

        const user = await User.findById(req.user.id).select('-password');

        const newShowcasePost = new ShowcasePost({
            title: showcaseTitle,
            desc: showcaseText,
            url: showcaseUrl,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id,
            feedbacks: []
        });

        const post = await newShowcasePost.save();

        res.json(post);

    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error');
    }
})



module.exports = router;