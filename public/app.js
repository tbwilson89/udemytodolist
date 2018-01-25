$(document).ready(function(){

  let listNum = 0;

  $.getJSON('/api/todos')
  .then(addTodos)

  $('.list li').on('click', function(e){
    console.log('Test click')
    console.log(e.target.id)
  })

  $('#todoInput').keypress((e)=>{
    console.log(e.which)
    if(e.which === 13){
      var newTodo = $('#todoInput').val()
      console.log('This content was added: ' + newTodo)
      $.post('/api/todos', {'name': newTodo})
      var appendTodo = $('<li class="task">'+newTodo+'</li>')
      $('.list').append(appendTodo)
    }
  })
  $('.list').on('click', 'li', (e)=>{
    console.log(e.target.id + ' ' + $(e.target).hasClass('task'))
    var clickedId = $(this).parent().data('id')
    var putUrl = '/api/todos/' + clickedId
    var newStatus = !$(this).parent().hasClass('done')
    $.ajax({
      method: "PUT",
      url: putUrl
    }, {completed: newStatus})
    .then((data)=>{
      if($(e.target).hasClass('done')){
        $(e.target).removeClass('done')
      } else {
        $(e.target).addClass('done')
      }
      console.log(data)
    })
  })
  $('.list').on('click', 'span', (e)=>{
    console.log('span clicked')
    var clickedId = $(this).parent().data('id')
    var deleteUrl = '/api/todos/' + clickedId
    $.ajax({
      method: 'DELETE',
      url: deleteUrl
    })
    .then((data)=>{
      console.log(data)
      $(this).parent().remove();
    })
  })

})

function addTodos(todos){
  console.log(todos[0].name)
  todos.forEach((todo)=>{
    addTodo(todo)
  })
}

function addTodo(todo){
  var newTodo = $('<li class="task">'+todo.name+' <span>X</span> </li>')
  newTodo.data('id', todo._id)
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
