var mongoose = require('mongoose');

var inscriptionSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    filePdf: String
})

var inscriptionModel = mongoose.model('inscription',  inscriptionSchema)

module.exports = inscriptionModel;

