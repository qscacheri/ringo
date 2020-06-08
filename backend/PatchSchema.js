const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PatchSchema = new Schema({
    username: String,
    patchData: String,
    patchName: String,
    visiblity: String,
});

module.exports = mongoose.model('Patch', PatchSchema, 'patches')
