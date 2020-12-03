const db = require("../db.js")
const dbConfig = require('../dbConfig');

//constructor
const Shop = function(shop){}


Shop.getById = async (shopId,result) => {
	query = `SELECT ps_shop.*,CONCAT('http://', su.domain, su.physical_uri, su.virtual_uri) AS url 
			 FROM ps_shop,ps_shop_url su 
			 WHERE ps_shop.id_shop = su.id_shop 
			 AND ps_shop.id_shop = ${shopId}`;

	res = await db.query(query);
	result(null,res)
}
  
Shop.getAll = async (shopId,result) => {
	query = `SELECT ps_shop.*,CONCAT('http://', su.domain, su.physical_uri, su.virtual_uri) AS url 
			 FROM ps_shop,ps_shop_url su WHERE ps_shop.id_shop = su.id_shop`;

	res = await db.query(query);
	result(null,res)
}

module.exports = Shop