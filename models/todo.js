var uuid = require('uuid');
//Constructor function
//How do I build this object?
function Todo(description, id){
  this.id = id || uuid.v4();
  this.description = description;
  this.isComplete = false;
  };

Todo.prototype.updateComplete = function(value){
  if(value.toLowerCase() === 'true'){
    this.isComplete = true;
  } else {
    this.isComplete = false;
  };
};
module.exports = Todo;
