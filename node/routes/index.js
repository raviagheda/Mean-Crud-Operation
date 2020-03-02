var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydb');

var Schema = mongoose.Schema;

var UserDataSchema = new Schema({
  name: String
}, {collection: 'nameList'});

var UserData = mongoose.model('nameList',UserDataSchema);


/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  UserData.find().then((doc)=>{
    res.send(doc);
  });
});

router.post('/', (req,res,next)=>{
  var data = {name: req.body.name};
  var doc = new UserData(data);
  doc.save();

  res.send();
});

router.get('/delete/:id',(req,res,next)=>{
  UserData.findByIdAndRemove(req.params.id).exec();
  res.send();
});

router.post('/update',(req,res,next)=>{
  UserData.findById(req.body._id,(err,doc)=>{
    if(!err){
      doc.name = req.body.name;
      doc.save();
      res.send();
    }
  });
});
module.exports = router;

