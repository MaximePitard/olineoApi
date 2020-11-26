
const Order = require("../models/Order.model.js");

exports.findAll = (req,res) => {
	Order.getAll(req.params.shopId,req.params.sellerId,(err,data)=>{
		res.json(data)
	})
}

exports.findOne = (req, res) => {
	Order.getById(req.params.shopId,req.params.sellerId,req.params.orderId,(err,data)=>{
		res.json(data);
	})
}
 