var express = require('express');
const category = require('../schema/category');
var router = express.Router();
var Category = require('../schema/category')

var dataCat = []; // array of category and subcategory
var dataEdit;

/* GET home page. */
router.get('/', async (req, res, next)=>{
  dataCat = await Category.find().sort({mainCat:1,subCat:1}).then(data => {return data}).catch(err=>{console.log(err)})

  res.render('editCategory', {dataCat, dataEdit});
});

// router.post('/insert-new',(req,res)=>{
//   var mainCat = req.body.category
//   var subCat = req.body.subcategory

//   myCategory = new Category({mainCat, subCat})
//   myCategory.save()

//   res.redirect('/editcategory/');
// })
router.post('/delete-id', async (req,res)=>{
  _id = req.body.objectId
  myCat = await Category.findByIdAndDelete(_id)
  // deleteOne({_id})

  res.redirect('/editcategory')
})

router.post('/update', async(req,res)=>{
  console.log(req.body)
  mainCat = req.body.category
  subCat = req.body.subcategory
  
  await Category.findByIdAndUpdate(req.body.objectId,{mainCat, subCat})
  
  dataEdit = undefined

  res.redirect('/editcategory')
})

router.post('/id', async (req,res)=>{
  // console.log(req.body)
  _id = req.body.objectId
  dataEdit = await Category.findOne({_id}).then(data => {return data})  
  console.log(dataEdit)
  res.redirect('/editcategory')
})

module.exports = router;
