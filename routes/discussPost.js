const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')

const DiscussPost = require('../models/DiscussPost');
const User = require('../models/User')


//create a discussion post
//POST api/discuss-posts
//access private

router.post('/', auth, async (req, res) => {

    let { postTitle, postText } = req.body;

    try {
        const user = await User.findById(req.user.id).select('-password');

        const newPost = new DiscussPost({
            title: postTitle,
            text: postText,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        });

        const post = await newPost.save();

        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
);

module.exports = router;