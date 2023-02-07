const express = require('express');
const Joi = require('joi');
const logger = require('./logger');
const app = new express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'))

app.use(logger);


const genres = [
    { id: 1, name: "comedy" },
    { id: 2, name: "Horror" },
    { id: 3, name: "Action" },
    { id: 4, name: "Science Fiction" }
]


//-------------------GET REQUESTS----------------------------------------

app.get('/', (req, res) => {
    res.send("Welcome to the Vidly app");
})

app.get('/api/genres', (req, res) => {
    res.send(genres);
})

app.get('/api/genres/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let desiredGenreResult = genres.find(g => g.id === id);
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

app.post('/api/genres', (req, res) => {
    let newGenre = {
        id: genres.length + 1,
        name: req.body.name
    }

    let error = validateInput(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    genres.push(newGenre);
    res.send(genres);
})

//-------------------PUT REQUESTS----------------------------------------

app.put('/api/genres/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let desiredGenreResult = genres.find(g => g.id === id);
    if (!desiredGenreResult)
        return res.status(404).send(`The genre with the given ID: ${id} is not found`)

    let error = validateInput(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    desiredGenreResult.name = req.body.name;
    res.send(genres);
})

//-------------------DELETE REQUESTS----------------------------------------

app.delete('/api/genres/:id',(req,res)=>{
    let id = parseInt(req.params.id);
    let desiredGenreResult = genres.find(g => g.id === id);
    if (!desiredGenreResult)
        return res.status(404).send(`The genre with the given ID: ${id} is not found`)

    let index = genres.indexOf(desiredGenreResult);
    genres.splice(index,1);

    res.send(genres);

})




let port = process.env.PORT || 3000;
app.listen(port, () => { `Listening on port ${port} .... ` });


