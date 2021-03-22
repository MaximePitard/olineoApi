const express = require('express');
const invoice = require("../controllers/invoiceController.js");


invoiceRouter = express.Router();
invoiceRouter.route('/all').post(invoice.getAllInvoices);
invoiceRouter.route('/:sellerId').post(invoice.getOne);
invoiceRouter.route('/:sellerId/products').post(invoice.getProducts);

module.exports = invoiceRouter;