const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
    isGold: Boolean,
    name: String,
    phone: String
})

const Customer = mongoose.model('Customer',customerSchema);

function validateCustomer(customer){
    const schema = {
        isGold: Joi.boolean().required(),
        name: Joi.string().required().min(3).max(10),
        phone: Joi.string().required()
    }
    return Joi.validate(customer,schema);
}


exports.Customer = Customer;
exports.validateCustomer = validateCustomer;