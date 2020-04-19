//SELECTORS START
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo')
//SELECTORS END

//EVENT LISTENERS START
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);
//EVENT LISTENERS END


//FUNCTIONS START
function addTodo(event){
  event.preventDefault();

  // Create div
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');
  // Create li
  const newTodo = document.createElement('li');
  newTodo.innerHTML = todoInput.value;
  newTodo.classList.add('todo-item');
  // У нас будет div с li внутри
  todoDiv.appendChild(newTodo);

  // ADD TODO TO LOCALSTORAGE
  saveLocalTodos(todoInput.value);
  
  //Check mark button
  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add('complete-btn');
  todoDiv.appendChild(completedButton);
  //Trash button
  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add('trash-btn');
  todoDiv.appendChild(trashButton);
  //APPEND to list
  todoList.appendChild(todoDiv);
  //Clear Input value
  todoInput.value = "";
}

function deleteCheck(event){
  const item = event.target;

  //Delete TODO
  if(item.classList[0] === 'trash-btn'){
    const todo = item.parentElement;
    //Добавляем анимацию по кнопке удаления, но элементы остаются
    todo.classList.add('fall');
    removeLocalTodos(todo);
    //Удаление элементов, только после тогоЮ как пройдет анимация
    todo.addEventListener('transitionend', function(){
      todo.remove();
    })
  }

  //Check MARK
  if(item.classList[0] === 'complete-btn'){
    const todo = item.parentElement;
    todo.classList.toggle('completed')
  }
}


//Читает options name (all, complete...)
function filterTodo(event) {
  const todos = todoList.childNodes;
  todos.forEach(function(todo){
    switch(event.target.value){
      case 'all':
        todo.style.display = 'flex'
        break;
      case 'completed':
        if(todo.classList.contains('completed')){
          todo.style.display = 'flex';
        }else{
          todo.style.display = 'none';
        }
        break;
      case 'uncompleted':
        if(!todo.classList.contains('completed')){
          todo.style.display = 'flex';
        }else {
          todo.style.display = 'none';
        }
        break;
    }
  });
}

//Local Storage
function saveLocalTodos(todo) {
  //Check -- есть ли у нас todos
  let todos;
  if(localStorage.getItem('todos') === null) {
    // Если нет, делаем пустой массив
    todos = [];
  }else{
    // Получаем todo из localStorage
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  // Если есть массив => пушим todo
  todos.push(todo);
  // Присылаем его обратно в localStorage
  localStorage.setItem('todos', JSON.stringify(todos));
}

//Выводит даныне на страницу из localStorage
function getTodos() {
  let todos;
  if(localStorage.getItem('todos') === null) {
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(function(todo){
      // Create div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // Create li

    const newTodo = document.createElement('li');
    newTodo.innerHTML = todo;
    newTodo.classList.add('todo-item');

    // У нас будет div с li внутри
    todoDiv.appendChild(newTodo);

    //Check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    //Trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    //APPEND to list
    todoList.appendChild(todoDiv);
  })
}


//Удаляем данные из localStorage
function removeLocalTodos(todo) {
  let todos;
  if(localStorage.getItem('todos') === null) {
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  //При помощи splice и индекса
  // С какой позиции удалять элемент todos.indexOf(todoIndex), 1 -количетсво удаляемых объектов
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  
  //Должны вернуть данные об изменении  в localStorage 
  localStorage.setItem('todos', JSON.stringify(todos));
}P
//FUNCTIONS END
