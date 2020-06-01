require('dotenv').config()
const jwt = require("jsonwebtoken");

const generateAccessToken = (username) => {
    return jwt.sign(username, process.env.TOKEN_SECRET)
}
module.exports.generateAccessToken = generateAccessToken

const authenticateToken = (req, res, next) => {    
    const token = req.headers.authorization.split(' ')[1]
    
    if (token == null) return res.sendStatus(401) // if there isn't any token

    jwt.verify(token, process.env.TOKEN_SECRET, (err, username) => {
        if (err) return res.sendStatus(403)
        req.username = username
        next() // pass the execution off to whatever request the client intended
    })
}
module.exports.authenticateToken = authenticateToken


