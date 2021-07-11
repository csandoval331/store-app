var express = require('express');
var router = express.Router();
var Category = require('../schema/category')
var Product = require('../schema/product')


var dataCat;
var data;

var dataEdit;
/* GET home page. */
router.get('/', async (req, res)=>{
  dataCat = await Category.find().then(data=>{return data})
  dataCat = JSON.parse(JSON.stringify(dataCat) )
  data = await Product.find().sort({category:1, name:1}).then(data=>{return data })
  data = JSON.parse(JSON.stringify(data))

  for(var dat of data){
    for(var cat of dataCat){
      if(dat.category == cat._id ){

        dat.mainCat = cat.mainCat

        dat.subCat = cat.subCat

        // console.log(dat)

      }
    }
  }

  res.render('editInventory', { title: 'Express', data, dataCat, dataEdit});
});

router.post('/id', async(req,res)=>{
  console.log(req.body)
  dataEdit = await Product.findById(req.body.objectId)
  var dataEdit1 = await Category.findById(dataEdit.category)
  dataEdit = JSON.parse(JSON.stringify(dataEdit ))

  dataEdit.mainCat = dataEdit1.mainCat
  dataEdit.subCat = dataEdit1.subCat

  // console.log(dataEdit, dataEdit1)

  res.redirect('/editinventory')
})

router.post('/update',async(req,res)=>{
  console.log(req.body)
  var objectId = req.body.objectId
  var barcode = req.body.barcode
  var imgPath = 'none'
  var description = req.body.description
  var name = req.body.name
  var price = req.body.price
  var category = req.body.category
  
  // console.log(objectId,imgPath,name,barcode,price,category,description)
  // Category.findById(objectId).then(data=>{console.log("find by id",data)})
  // console.log("data",data)
  await Product.findByIdAndUpdate(objectId,{imgPath,name,barcode,price,category,description} ).then(data=>{console.log(data)}).catch(err=>{console.log(err) })

  res.redirect('/editinventory')
})

module.exports = router;
