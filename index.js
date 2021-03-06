var express = require('express');
var bodyParser = require('body-parser');
var lowdb = require('lowdb');
var uuid = require('uuid');
var server = express();
console.log('var server = express()');
var Todo = require('./models/todo.js');
console.log("var Todo = require('./models/todo.js');");
var port = process.env.PORT || 8080;
var db = lowdb('db.json');

//Database Initialization
db.defaults({todos: []})
  .value(); //The .value() will run the above commands
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

server.get('/todos', function(request, response){
  // response.send('GET todos');
  var todos = db.get('todos')
                .value();
  response.send(todos);
});

server.get('/todos/:id', function(request, response){
  //response.send('GET todos :id');
  //console.log(request.params);
  var todo = db.get('todos')
                 .find({id: request.params.id})
                 .value();
  response.send(todo);
});



server.post('/todos', function(request, response){
  // var todo = {
  //               id: uuid.v4(),
  //               description: request.body.description,
  //               isComplete: false
  //             };
  var todo = new Todo(request.body.description);
  var result = db.get('todos')
                 .push(todo)
                 .last()
                 .value();
  response.send(result);
});

server.put('/todos/:id', function(request, response){
  //response.send('PUT todos :id');
  // var updatedTodoInfo = {
  //                         description: request.body.description,
  //                         isComplete: request.body.isComplete
  //                      };
  var todo = new Todo(request.body.description, request.params.id);
  todo.updateComplete(request.body.isComplete);
  var updatedTodo = db.get('todos')
                      .find({id: request.params.id})
                      .assign(todo)
                      .value();
  response.send(updatedTodo);
});

server.delete('/todos/:id', function(request, response){
  //response.send('GET todos :id');
  //console.log(request.params);
  var todo = db.get('todos')
                 .remove({id: request.params.id})
                 .value();
  response.send(todo);
});

server.listen(port, function(){
  console.log('Now listening on port...' + port);
});
