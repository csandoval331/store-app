const mongoose = require('mongoose')

const Product = new mongoose.Schema({
    name:{type:String, lowercase:true, required:true},
    barcode:{type:String, default:''},
    price:{type:Number , required:true},
    imgPath:{type:String, default:'none'},
    category:{type:mongoose.ObjectId, required:true},
    description:{type:String, default:''}
})

module.exports = mongoose.model('Product', Product)