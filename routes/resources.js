const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')

const Resource = require('../models/Resource');
const User = require('../models/User')


//add a resource
//POST /api/resources
//access private

router.post('/',auth, async (req, res) => {

    let { resourceUrl, resourceCategory } = req.body;

    try {

        const user = await User.findById(req.user.id).select('-password');

        //check if resource already exists

        let resource = await Resource.findOne({ resourceUrl });
        if (resource) {
            return res.status(400).json('Resource already exists');
        }

        const newResource = new Resource({
            resourceUrl: resourceUrl,
            category: resourceCategory,
            user: req.user.id
        });

        const resourcePost = await newResource.save();

        res.json(resourcePost);

    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');

    }

});


// Get all resources
// GET api/resources
// public

router.get('/', async (req, res) => {
    try {
        const allResources = await Resource.find().sort({ date: -1 });
        res.json(allResources);
       
    } catch (err) {
        res.status(500).send('Server Error');
    }
});



module.exports = router;