var https   = require("https");
var fs      = require("fs");
const fse = require('fs-extra')

function generateInvoice(invoice, filename, success, error) {

    var oldPath='././'+filename;
    var newPath="././assets/invoice/"+filename;
    console.log("generateInvoice() called");
    console.log(`oldpath ${oldPath}`);
    console.log(`new Path ${newPath}`);
    var postData = JSON.stringify(invoice);
	
	
    var options = {
        hostname  : "invoice-generator.com",
        port      : 443,
        path      : "/",
        method    : "POST",
        headers   : {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(postData)
        }
    };
	
	

    var file = fs.createWriteStream(filename);

		
    var req = https.request(options, function(res) {
        res.on('data', function(chunk) {
            file.write(chunk);
        })
        .on('end', function() {
            file.end();
            fse.move(oldPath, newPath, err => {
                if (err) return console.error(err)
              
                console.log('file moved!')
              });

            if (typeof success === 'function') {
                success();
            }
        });
    });
   
    req.write(postData);
    req.end();

    if (typeof error === 'function') {
        req.on('error', error);
    }
}
	


/*	
var invoice = {
	logo:"https://www.fixpocket.com/public_assets/uploads/beats/1523422664maxresdefault.jpg",
	from:"Am Patel",
	to:"The Originals",
	number:"Oredr-12345",
	
    header:"Order Invoice",
	to_title:"Amar Patel",
	invoice_number_title:"Order-id",
	payment_terms_title:"Paid",
    items: [
        {
            name: "Subscription to Starter",
            quantity: 1,
            unit_cost: 50
        },
		{
            name: "Subscription to Starter",
            quantity: 1,
            unit_cost: 50
        },
		{
            name: "Subscription to Starter",
            quantity: 1,
            unit_cost: 50
        }
    ],
    fields: {
        tax: "%",
		discounts:true,
		shipping:true
    },
    tax: 0,
	shipping:40,
	amount_paid:400,
    notes: "See You soon!",
    terms: "Order is expedcted to be delevered in 10 days"
};

generateInvoice(invoice, 'originals1.pdf', function() {
    console.log("Saved invoice to invoice.pdf");
}, function(error) {
    console.error(error);
});
*/

function setFields(user_name,order_id,items,total,net_amount,delivery_charge,amount_paid,status,callback){
console.log("setFields() called");
    var invoice = {
        logo:"http://the-originals.in/logos/logo2.png",
        from:"The Originals",
        to: user_name,
        number:order_id,
        
        header:"Order Invoice",
        to_title:"To",
        invoice_number_title:order_id,
        payment_terms_title:status,
        items: items ,
        fields: {
            tax: "%",
            discounts:true,
            shipping:true
        },
        tax: 0,
        shipping:delivery_charge,
        amount_paid:amount_paid,
        notes: "See You soon!",
        terms: "Order is expedcted to be delivered in 10 days"
    };

    var file=order_id+".pdf";
    generateInvoice(invoice, file, function() {
        console.log("Saved invoice to invoice.pdf");
        callback();
    }, function(error) {
        console.error(error);
    });

}

exports.setFields=setFields;

