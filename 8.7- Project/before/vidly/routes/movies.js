const { Movie, genreSchema, validateMovie } = require('../models/movie');
const { Genre } = require('../models/genre');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Genre is not found');

    let movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    })

    try {
        movie = await movie.save()
        res.send(movie);
        console.log("movie is save successfully!!")
    } catch (err) {
        console.log(err.message)
    }

})


router.get('/',async(req,res)=>{
    try{
        let movies = await Movies.find();
        res.send(movies);
    }catch(err){
        console.log(err.message);
    }
   
})

module.exports = router;