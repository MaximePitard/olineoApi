const db = require("../db.js")
const dbConfig = require('../dbConfig');

//constructor
const Seller = function(seller){}

Seller.getById = async (shopId,sellerId,result) => {
	if(typeof shopId == 'undefined'){
		query = `SELECT ps_seller.* 
				 FROM ps_seller 
				 WHERE ps_seller.id_seller = ${sellerId}`
	}else{
		query = `SELECT ps_seller.* 
				 FROM ps_seller 
				 WHERE ps_seller.id_seller = ${sellerId} 
				 AND ps_seller.id_shop = ${shopId}`;
	}
	res = await db.query(query);
	result(null,res)
}
  
Seller.getAll = async (shopId,result) => {
	if(typeof shopId == 'undefined'){
		query = `SELECT ps_seller.* 
				 FROM ps_seller`;

	}
	else{
		query = `SELECT ps_seller.* 
				 FROM ps_seller 
				 WHERE ps_seller.id_shop = ${shopId}`;
	}
	res = await db.query(query);
	result(null,res)
}

Seller.getInvoice = async (start_date,end_date) => {
	
}



module.exports = Seller