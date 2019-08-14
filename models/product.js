//  Product Schema


const mongoose = require("mongoose")
const Schema = mongoose.Schema

let productSchema = new Schema({
    merk: String,
    type: String,
    price: Number,
    author: String,
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})

let Product = mongoose.model("Product", productSchema)

module.exports = Product