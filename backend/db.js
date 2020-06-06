const mongoose = require('mongoose');
const User = require('./UserSchema')
const Patch = require('./PatchSchema')
const Authentication = require('./authentication')

require('dotenv').config()

const connect = () => {
    mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true });
}
module.exports.connect = connect

const login = async (username, password) => {
    const user = await User.findOne({ username })
    const userExists = user ? true : false

    if (!userExists || user.password !== password) {
        return 401
    }
    else return 200
    
}
module.exports.login = login

const signup = async (username, password, passwordConfirmation, email) => {
    const user = await User.findOne({ username })
    const userExists = user ? true : false

    if (password !== passwordConfirmation) return 400

    if (!userExists) {
        await User.create({ username, password, email });
        return 200
    }

    else return 409
    
}
module.exports.signup = signup
