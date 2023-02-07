const express = require('express');
const router = express.Router();

//-------------------GET REQUESTS----------------------------------------

const genresCategories = [
    { id: 1, name: "comedy" },
    { id: 2, name: "Horror" },
    { id: 3, name: "Action" },
    { id: 4, name: "Science Fiction" }
]

router.get('/', (req, res) => {
    res.send(genresCategories);
})

router.get('/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let desiredGenreResult = genresCategories.find(g => g.id === id);
    if (!desiredGenreResult)
        return res.status(404).send(`The genre with the given ID: ${id} is not found`)
    res.send(desiredGenreResult);
})


//-------------------POST REQUESTS----------------------------------------


function validateInput(genre) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })

    let { error } = schema.validate(genre)
    return error;
}

router.post('/', (req, res) => {
    let newGenre = {
        id: genresCategories.length + 1,
        name: req.body.name
    }

    let error = validateInput(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    genresCategories.push(newGenre);
    res.send(genresCategories);
})

//-------------------PUT REQUESTS----------------------------------------

router.put('/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let desiredGenreResult = genresCategories.find(g => g.id === id);
    if (!desiredGenreResult)
        return res.status(404).send(`The genre with the given ID: ${id} is not found`)

    let error = validateInput(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    desiredGenreResult.name = req.body.name;
    res.send(genresCategories);
})

//-------------------DELETE REQUESTS----------------------------------------

router.delete(':id',(req,res)=>{
    let id = parseInt(req.params.id);
    let desiredGenreResult = genresCategories.find(g => g.id === id);
    if (!desiredGenreResult)
        return res.status(404).send(`The genre with the given ID: ${id} is not found`)

    let index = genresCategories.indexOf(desiredGenreResult);
    genresCategories.splice(index,1);

    res.send(genresCategories);

})

module.exports = router;