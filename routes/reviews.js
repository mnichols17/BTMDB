const express = require('express');
const router = express.Router();

const Review = require('../models/Review');

router.get("/", (req, res) => {
    Review.find()
    .select("-Director -Genre -Sub-Genre -Runtime")
    .then(reviews => res.json(reviews))
    .catch(err => res.json(err))
})

router.get("/test", (req, res) => {
    Review.find({Title: "GoldenEye"})
    .select("-Director -Genre -Sub-Genre -Runtime")
    .then(review => res.json(review))
    .catch(err => res.json(err))
})

module.exports = router;