// Objects & methods
var todoList = {
  todos: [],
  addTodo: function(todoText) {
    this.todos.push({
      todoText,
      completed: false
    });
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;

    this.todos.forEach(function(todo) {
      if(todo.completed === true) {
        completedTodos++;
      }
    });

    this.todos.forEach(todo => {
      // Case 1: If everything is true, make it false.
      if(completedTodos === totalTodos) {
        todo.completed = false;
      // Case 2: Otherwise, make everything true.
      } else {
        todo.completed = true;
      }
    });
  }
};

// // 1. We want to get access to the display todos button.
// var displayTodosButton = document.getElementById('displayTodosButton');

// //2. We want to run displayTodos method, when someone clicks the display todos button.

// displayTodosButton.addEventListener('click', function() {
//   todoList.displayTodos();
// });

// var toggleAllButton = document.getElementById('toggleAllButton');

// toggleAllButton.addEventListener('click', function() {
//   todoList.toggleAll();
// });

// Refactored code of lines above
var handlers = {
  addTodo: function() {
    var addTodoTextInput = document.getElementById('addTodoTextInput');

    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
  },
  changeTodo: function() {
    var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');

    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
    view.displayTodos();
  },
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function() {
    var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');

    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = '';
    view.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();  
  }
};

var view = {
  displayTodos: function() {
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';
    for(var i = 0; i < todoList.todos.length; i++) {
      var todoLi = document.createElement('li');

      if(todoList.todos[i].completed) {
        todoLi.textContent = `(x) ${todoList.todos[i].todoText}`;
      } else {
        todoLi.textContent = `( ) ${todoList.todos[i].todoText}`;
      }

      todoLi.id = i;
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);
    }
  },
  createDeleteButton: function() {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  setUpEventListeners: function() {
    var todosUl = document.querySelector('ul');
    todosUl.addEventListener('click', function(event) {
      var elementClicked = event.target;
      if(elementClicked.className === 'deleteButton') {
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }
    });
  }
};

view.setUpEventListeners();