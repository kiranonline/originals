var request= require('request');


function makePayment(res,order_id,purpose,amount,phone,buyer_name,email,callback)
{  
  console.log("makePayment() called");
var headers = { 'X-Api-Key': 'test_da22573aae638ce3fcb53c15f4f', 'X-Auth-Token': 'test_a0e09af12f77bfc6acded07115c'}
var payload = {
  purpose: purpose,
  amount: amount.toString(),
  phone: phone,
  buyer_name: buyer_name,
  order_id:order_id,  
  redirect_url: 'http://the-originals.in/order/payment/success/'+order_id,
  send_email: true,
  webhook: 'http://www.the-originals.in/admin/order/placed/success/'+order_id,
  send_sms: true,
  email: email,
  allow_repeated_payments: false};
request.post('https://test.instamojo.com/api/1.1/payment-requests/', {form: payload,  headers: headers}, function(error, response, body){
var x=JSON.parse(response.body);
if(!error && response.statusCode == 201){
    console.log('i will redirect you to success page');
    res.redirect(x.payment_request["longurl"]);
    return callback();
}
});


}

module.exports=makePayment;

