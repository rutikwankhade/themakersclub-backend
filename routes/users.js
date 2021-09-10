const express = require('express');
const router = express.Router();


// route - Get all users
// access public

router.get('/', (req, res) => {
    res.send(req.body)
});

module.exports = router;