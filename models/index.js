var mongoose = require('mongoose')
mongoose.set('debug', true)
mongoose.connect('mongodb://admin:admin@ds255767.mlab.com:55767/udemydb')

mongoose.Promise = Promise

module.exports.Todo = require('./todo')
