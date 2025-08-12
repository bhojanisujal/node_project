const mongoose = require("mongoose")

const categorySchema =new mongoose.Schema({
    Categoryname: {
        type: String,
        reqruied: true
    },
    Categoryicone: {
        type: String,
        reqruied: true
    },
    Categoryimage: {
        type: String,
        reqruied: true
    },
    slug: {
        type: String,
        reqruied: true
    },
    isactiv: {
        type: Boolean,
        reqruied: true
    },
},{
    timestamps: true
})

const Category = mongoose.model("Category", categorySchema)

module.exports = Category
