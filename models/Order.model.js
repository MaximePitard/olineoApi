const db = require("../db.js")

//constructor
const Order = function(order){}



Order.getById = async (shopId,sellerId,orderId,result) => {
	if(typeof shopId == 'undefined' && typeof sellerId == 'undefined'){
		// orders/:id
		query = `SELECT DISTINCT s.name as sellerName , reference, CONCAT(c.firstname,' ',c.lastname) as clientName ,product_name,product_quantity 
				FROM ps_order_detail d,ps_seller_product p, ps_orders o, ps_seller s,ps_customer c 
				WHERE s.id_seller = p.id_seller_product 
				AND o.id_order = d.id_order  
				AND p.id_product = d.product_id 
				AND c.id_customer = o.id_customer 
				AND reference LIKE "%${orderId}%" 
				ORDER BY sellerName`;
		
	}
	else if(typeof sellerId == 'undefined'){
		//shops/:id/orders/:id
		query = `(SELECT DISTINCT o.reference, CONCAT(c.firstname,' ',c.lastname) as clientName ,CONCAT('tel : ',a.phone) as phone ,pdc.hour ,s.name as sellerName, l.name as driveName 
				FROM ps_order_state_lang osl, ps_customer c,ps_prestatill_drive_creneau pdc,ps_store_lang l, 
					 ps_address a,ps_orders o,ps_seller s,ps_seller_order so 
				WHERE c.id_customer = a.id_customer
				AND o.id_customer = c.id_customer 
				AND s.id_seller = so.id_seller 
				AND s.id_shop = ${shopId} 
				AND o.current_state != 6
				AND so.id_order = o.id_order 
				AND pdc.id_order = o.id_order 
				AND pdc.id_store = l.id_store 
				AND o.reference LIKE "%${orderId}%" 
				ORDER BY o.reference)
				UNION
				(SELECT DISTINCT o.reference, CONCAT(c.firstname,' ',c.lastname) as clientName ,CONCAT('tel : ',a.phone) as phone ,pdc.hour ,s.name as sellerName, l.name as driveName
				FROM ps_order_state_lang osl, ps_customer c,ps_prestatill_homedelivery_creneau pdc,
					 ps_address a,ps_orders o,ps_seller s,ps_seller_order so, ps_carrier l
				WHERE c.id_customer = a.id_customer
				AND o.id_customer = c.id_customer 
				AND s.id_seller = so.id_seller 
				AND s.id_shop = ${shopId}  
				AND o.current_state != 6 
				AND so.id_order = o.id_order 
				AND pdc.id_order = o.id_order
				AND o.id_carrier = l.id_carrier
				AND o.reference LIKE "%${orderId}%" 
				ORDER BY o.reference)

				`;
	}
	else{
		//sellers/:id/orders/:id
		//shops/:id/sellers/:id/orders/:id
		query = `SELECT DISTINCT reference, CONCAT(c.firstname,' ',c.lastname) as clientName ,product_name,product_quantity 
				FROM ps_order_detail d,ps_seller_product p, ps_orders o, ps_seller s,ps_customer c 
				WHERE s.id_seller = p.id_seller_product 
				AND o.current_state != 6 
				AND o.id_order = d.id_order 
				AND p.id_product = d.product_id 
				AND c.id_customer = o.id_customer 
				AND reference LIKE "%${orderId}%" 
				AND s.id_seller = ${sellerId} 
				ORDER BY reference`;
	}
	
	res = await db.query(query);
	result(null,res)
}
  
Order.getAll = async (shopId,sellerId,result) => {
	if(typeof shopId == 'undefined' && typeof sellerId == 'undefined'){
		query = ``;

	}
	else if(typeof shopId == 'undefined'){
		query = ``;
	}
	else if(typeof sellerId == 'undefined'){
		query = ``;
	}
	else{
		query = ``;
	}

	res = await db.query(query);
	result(null,res)
}
module.exports = Order