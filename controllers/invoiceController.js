const Invoice = require("../models/Invoice.model.js");

exports.getOne = (req, res) => {
	Invoice.getById(req.params.sellerId,req.body.start_date,req.body.end_date,(err,data) => {
		var invoice = {
		    logo: "https://www.olineo.fr/olineo/img/logo.png",
		    from: 
		    `S.A.S. OLINEO 
		    31 rue du Calvaire 85290 Saint Laurent sur Sevre
		    RCS La Roche sur Yon 888 642 808 00016
		    Capital : 1000€`,
		    to: destinataire,
		    number: req.body.number,
		    items: [
		        {
		            name: "Commission Olinéo ("+(commissionPercent*100*100)/100+"%) - du "+ begin_date +" au "+ end_date,
		            quantity: 1,
		            unit_cost: comission
		        }
		    ],
		    custom_fields:[
		    {
			"TVA Intracommunautaire":"FR 30 888642808",
			"Escompte pour paiement anticipé":"néant"
			}],
		    tax: 20,
		    notes: "Montant TTC sur la période concernée, à titre indicatif : "+ netSales,
		    terms: `En cas de retard de paiement, conformément à la loi 2008-776
		du 4 août 2008 et en application des articles L441-3 et L441-6 du code de commerce, 
		des intérêts de retard seront dus de plein droit à date d’échéance de la facture,
		à un taux égal à 3 fois le taux d’intérêt légal, ainsi qu’une indemnité forfaitaire de 40 euros 
		pour frais de recouvrement.





		OLINEO - SAS au capital de 1 000 € - RCS La Roche sur Yon 888 642 808 00016 - Code APE 8299Z 
		Tel : 06 31 55 85 27 - Email: contact@olineo.fr - Web : www.olineo.fr`,
		
		};
	});
}