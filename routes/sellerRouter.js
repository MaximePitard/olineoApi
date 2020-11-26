const express = require('express');
const seller = require("../controllers/sellerController.js");
orderRouter = require("./orderRouter.js")


sellerRouter = express.Router({mergeParams: true});

sellerRouter.route('/').get(seller.findAll);
sellerRouter.route('/:sellerId').get(seller.findOne);
sellerRouter.use('/:sellerId/orders',orderRouter);

module.exports = sellerRouter;