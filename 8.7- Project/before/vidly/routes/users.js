const express = require('express');
const _ = require('lodash')
const bcrypt = require('bcrypt')
const { validateUser, User } = require('../models/user')
const router = express.Router();
const auth = require('../middleware/auth')

router.post('/', async (req, res) => {
    let { error } = validateUser(req.body);
    if (error) {
        res.status(404).send(error.details[0].message);
        return
    }

    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(404).send('User already registered');

    // user = new User({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    // })

    user= new User(_.pick(req.body, ['name','email','password']))
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password,salt)

    

    try {

        user = await user.save()

        // const token = jwt.sign({_id: user._id},config.get('jwtPrivateKey'))
        const token = user.generateAuthToken();
        res.header('x-auth-token',token).send(_.pick(user,['_id','name','email']));

    } catch (err) {
        console.log(err.message);
    }

})

router.get('/me',auth, async (req, res) => {
   const user = await User.findById(req.user._id).select('-password')
   res.send(user);  
})

module.exports = router;
// exports.router = router