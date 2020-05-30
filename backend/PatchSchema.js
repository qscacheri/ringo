const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PatchSchema = new Schema({
    username: String,
    visiblity: String,
    data: String
});

module.exports = mongoose.model('Patch', PatchSchema)
