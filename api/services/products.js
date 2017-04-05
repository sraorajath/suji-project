const mongoose = require('mongoose')
const Product = mongoose.model('Products')

class ProductServices {
  * getAllProducts() {
    return yield Product.find()
  }
}

module.exports = new ProductServices()