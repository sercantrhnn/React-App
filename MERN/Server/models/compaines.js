const mongoose = require('mongoose')

const CompainesSchema = new mongoose.Schema({
    name: String,
    legal_number: Number,
    country: String,
    website: String
})

const CompainesModel = mongoose.model("compaines", CompainesSchema)
module.exports = CompainesModel