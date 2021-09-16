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




// Get all showcase posts
// GET api/showcase
// public
router.get('/', async (req, res) => {
    try {
        const showcasePosts = await ShowcasePost.find().sort({ date: -1 });
        res.json(showcasePosts);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});



// Get showcase post by ID
// GET api/showcase/:id
// Public

router.get('/:id', async (req, res) => {
    try {
        const showcasePost = await ShowcasePost.findById(req.params.id);

        if (!showcasePost) {
            return res.status(404).json('project not found');
        }

        res.json(showcasePost);
    } catch (err) {

        res.status(500).send('Server Error');
    }
});




// Give feedback to a showcase post
//POST api/showcase/feedback/:id
//access private

router.post('/feedback/:id', auth, async (req, res) => {

    let { feedbackText, feedbackType } = req.body;

    try {
        const user = await User.findById(req.user.id).select('-password');

        const showcasePost = await ShowcasePost.findById(req.params.id)
        const newFeedback = {
            feedback: feedbackText,
            feedbackType:feedbackType,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        };

        showcasePost.feedbacks.unshift(newFeedback)
        await showcasePost.save();

        res.json(showcasePost);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
);


module.exports = router;