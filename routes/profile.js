const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const Profile = require('../models/Profile');
const User = require('../models/User');


// Create or update user profile
// POST api / profile
// Private

router.post('/', auth, async (req, res) => {

    const {
        bio,
        website,
        twitter,
        github,
        linkedin,
        userName
    } = req.body;



    // create a profile
    const profileFields = {
        user: req.user.id,
        userName:userName,
        bio: bio,
        points: 10,
        website: website,
        github: github,
        twitter: twitter,
        linkedin: linkedin,

    };


    try {
        // Using upsert option (creates new doc if no match is found):
        let profile = await Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        return res.json(profile);


    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
}
);




// Get current users profile
// GET api/profile/me
// Private

router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.user.id
        }).populate('user', ['name', 'avatar']);

        if (!profile) {
            return res.status(400).json({ msg: 'Profile does not exist' });
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



// Get top maker profiles 
// GET api/profile
// public

router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']).sort({ points: -1 }).limit(10);
        res.json(profiles)

    } catch (err) {
        res.status(500).send('Server error')
    }
})

// Get profile by username
// GET api/profile/username
// Public


router.get('/:userName', async ({ params: { userName } }, res) => {
    try {
        const profile = await Profile.findOne({
            user: userName
        }).populate('user', ['name', 'avatar', 'userName']);

        if (!profile) {
            return res.status(400).json('Profile not found');
        }

        return res.json(profile);

    } catch (err) {
        console.error(err.message);
        return res.status(500).json('Server error');
    }
}
);


// update the points
// POST api / profile/points
// Private

router.post('/points', auth, async (req, res) => {

    const { points } = req.body
    //update the points
    const profileFields = {
        points: points,

    };

    try {
        // Using upsert option (creates new doc if no match is found):
        let profile = await Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        return res.json(profile);


    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
}
);



module.exports = router;