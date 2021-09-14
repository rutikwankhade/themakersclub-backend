const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const Profile = require('../models/Profile');
const User = require('../models/User');

// Route -    POST api/profile
// desc -    Create or update user profile
// access  -  Private

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

module.exports = router;