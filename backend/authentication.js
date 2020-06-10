require('dotenv').config()
const jwt = require("jsonwebtoken");

const generateAccessToken = (username) => {
    return jwt.sign({
        data: username, 
        exp: Math.floor(Date.now() / 1000) + (60 * 60)
    }, process.env.TOKEN_SECRET)
}
module.exports.generateAccessToken = generateAccessToken

const authenticateToken = (req, res, next) => {    
    const auth = req.headers.authorization    
    const token = auth.split(' ')[1]
    
    if (token === null) return res.sendStatus(401) // if there isn't any token

    jwt.verify(token, process.env.TOKEN_SECRET, (err, username) => {        
        if (err) return res.sendStatus(401)
        req.username = username.data
        next() // pass the execution off to whatever request the client intended
    })
}
module.exports.authenticateToken = authenticateToken


