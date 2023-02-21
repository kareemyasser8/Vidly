const Joi = require('joi');
const genres = require('./routes/genres');
const customers = require('./routes/customers')
const express = require('express');
const app = express();
const mongoose = require('mongoose')

mongoose.set("strictQuery", false)

mongoose.connect('mongodb://127.0.0.1/genres').then(
  () => console.log("connection to mongoDB established")
).catch(
  (err) => console.log("connection failed")
)


app.use(express.json());
app.use('/api/genres', genres);
// app.use('/api/customers', customers);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));