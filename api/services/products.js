const mongoose = require('mongoose')
const Product = mongoose.model('Products')
const Shops = mongoose.model('Shops')

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

  * getAllShops() {
    return yield Shops.find()
  }

  * addNewShop(data) {
    const exists = yield Shops.findOne({shopname: data.shopname})
    if(exists == null) {
      return yield Shops.create(data)
    }
  }
}

module.exports = new ProductServices()