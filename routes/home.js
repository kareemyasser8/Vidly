const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    // res.send("Welcome to the Vidly app");
    res.render('index',{title: "Vidly app", message:"hello"})
})

module.exports = router;