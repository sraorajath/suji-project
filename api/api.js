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

module.exports = app