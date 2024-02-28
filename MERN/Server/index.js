const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const CompainesModel = require('./models/compaines.js')
const ProductsModel = require('./models/products.js')
require('dotenv').config();
const app = express()
app.use(cors())
app.use(express.json())


mongoose.connect(process.env.DB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}) 

app.get('/compaines', (req, res)=>{
    CompainesModel.find({})
    .then(compaines => res.json(compaines))
    .catch(err => res.json(err))
})

app.get('/products', (req, res)=>{
    ProductsModel.find({})
    .then(products => res.json(products))
    .catch(err => res.json(err))
})

app.get('/getCompaines/:id', (req, res)=>{
    const id = req.params.id
    CompainesModel.findById({_id:id})
    .then(compaines => res.json(compaines))
    .catch(err => res.json(err))
})

app.get('/getProducts/:id', (req, res)=>{
    const id = req.params.id
    ProductsModel.findById({_id:id})
    .then(products => res.json(products))
    .catch(err => res.json(err))
})

app.put('/updateCompaines/:id', (req,res)=>{
    const id = req.params.id
    CompainesModel.findByIdAndUpdate({_id:id}, {
        name:req.body.name, 
        legal_number:req.body.legal_number, 
        country:req.body.country, 
        website:req.body.website})
    .then(compaines => res.json(compaines))
    .catch(err => res.json(err))
})

app.put('/updateProducts/:id', (req,res)=>{
    const id = req.params.id
    ProductsModel.findByIdAndUpdate({_id:id}, {
        name:req.body.name, 
        category:req.body.category, 
        amount:req.body.amount, 
        amount_Unit:req.body.amount_Unit,
        company:req.body.company
    })
    .then(products => res.json(products))
    .catch(err => res.json(err))
})

app.delete('/deleteCompaines/:id', (req,res)=>{
    const id = req.params.id
    CompainesModel.findByIdAndDelete({_id: id})
    .then(compaines => res.json(compaines))
    .catch(err => res.json(err))
})

app.delete('/deleteProducts/:id', (req,res)=>{
    const id = req.params.id
    ProductsModel.findByIdAndDelete({_id: id})
    .then(products => res.json(products))
    .catch(err => res.json(err))
})

app.post("/createCompaines", (req, res) => {
    CompainesModel.create(req.body)
    .then(compaines => res.json(compaines))
    .catch(err => res.json(err))
})

app.post("/createProducts", (req, res) => {
    ProductsModel.create(req.body)
    .then(products => res.json(products))
    .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log("Server is running.");
})
