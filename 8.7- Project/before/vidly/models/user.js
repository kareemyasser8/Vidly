const mongoose = require('mongoose');
const Joi = require('joi');

let userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    password: {
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
})

const User = mongoose.model('User',userSchema);

function validateUser(user){
    let schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(50).required().email(),
        password: Joi.string().min(5).max(1024).required()
    }

    return Joi.validate(user,schema);
}

exports.validateUser = validateUser;
exports.User = User;
exports.userSchema = userSchema;