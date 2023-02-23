const Joi = require('joi')
const mongoose = require('mongoose');
const { genreSchema } = require('./genre')

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim : true,
        minlength: 5,
        maxlength: 255
    },
    genre: {
       type: genreSchema,
       required: true
    },
    numberInStock: {
        type: Number,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        min: 0,
        max: 255
    }
})

function validateMovie(movie){
    const schema= {
        title: Joi.string().required().min(3).max(50),
        genreId : Joi.string().required(),
        numberInStock: Joi.number().required().min(0).max(255),
        dailyRentalRate: Joi.number().required().min(0).max(255),
    }

    return Joi.validate(movie,schema);
}




const Movie = mongoose.model('Movie', movieSchema)
exports.validateMovie = validateMovie;
exports.Movie = Movie;