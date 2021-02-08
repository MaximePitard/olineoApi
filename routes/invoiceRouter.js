const express = require('express');
const invoice = require("../controllers/invoiceController.js");


invoiceRouter = express.Router();

invoiceRouter.route('/:sellerId').post(invoice.getOne);

module.exports = invoiceRouter;