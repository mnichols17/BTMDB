const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config()

const Review = require('../models/Review');

router.get("/:title", (req, res) => {
    Review.findOne({title: req.params.title})
    .then(async(review) => {
        let {title} = review;
        if(title.includes("The") && title.includes(",")){
            let the = title.substring(title.lastIndexOf(',') + 2)
            if(title.includes("(20")){
                const split = the.split(" ")
                title =(split[0] + " " + title.substring(0, title.lastIndexOf(',')))
            } else {
                title = (the + " " + title.substring(0, title.lastIndexOf(',')))
            }
        }
        const searchTitle = title.includes("(20") ? (title.substring(0, title.lastIndexOf('(20'))) : title
        const date = review.release.split("/")
        let poster = await axios.get(`http://www.omdbapi.com/?t=${searchTitle}&y=${date[2]}&apikey=${process.env.API_KEY}`)
        if(poster.data.Error || poster.data.Poster === "N/A") poster = await axios.get(`http://www.omdbapi.com/?t=${searchTitle}&y=${date[2]-1}&apikey=${process.env.API_KEY}`)
        else if (poster.data.Director !== review.director && parseInt(poster.data.Runtime.substring(0, poster.data.Runtime.lastIndexOf(' '))) !== review.runtime) poster = await axios.get(`http://www.omdbapi.com/?t=${searchTitle}&apikey=${process.env.API_KEY}`)
        res.json({
            review,
            poster: poster.data.Poster
        })
    })
    .catch(err => res.json(err))
})

router.get("/", (req, res) => {
    Review.find()
    .select("-Runtime")
    .then(reviews => res.json(reviews))
    .catch(err => res.json(err))
})

module.exports = router;