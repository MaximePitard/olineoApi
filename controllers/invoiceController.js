const Invoice = require("../models/Invoice.model.js");

exports.getOne = (req, res) => {
	Invoice.getById(req.params.sellerId,req.body.start_date,req.body.end_date,(data)=>{
		res.json(data)
	});
}
exports.getProducts = (req,res) => {
	Invoice.getSoldProducts(req.params.sellerId,req.body.start_date,req.body.end_date,(data)=>{
		
		res.json(data)
	});
}
exports.getAllInvoices = async (req,res) => {
	Invoice.getAllAccounts(req.body.start_date,req.body.end_date,(accounts) => {
		promises = []
		result = new Array();
		accounts.forEach((account) => {
			promises.push(Invoice.getById(account.sellerId,req.body.start_date,req.body.end_date,(invoice)=>{
				result.push(invoice)
			
			}));
		})
		Promise.all(promises).then(()=> {
			res.json(result)
		})
	})
}
exports.getAccounts = async (req,res) => {
	Invoice.getAllAccounts(req.body.start_date,req.body.end_date,(accounts) =>{
		res.json(accounts)
	})
}