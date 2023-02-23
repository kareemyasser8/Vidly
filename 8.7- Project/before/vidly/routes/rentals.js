const express = require('express');
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movie');
const router = express.Router();
const Fawn = require('fawn');
const mongoose = require('mongoose');
const { validateRental, Rental } = require('../models/rental');

Fawn.init("mongodb://127.0.0.1/playground");

router.post('/', async (req, res) => {
    const { error } = validateRental(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId)
    if (!customer) return res.status(400).send("Invalid Customer");

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send("Invalid Movie");

    if (movie.numberInStock === 0) return res.status(400).send("Movie not found")


    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        },
    })

    try {
        new Fawn.Task()
            .save('rentals', rental)
            .update('movies', { _id: movie._id }, {
                $inc: { numberInStock: -1 }
            }).run();

        res.send(rental)

    }
    catch (err) {
        res.status(500).send('Something Failed')
    }


})

router.get('/', async (req,res)=>{
    let rentals = await Rental.find()
    if(!rentals){
        res.status(400).send("rentals not found")
    }else{
        res.send(rentals);
    }
})

module.exports = router;