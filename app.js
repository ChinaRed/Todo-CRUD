var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect ('mongodb://localhost/list');
var Schema = mongoose.Schema;

//schema for data 
var toDoSchema = new Schema({
  title : String,
  description: String,
  is_done : Boolean,
  created_at : Date
});

var Todo = mongoose.model('Todo', toDoSchema);

app.use(express.static(__dirname+'/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine','jade');

app.get('/', function(req, res){
  res.render('index');
});

app.get('/new_todo', function(req, res){
  res.render('new_todo');
});

app.get('/edit', function(res, res){
  res.render('edit');
});



var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});