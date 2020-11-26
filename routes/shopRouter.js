const express = require('express');
const shop = require("../controllers/shopController.js");
sellerRouter = require('./sellerRouter.js');
orderRouter = require('./orderRouter.js');
shopRouter = express.Router();



shopRouter.route('/').get(shop.findAll);

shopRouter.route('/:shopId').get(shop.findOne);


shopRouter.use('/:shopId/sellers',sellerRouter);
shopRouter.use('/:shopId/orders',orderRouter);


module.exports = shopRouter;