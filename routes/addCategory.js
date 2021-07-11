var express = require('express');
const category = require('../schema/category');
var router = express.Router();
var Category = require('../schema/category')

/* GET home page. */
router.get('/', async function(req, res, next) {
  data = await Category.find().sort({mainCat:1,subCat:1}).then(data => {return data}).catch(err=>{console.log(err)})

  res.render('addCategory', { title: 'Express', data });
});

router.post('/insert-new',(req,res)=>{
  // console.log(req.body )
  var mainCat = req.body.category
  var subCat = req.body.subcategory
  // var [category, subcategory] = req.body
  console.log("broken apart: ",mainCat, subCat)
  // console.log([1,2,3,4])
  myCategory = new Category({mainCat, subCat})
  myCategory.save()

  res.redirect('/addcategory/');
})

module.exports = router;
