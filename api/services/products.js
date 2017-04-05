const mongoose = require('mongoose')
const Product = mongoose.model('Products')

class ProductServices {
  * getAllProducts() {
    return yield Product.find()
  }

  * updateProductQuantity(productId, quantity) {
    console.log("comes here")
    const result = yield Product.findOne({_id: productId})
    result.quantity = result.quantity - quantity
    return yield Product.findByIdAndUpdate({_id: productId}, result, {new: true})
  }
}

module.exports = new ProductServices()