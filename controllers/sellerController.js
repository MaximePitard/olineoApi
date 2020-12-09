
const Seller = require("../models/Seller.model.js");

exports.findAll = (req,res) => {
	Seller.getAll(req.params.shopId,(err,data)=>{
		res.json(data)
	})
}

exports.findOne = (req, res) => {
	Seller.getById(req.params.shopId,req.params.sellerId,(err,data)=>{
		res.json(data);
	})
}
exports.getInvoice = (req,res) => {
	
 }
