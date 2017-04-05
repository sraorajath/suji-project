const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const products = mongoose.Schema({
  name: mongoose.Schema.Types.String,
  image: mongoose.Schema.Types.String,
  quantity: mongoose.Schema.Types.Number
})

mongoose.model('Products', products)