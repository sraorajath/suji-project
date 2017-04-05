const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
require('./config.json')
require('./api/config/db-config.js')
const api = require('./api/api.js')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'html')

app.use(express.static(path.join(__dirname, 'public')))
app.use('/views', express.static(path.join(__dirname, 'views')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//CSS
app.use('/bootstrap.css', express.static(path.join(__dirname, '/bower_components/bootstrap/dist/css/bootstrap.min.css')))
app.use('/bootstrap-theme.css', express.static(path.join(__dirname, '/bower_components/bootstrap/dist/css/bootstrap-theme.min.css')))

//JS
app.use('/angular.js', express.static(path.join(__dirname, 'bower_components/angular/angular.min.js')))
app.use('/angular-ui-router.js', express.static(path.join(__dirname, 'bower_components/angular-ui-router/release/angular-ui-router.min.js')))
app.use('/bootstrap.js', express.static(path.join(__dirname, '/bower_components/bootstrap/dist/js/bootstrap.min.js')))
app.use('/jquery.js', express.static(path.join(__dirname, '/bower_components/jquery/dist/jquery.min.js')))

app.use('/api/', api)

app.get('/', function(req, res) {
  res.render('index.html.ejs')
})

app.listen(8080, function() {
  console.log("server started")
})

module.exports = app