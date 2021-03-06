var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var livereload = require('connect-livereload');
var livereloadport = 35729;

var mongoose = require('mongoose');
mongoose.connect ('mongodb://localhost/list');
var Schema = mongoose.Schema;

//schema for data 
var toDoSchema = new Schema({
  title : {type : String, required : true},
  description: String,
  is_done : { type : Boolean, default : false},
  created_at : { type : Date, default : Date.now}
});

var Todo = mongoose.model('Todo', toDoSchema);

app.set('view engine','jade');
app.use(express.static(__dirname+'/public'));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(livereload({port: livereloadport}));

  
app.get('/', function (req, res){
  Todo.find(function (err, todos){
    console.log('todo list: ' + todos);
    if (err) throw err;
    res.render('index', { 
      todos : todos 
    });
  });
});

app.delete('/todos/:id', function (req, res){
  // var todo_id = req.params.id;
  Todo.remove({ _id : req.params.id }, function (err){
    if (err) throw err;
    res.redirect('/');
  });
  console.log(Todo);
});

// renders the New Todo page
app.get('/new_todo', function(req, res){
  res.render('new_todo');
});


// saves input to DB from New Todo page
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
  res.redirect('/');
});

// renders the Read task page by id set by url param
app.get('/todos/:id', function (req, res){
  Todo.findById(req.params.id, function (err, todo){
    if (err) throw err;
    res.render('read', {
      todo : todo
    });
  });
});

// edit and update the task on task list page
app.put('/todos/:id', function (req, res){
  Todo.update({ _id : req.params.id },{
      title : req.body.title,
      description : req.body.description
    }, function (err, todo){
      if (err) throw err;
      console.log("UPDATED!");
      res.redirect('/');
  });
});

app.put('/todos/:id/complete', function (req, res){
  Todo.findOneAndUpdate({ _id : req.params.id}, { $set: {
    is_done : true
  }}, function (err){
    if (err) throw err;
    res.send('Okay');
  });
});

app.put('/todos/:id/uncomplete', function (req, res){
  Todo.findOneAndUpdate({ _id : req.params.id}, { $set: {
    is_done : false
  }}, function (err){
    if (err) throw err;
    res.send('Okay');
  });
});


var server = app.listen( (process.env.PORT || 3000), function () {

  var host = server.address().address;
  var port = server.address().port;


  console.log('Example app listening at http://%s:%s', host, port);

});