var express = require('express');
var router = express.Router();
var Category = require('../schema/category')
var Product = require('../schema/product')

var dataCat;
var data;
/* GET home page. */
router.get('/', async(req, res)=>{
  dataCat = await Category.find().then(data=>{return data})
  dataCat = JSON.parse(JSON.stringify(dataCat) )
  data = await Product.find().sort({category:1, name:1}).then(data=>{return data })
  data = JSON.parse(JSON.stringify(data))

  for(var dat of data){
    for(var cat of dataCat){
      if(dat.category == cat._id ){
        dat.mainCat = cat.mainCat
        dat.subCat = cat.subCat
        console.log(dat)
      }
    }
  }

  res.render('addInventory', { title: 'Express' , dataCat:dataCat, data});
});

router.post('/insert-new',(req,res)=>{
  console.log(req.body)
  var name = req.body.name
  var barcode = req.body.barcode
  var price = req.body.price
  var category = req.body.category
  var description = req.body.description

  var myProduct = new Product({name,barcode,price,category,description})
  myProduct.save() 

  res.redirect('/addinventory')
})

module.exports = router;
