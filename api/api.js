const express = require('express')
const app = express.Router()
const ProductServices = require('./services/products.js')
const _wrap = require('co').wrap

app.get('/getAllProducts', _wrap(function *(req, res) {
  const result = yield ProductServices.getAllProducts()
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