// const asyncMiddleWare = require('../middleware/async');
const express = require('express');
const router = express.Router();
const { Genre, validateGenre } = require('../models/genre');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');


async function createGenre(newGenreName) {
  const genre = new Genre({
    name: newGenreName
  })

  try {
    const result = await genre.save()
    console.log(result)
  } catch (ex) {
    console.log(ex.message)
  }

}

async function getGenres() {
  const genres = await Genre.find({})
  if (!genres) {
    console.log("There is no genres found")
    return
  }

  console.log(genres);
}

// createGenre('Marvel');
// getGenres();




router.get('/', async (req, res, next) => {

  const genres = await Genre.find().sort('name')
  res.send(genres);

  // try {
  //   const genres = await Genre.find().sort('name')
  //   res.send(genres);
  // } catch (ex) {
  //   next(ex)
  // }


});

router.post('/', auth, async (req, res) => {



  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save()
  res.send(genre);
});

router.put('/:id', async (req, res) => {

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(req.params.id, {
    name: req.body.name
  }, { new: true })

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');


  res.send(genre);
});

router.delete('/:id', [auth, admin], async (req, res) => {

  const genre = await Genre.findByIdAndRemove(req.params.id)

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);
});



module.exports = router;