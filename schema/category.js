const mongoose = require('mongoose')

const Category = new mongoose.Schema({
    mainCat:{type:String, lowercase:true, required:true},
    subCat:{type:String, lowercaes:true, default:'none'}
})

module.exports = mongoose.model('Category', Category)