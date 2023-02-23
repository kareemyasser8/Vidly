const mongoose = require('mongoose')
const Joi = require('joi');


const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 10
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
})

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    }, dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }

})


//-------------------------------------------------------------------

const rentalSchema = new mongoose.Schema({
    customer: {
        type: customerSchema
    },
    movie: {
        type: movieSchema,
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateRetuned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }
})

const Rental = mongoose.model('Rental', rentalSchema);

function validateRental(rental) {
    const schema = {
        customerId: Joi.string().required(),
        movieId: Joi.string().required()
    }

    return Joi.validate(rental, schema);

}

exports.Rental = Rental;
exports.validateRental = validateRental;

