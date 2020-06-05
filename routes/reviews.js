const express = require('express');
const router = express.Router();

const Review = require('../models/Review');

router.get("/", (req, res) => {
    Review.find()
    .then(reviews => res.json(reviews))
    .catch(err => res.json(err))
})

module.exports = router;