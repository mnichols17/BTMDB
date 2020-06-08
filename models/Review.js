const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    title: String,
    jeff: Number,
    jack: Number,
    trill: Number,
    audience: Number,
    butter: Number,
    director: String,
    genre: String,
    subGenre: String,
    release: String,
    runtime: Number,
    podcast: Number
})

module.exports = Review = mongoose.model('Reviews', ReviewSchema, 'reviews');