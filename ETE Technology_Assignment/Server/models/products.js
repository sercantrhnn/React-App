const mongoose = require('mongoose')

const ProductsSchema = new mongoose.Schema({
    name: String,
    category: String,
    amount: Number,
    amount_Unit: String,
    company: String
})

const ProductsModel = mongoose.model("products", ProductsSchema)
module.exports = ProductsModel