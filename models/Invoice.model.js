const config = require('../config.js');
const Stripe = require('stripe');
const mongoose = require('mongoose');
const stripe = Stripe(config.transactionKey);

var User = require("../models/User.model.js");

//constructor
const Invoice = function(invoice){}


Invoice.getById = async (id,start_date,end_date) => {
	user = await User.findOne({sellerId:id}, 'transactionId').exec();
	
	total = await Invoice.getTotal(user.transactionId,start_date,end_date);
	result(null,total);
}


Invoice.getTotal = async (accountId,start_date,end_date) => {
	console.log(accountId)
	var total = 0;
	for await (const transfer of stripe.transfers.list(
		{
			destination:accountId,
			created:{
				gte:start_date,
				lte:end_date
			} 
		})) {
		total = total + transfer.amount - transfer.amount_reversed
	}
	return total;
}

module.exports = Invoice;