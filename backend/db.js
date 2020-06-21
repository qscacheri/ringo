const mongoose = require('mongoose');
const User = require('./UserSchema')
const Patch = require('./PatchSchema')
const Authentication = require('./authentication');
const { json } = require('body-parser');

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

const newPatch = async (username) => {
    
    const patchData = JSON.stringify({objects: {}, patchCables: {}})
    const newPatch = await Patch.create({username , patchData, patchName: 'Untitled', visiblity: 'private'}).catch((err) => {
        status = err
    })
    if (newPatch) return 200
}
module.exports.newPatch = newPatch

// UPDATE PATCH
const updatePatch = async (patchID, patchData) => {
    const patch = await Patch.findOne({_id: patchID})    
    const data = JSON.parse(patch.patchData)
    
    if (patchData.objects)
        data.objects = patchData.objects
    if (patchData.patchCables)
        data.patchCables = patchData.patchCables
    
    patch.patchData = JSON.stringify(data)    
    patch.save()
}
module.exports.updatePatch = updatePatch

const updatePatchName = async (patchID, newPatchName) => {
    const patch = await Patch.findOne({_id: patchID})
    patch.patchName = newPatchName
    await patch.save()
    return 200
}
module.exports.updatePatchName = updatePatchName

const getPatch = async (patchID) => {
    const patch = await Patch.findOne({_id: patchID})    
    return patch
}
module.exports.getPatch = getPatch

const getMyPatches = async (username) => {
    const patches = await Patch.find({ username }).catch(err => console.log(err))
    return patches
}
module.exports.getMyPatches = getMyPatches

const deletePatch = async (_id) => {
    const status = await Patch.deleteOne({ _id })
    return status
}
module.exports.deletePatch = deletePatch
