const winston = require('winston');
const mongoose = require('mongoose')

mongoose.set("strictQuery", false)

module.exports = function () {
    mongoose.connect('mongodb://127.0.0.1/playground').then(
        () => winston.info("connection to mongoDB established")
    )

}