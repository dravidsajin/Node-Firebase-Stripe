const StripeModule = require('stripe')('testkey');

module.exports = {
	// create a token function
	// we need to pass 4 parameters
	__createToken: function(req, res){

		var card = {
			number: req.number,
			exp_month: req.expmonth,
			exp_year: req.expyear,
			cvc: req.cvc
		};
		StripeModule.tokens.create({card}, function(err, data){
			res(err, data);
		});
	},

	__createCharge: function(req, res){
		//creating a object as input
		var charge = {
			amount: req.amount * 100,
			currency: req.currency,
			source: req.token,
			description: req.description,
			shipping: {
				address: {
					line1: "chennai", //make it static for testing
					city: "San Fransisco",
					country: "US",
					postal_code: "98140",
					state: "CA"
				},
				name: "Dravid Sajin"
			}
		}

		//hit the function
		StripeModule.charges.create(charge, function(err, data){
			res(err, data);
		});
	},

	__getCharge: function(req, res){ // input is charge id
		StripeModule.charges.retrieve('ch_1II7RmG60TOHlDFAqKRiZ21K', function(err, data){
			res(err, data);
		});
	},

	__listCharges: function(res){
		StripeModule.charges.list({limit: 3},function(err, data){
			res(err, data);
		});
	},

	__captureCharge: function(res){
		StripeModule.charges.capture('ch_1II7RmG60TOHlDFAqKRiZ21K', function(err, data){
			res(err, data);
		});
	},

	__updateCharge: function(req, res){

		var metadata = {
			receipt_email: req.email
		}

		StripeModule.charges.update('ch_1II7RmG60TOHlDFAqKRiZ21K',{metadata}, function(err, data){
			res(err, data);
		});
	}
}