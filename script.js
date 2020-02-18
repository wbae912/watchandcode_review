// Objects & methods
var todoList = {
  todos: [],
  displayTodos: function() {
    if(this.todos.length === 0) {
      console.log('Your todo list is empty!');
    } else {
      console.log('My Todos:');
      for(let i = 0; i < this.todos.length; i++) {
        // console.log(this.todos[i].todoText);
        if(this.todos[i].completed) {
          console.log('(x)', this.todos[i].todoText);
        } else {
          console.log('( )', this.todos[i].todoText);
        }
      }
    }
  },
  addTodo: function(todoText) {
    this.todos.push({
      todoText,
      completed: false
    });
    this.displayTodos();
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
    this.displayTodos();
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
    this.displayTodos();
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
    this.displayTodos();
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;

    for(let i = 0; i < totalTodos; i++) {
      if(this.todos[i].completed === true) {
        completedTodos++;
      }
    }
    if(completedTodos === totalTodos) {
      for(let i = 0; i < totalTodos; i++) {
        this.todos[i].completed = false;
      }
    } else {
      for(let i = 0; i < totalTodos; i++) {
        this.todos[i].completed = true;
      }
    }
    this.displayTodos();
  }
};

// 1. We want to get access to the display todos button.
var displayTodosButton = document.getElementById('displayTodosButton');

//2. We want to run displayTodos method, when someone clicks the display todos button.

displayTodosButton.addEventListener('click', function() {
  todoList.displayTodos();
});

var toggleAllButton = document.getElementById('toggleAllButton');

toggleAllButton.addEventListener('click', function() {
  todoList.toggleAll();
});