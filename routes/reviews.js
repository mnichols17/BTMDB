const express = require('express');
const router = express.Router();
require('dotenv').config()

const Review = require('../models/Review');

router.get("/:title", (req, res) => {
    Review.find({title: req.params.title})
    .then(review => res.json({
        review,
        key: process.env.API_KEY
    }))
    .catch(err => res.json(err))
})

router.get("/", (req, res) => {
    Review.find()
    .select("-Runtime")
    .then(reviews => res.json(reviews))
    .catch(err => res.json(err))
})

module.exports = router;