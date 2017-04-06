const express = require('express')
const app = express.Router()
const ProductServices = require('./services/products.js')
const _wrap = require('co').wrap

app.get('/getAllProducts/:type', _wrap(function *(req, res) {
  const result = yield ProductServices.getAllProducts(req.params.type)
  if(result != null) {
    res.send({
      status: 200,
      message: 'success',
      data: result
    })
  }
}))

app.get('/getProductById/:productId', _wrap(function *(req, res) {
  const result = yield ProductServices.getProductById(req.params.productId)
  if(result != null) {
    res.send({
      status: 200,
      message: 'success',
      data: result
    })
  }
}))

app.put('/updateProductById/:productId', _wrap(function *(req, res) {
  const result = yield ProductServices.updateProductQuantity(req.params.productId, req.body.quantity)
  if(result != null) {
    res.send({
      status: 200,
      message: 'success',
      data: result
    })
  }
}))

module.exports = app