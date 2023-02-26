const express = require('express');
const Joi = require('joi')
const _ = require('lodash')
const bcrypt = require('bcrypt')
const { User } = require('../models/user')
const jwt = require('jsonwebtoken')
const router = express.Router();
const config = require('config');

router.post('/', async (req, res) => {
    let { error } = validateRequest(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return
    }

    let user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send('Invalid Email or Password');

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send('Invalid Email or Password');

    const token = user.generateAuthToken();
    res.send(token);
})


function validateRequest(req) {
    let schema = {
        email: Joi.string().min(5).max(50).required().email(),
        password: Joi.string().min(5).max(1024).required()
    }

    return Joi.validate(req, schema);
}


module.exports = router;
// exports.router = router