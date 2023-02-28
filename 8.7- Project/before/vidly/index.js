const express = require('express');
const app = express();
const winston = require('winston')

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config');

// throw new Error('Something Failed during Start up')
// const p = Promise.reject(new Error('Something failed misrebly!!'));

// p.then(() => console.log('Done'));


//export vidly_jwtPrivateKey=123 in the terminal

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));