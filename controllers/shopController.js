
const Shop = require("../models/Shop.model.js");

exports.findAll = (req,res) => {
	Shop.getAll(req.params.shopId,(err,data)=>{
		res.json(data)
	})
}

exports.findOne = (req, res) => {
	Shop.getById(req.params.shopId,(err,data)=>{
		res.json(data);
	})
}
 