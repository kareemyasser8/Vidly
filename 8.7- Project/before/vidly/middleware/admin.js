module.exports = function (req, res, next) {
    if(!req.user.isAdmin){
        return res.status(403).send('Access Denied')
    }
    next();
}

//401 unauthorized when the user try to access a protected resource but they don't have a valid jwt
//403 forbiden when the user try to access a source while they have a valid jwt