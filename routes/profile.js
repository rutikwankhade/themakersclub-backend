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
        linkedin
    } = req.body;



    // create a profile
    const profileFields = {
        user: req.user.id,
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



// Get all profiles 
// GET api/profile
// public

router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles)

    } catch (err) {
        res.status(500).send('Server error')
    }
})

// Get profile by user ID
// GET api/profile/user/:user_id
// Public


router.get('/:user_id', async ({ params: { user_id } }, res) => {
    try {
        const profile = await Profile.findOne({
            user: user_id
        }).populate('user', ['name', 'avatar']);

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

    const { points } = req.points
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