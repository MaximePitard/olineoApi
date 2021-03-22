const config = require('../config.js');
const Stripe = require('stripe');
const stripe = Stripe(config.transactionKey);
const User = require('./User.model.js')
const db = require("../db.js");

//constructor
const Invoice = function(invoice){}


Invoice.getById = async (id,start_date,end_date,result) => {
	account = await Invoice.getAccount(id)
	total = await Invoice.getTotal(account,start_date,end_date)
	let user = await User.findOne({sellerId:id}, 'address name').exec();
	result({
		account:total.stripe,
		name:user.name,
		address:user.address,
		sales:total.CA,
		commission:total.commission
	})

}


Invoice.getTotal = async (accountId,start_date,end_date) => {

	query = `
	SELECT total.stripe as stripe, sum(total.CA) as CA, sum(total.commission) as commission
	FROM
		(SELECT DISTINCT
				sp.account stripe,
				sum(total_price_tax_incl) CA,
				sum(total_price_tax_incl) - sum(total_commission_tax_incl) commission
				FROM ps_seller_order_detail sod, ps_seller_order so, ps_seller_payment sp
				WHERE
					sod.reduction_amount = 0
				AND so.id_seller_order = sod.id_seller_order
				AND sp.id_seller = so.id_seller
				AND sp.account ='${accountId}'
				AND so.id_shop != 3
				AND so.ref_transfer_stripe != ''
				AND so.date_add BETWEEN '${start_date}' AND '${end_date}' 
				group by sp.account
		UNION
		SELECT DISTINCT
				sp.account stripe,
				sum(total_price_tax_incl) - sum(reduction_amount) CA,
				sum(total_price_tax_incl)- sum(reduction_amount) - sum(total_commission_tax_incl) commission
				FROM ps_seller_order_detail sod, ps_seller_order so, ps_seller_payment sp
				WHERE
					sod.reduction_amount != 0
				AND so.id_seller_order = sod.id_seller_order
				AND sp.id_seller = so.id_seller
				AND sp.account ='${accountId}'
				AND so.id_shop != 3
				AND so.ref_transfer_stripe != ''
				AND so.date_add BETWEEN '${start_date}' AND '2021-02-16 23:59:59'
				AND so.date_add BETWEEN '${start_date}' AND '${end_date}' 
				group by sp.account
		UNION
		SELECT DISTINCT
				sp.account stripe,
				sum(total_commission_tax_incl) + sum(reduction_amount) CA,
				sum(reduction_amount) commission
				FROM ps_seller_order_detail sod, ps_seller_order so, ps_seller_payment sp
				WHERE
					sod.reduction_amount != 0
				AND so.id_seller_order = sod.id_seller_order
				AND sp.id_seller = so.id_seller
				AND sp.account ='${accountId}'
				AND so.id_shop != 3
				AND so.ref_transfer_stripe != ''
				AND so.date_add BETWEEN '2021-02-17 00:00:00' AND '${end_date}'
				AND so.date_add BETWEEN '${start_date}' AND '${end_date}' 
				group by sp.account
				) as total
	group by total.stripe
	`
	res = await db.query(query);
	return res[0]
}

Invoice.getAccount = async (sellerId) => {
	query = `
		SELECT DISTINCT sp.account, s.id_seller

		FROM ps_seller_payment sp, ps_seller s

		WHERE s.id_seller = sp.id_seller
		AND sp.account != ''
		AND s.id_seller = ${sellerId} 
		ORDER BY s.id_seller
	`
	res = await db.query(query);
	return res[0].account
}

Invoice.getSoldProducts = async (sellerId,start_date,end_date,result) => {
	query = `
	SELECT 	total.nom, 
			total.quantité, 
			total.prix_ht, 
			total.tva, 
			total.prix_ttc, 
			total.réductions_appliquées, 
			total.commission_prélevée, 
			DATE_FORMAT(total.date_add, "%d-%m-%Y %k:%i") date_de_vente 
	FROM
		(SELECT DISTINCT
				sod.product_name nom,
				sod.product_quantity quantité,
				REPLACE(sod.total_price_tax_excl, '.', ',') prix_ht,
				REPLACE(sod.tax_rate, '.', ',')  tva, 
				REPLACE(sod.total_price_tax_incl, '.', ',') prix_ttc,
				REPLACE(sod.reduction_amount, '.', ',') réductions_appliquées,
				REPLACE(sod.total_price_tax_incl - sod.total_commission_tax_incl, '.', ',') commission_prélevée,
				so.date_add date_add
				FROM ps_seller_order_detail sod, ps_seller_order so
				WHERE so.id_seller_order = sod.id_seller_order
				AND sod.reduction_amount = 0
				AND so.id_seller = ${sellerId}
				AND so.id_shop != 3
				AND so.date_add BETWEEN '${start_date}' AND '${end_date}'
		UNION
		SELECT DISTINCT
				sod.product_name nom,
				sod.product_quantity quantité,
				REPLACE(sod.total_price_tax_excl, '.', ',') prix_ht,
				REPLACE(sod.tax_rate, '.', ',')  tva, 
				REPLACE(sod.total_price_tax_incl, '.', ',') prix_ttc,
				REPLACE(sod.reduction_amount, '.', ',') réductions_appliquées,
				REPLACE(sod.total_price_tax_incl - sod.total_commission_tax_incl - sod.reduction_amount, '.', ',') commission_prélevée,
				so.date_add date_add
				FROM ps_seller_order_detail sod, ps_seller_order so
				WHERE
					sod.reduction_amount != 0
				AND so.id_seller_order = sod.id_seller_order
				AND so.id_shop != 3
				AND so.id_seller = ${sellerId}
				AND so.date_add BETWEEN '${start_date}' AND '2021-02-16 23:59:59'
				AND so.date_add BETWEEN '${start_date}' AND '${end_date}' 
		UNION
		SELECT DISTINCT
				sod.product_name nom,
				sod.product_quantity quantité,
				REPLACE(sod.total_price_tax_excl, '.', ',') prix_ht,
				REPLACE(sod.tax_rate, '.', ',')  tva, 
				REPLACE(sod.total_price_tax_incl, '.', ',') prix_ttc,
				REPLACE(sod.total_price_tax_incl - sod.reduction_amount - sod.total_commission_tax_incl, '.', ',') réductions_appliquées,
				REPLACE(sod.reduction_amount, '.', ',') commission_prélevée,
				so.date_add date_add
				FROM ps_seller_order_detail sod, ps_seller_order so
				WHERE
					sod.reduction_amount != 0
				AND so.id_seller_order = sod.id_seller_order
				AND so.id_shop != 3
				AND so.id_seller = ${sellerId}
				AND so.date_add BETWEEN '2021-02-17 00:00:00' AND '${end_date}'
				AND so.date_add BETWEEN '${start_date}' AND '${end_date}') total
	ORDER BY total.date_add
	`
	res = await db.query(query);
	result(res)
}

Invoice.getAllAccounts = async (start_date,end_date,result) => {
	query = `
	SELECT DISTINCT so.id_seller sellerId
	FROM ps_seller_order so
	WHERE so.id_shop != 3 
	AND so.date_add BETWEEN '${start_date}' AND '${end_date}'
	`
	res = await db.query(query);
	result(res);
}



module.exports = Invoice;