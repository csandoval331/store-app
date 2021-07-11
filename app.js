var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')

var Category = require('./schema/category')
var Product = require('./schema/product')

var server = 'localhost'
var database = 'store-app'

var indexRouter = require('./routes/index');
var addInventory = require('./routes/addInventory');
var editInventory = require('./routes/editInventory');
var updateStore = require('./routes/updateStore');
var addCategory = require('./routes/addCategory');
var editCategory = require('./routes/editCategory');



mongoose.connect(`mongodb://${server}/${database}`,{
  useNewUrlParser: true,
  useUnifiedTopology: true, 
  useFindAndModify: false,
  useCreateIndex: true
}).then(()=>{
  console.log('Mongodb connected!!')
}).catch( err =>{
  console.log('Failed to connect to MongoDB', err)
})

Category.findOne({mainCat:'none', subCat:'none'} ).then(data=>{
  if(!data){
    //none-none does not exist
    noneCat = new Category({mainCat:'none', subCat:'none'})
    noneCat.save().then(data => console.log(data) )
  }
  else{
    //none-none already exist
    console.log('none-none exists')
  }
}).catch(err=>{console.log(err) })

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js')))
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css/bootstrap.min.css')))

app.use('/', indexRouter);
app.use('/addinventory', addInventory);
app.use('/editinventory', editInventory);
app.use('/updatestore', updateStore);
app.use('/addcategory', addCategory);
app.use('/editcategory', editCategory);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
