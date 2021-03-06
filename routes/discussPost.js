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


// Get all discussion posts
// GET api/discuss-posts
// public
router.get('/', async (req, res) => {
    try {
        const discussPosts = await DiscussPost.find().sort({ date: -1 });
        res.json(discussPosts);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});


// Get discuss post by ID
// GET api/discuss-post/:id
// Public

router.get('/:id', async (req, res) => {
    try {
        const discussPost = await DiscussPost.findById(req.params.id);

        if (!discussPost) {
            return res.status(404).json('discussion not found');
        }

        res.json(discussPost);
    } catch (err) {

        res.status(500).send('Server Error');
    }
});



// Reply to a discussion post

//POST api/discuss-posts/replies/:id
//access private

router.post('/replies/:id', auth, async (req, res) => {

    let { replyText } = req.body;

    try {
        const user = await User.findById(req.user.id).select('-password');

        const discussPost = await DiscussPost.findById(req.params.id)
        const newReply = {
            text: replyText,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        };

        discussPost.replies.unshift(newReply)
        await discussPost.save();

        res.json(discussPost.replies);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
);


module.exports = router;