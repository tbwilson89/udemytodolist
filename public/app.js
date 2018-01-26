$(document).ready(function(){

  $.getJSON('/api/todos')
  .then(addTodos)


//Add new Todos!
  $('#todoInput').keypress((e)=>{
    if(e.which === 13){
      createTodo()
    }
  })
  $('.list').on('click', 'span', function(ev){
    ev.stopPropagation();
    removeTodo($(this).parent())
  })
  $('.list').on('click', 'li', function(){
    updateTodo($(this))
  })

  // MARK AS COMPLETE OR UNMARK IT
  // $('.list').on('click', 'li', (e)=>{
  //   console.log(e.target.id + ' ' + $(e.target).hasClass('task'))
  //   var clickedId = $(this).parent().data('id')
  //   var putUrl = '/api/todos/' + clickedId
  //   var newStatus = !$(this).parent().hasClass('done')
  //   $.ajax({
  //     method: "PUT",
  //     url: putUrl
  //   }, {completed: newStatus})
  //   .then((data)=>{
  //     if($(e.target).hasClass('done')){
  //       $(e.target).removeClass('done')
  //     } else {
  //       $(e.target).addClass('done')
  //     }
  //     console.log(data)
  //   })
  // })

  // DELETE THE ITEM FROM THE DATABASE AND LIST
  // $('.list').on('click', 'span', ()=>{
  //   console.log($(this).parent().data('id'))
  //   var clickedId = $(this).parent().data('id')
  //   console.log(clickedId)
  //   var deleteUrl = '/api/todos/' + clickedId
  //   console.log(deleteUrl)
  //   $.ajax({
  //     method: 'DELETE',
  //     url: deleteUrl
  //   })
  //   .then((data)=>{
  //     $(this).parent().remove();
  //   })
  // })

})

//FUNCTIONS TO BE USED BY CLICKS ETC.
function addTodos(todos){
  console.log(todos[0].name)
  todos.forEach((todo)=>{
    addTodo(todo)
  })
}

function addTodo(todo){
  var newTodo = $('<li class="task">'+todo.name+' <span>X</span></li>')
  newTodo.data('id', todo._id)
  newTodo.data('completed', todo.completed)
  if(todo.completed){
    newTodo.addClass("done")
  }
  $('.list').append(newTodo)
}

function createTodo(){
  var userInput = $('#todoInput').val()
  $.post('/api/todos', {'name': userInput})
  .then((newTodo)=>{
    $('#todoInput').val('')
    addTodo(newTodo)
  })
  .catch((err)=>{
    console.log(err)
  })
}

function removeTodo(todo){
  var clickedId = todo.data('id')
  var deleteUrl = '/api/todos/' + clickedId
  $.ajax({
    method: 'DELETE',
    url: deleteUrl
  })
  .then(function(data){
    todo.remove()
  })
}

function updateTodo(todo){
  var updateUrl = '/api/todos/' + todo.data('id')
  var updateTo = todo.data('completed') === true ? false : true
  $.ajax({
    method: "PUT",
    url: updateUrl,
    data: {
      completed: updateTo
    }
  })
  .then(function(data){
    todo.toggleClass('done')
    todo.data('completed', updateTo)
  })
}
