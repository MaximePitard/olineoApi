const express = require('express');
const order = require("../controllers/orderController.js");

orderRouter = express.Router();
orderRouter = express.Router({mergeParams: true});

orderRouter.route('/').get(order.findAll);
orderRouter.route('/:orderId/').get(order.findOne);


module.exports = orderRouter;