const mongoose = require('mongoose');
const {Customer, validateCustomer} = require('../models/customer') //Object destructrioning
const express = require('express')
const router = express.Router();

router.get('/', async (req,res)=>{
    if(!res){
        console.log("error happened")
        return   
    }

    let customers = await Customer.find()
    res.send(customers)
})

router.post('/', async(req,res)=>{

    const {error} = validateCustomer(req.body);
    if(error){
        return res.status(400).send(error.details[0].message)
    }

    let customer = new Customer({
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    })

    customer = await customer.save();
    res.send(customer);
    console.log("Customer added successfuly!!")

})


module.exports = router;


