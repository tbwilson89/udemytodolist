var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var port = process.env.PORT || 8080

var todoRoutes = require('./routes/todos.js')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + '/views'))
app.use(express.static(__dirname + '/public'))

app.get('/', function(req,res){
  res.sendFile('index.html')
})

app.use('/api/todos', todoRoutes)

app.listen(port, ()=>{
  console.log('App is definitely running on port: ' + port)
})
