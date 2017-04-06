const mongoose = require('mongoose')
const Product = mongoose.model('Products')

class ProductServices {
  * getAllProducts(type) {
    return yield Product.find({type: type})
  }

  * getProductById(productId) {
    return yield Product.findOne({_id: productId})
  }

  * updateProductQuantity(productId, quantity) {
    const result = yield Product.findOne({_id: productId})
    result.quantity = result.quantity - quantity
    return yield Product.findByIdAndUpdate({_id: productId}, result, {new: true})
  }
}

module.exports = new ProductServices()