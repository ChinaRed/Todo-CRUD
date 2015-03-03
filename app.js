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

app.get('/', function (req, res){
  Todo.find(function (err, todos){
    console.log('todo list: ' + todos);
    if (err) throw err;
    res.render('index', { 
      todos : todos 
    });
  });
  // res.render('index', { title : title, description : description });

});

app.get('/new_todo', function(req, res){
  res.render('new_todo');
});

app.get('/edit', function(req, res){
  res.render('edit');
});

app.post('/new_todo', function(req, res){
  console.log(req.body);
  var newTodo = new Todo({
    title : req.body.title,
    description: req.body.description, 
    is_done : false,
    created_at : new Date()
  });
  newTodo.save(function(err){
    if (err) throw err;
    console.log("saved!");
  });
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});