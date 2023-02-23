const Joi = require('joi');
// const genres = require('./routes/genres');
const customers = require('./routes/customers')
// const movies = require('./routes/movies');
const rentals = require('./routes/rentals')
const express = require('express');
const app = express();
const mongoose = require('mongoose')

mongoose.set("strictQuery", false)

mongoose.connect('mongodb://127.0.0.1/playground').then(
  () => console.log("connection to mongoDB established")
).catch(
  (err) => console.log("connection failed")
)


app.use(express.json());
// app.use('/api/movies', movies);
// app.use('/api/genres', genres);
app.use('/api/rentals', rentals)
app.use('/api/customers', customers);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));