const config = require('config');
const genres = require('./routes/genres')
const home = require('./routes/home')
const startupDebugger = require('debug')('app:startup'); //debug app namespace
const dbDebugger = require('debug')('app:db');
const express = require('express');
const Joi = require('joi');
const logger = require('./middleware/logger');
const helmet = require('helmet')
const morgan = require('morgan');
const app = new express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'))

app.set('view engine','pug'); //express will internally load this module

app.use(logger);
app.use(helmet());

const genresCategories = [
    { id: 1, name: "comedy" },
    { id: 2, name: "Horror" },
    { id: 3, name: "Action" },
    { id: 4, name: "Science Fiction" }
]


//Configuration
console.log("Application Name: "+ config.get('name'))
console.log("Mail Server: "+ config.get('mail.host'))
console.log("Mail Password: "+ config.get('mail.password'))

if(app.get('env') === "development"){
    app.use(morgan('tiny')); //logs the req on the console
    startupDebugger("mogan enabled...")
}

//Db work ...
dbDebugger('Connected to the database...');

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get('env')}`) //development testing or production environment

app.use('/api/genres',genres);
app.use('/',home);


let port = process.env.PORT || 3000;
app.listen(port, () => { `Listening on port ${port} .... ` });


