function log(req,res,next){
    console.log('Loggin....');
    next(); //for proceeding to the next middlware functions
}

module.exports = log;