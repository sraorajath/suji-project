const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const products = mongoose.Schema({
  name: mongoose.Schema.Types.String,
  image: mongoose.Schema.Types.String,
  quantity: mongoose.Schema.Types.Number,
  type: mongoose.Schema.Types.String
})

mongoose.model('Products', products)