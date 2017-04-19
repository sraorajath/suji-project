const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const products = mongoose.Schema({
  name: mongoose.Schema.Types.String,
  image: mongoose.Schema.Types.String,
  quantity: mongoose.Schema.Types.Number,
  type: mongoose.Schema.Types.String
})

mongoose.model('Products', products)

const selectedProducts = mongoose.Schema({
  shopname: mongoose.Schema.Types.String,
  selectedProducts: mongoose.Schema.Types.Array,
  createdDate: mongoose.Schema.Types.Date
})

mongoose.model('ShopProducts', selectedProducts)

const shops = mongoose.Schema({
  shopname: mongoose.Schema.Types.String,
  address: mongoose.Schema.Types.String,
})

mongoose.model('Shops', shops)