const express = require('express');
const router = express.Router();

//const Review = require('./models/Review');

router.get("/", (req, res) => {
    res.send("WORKING");
})

module.exports = router;