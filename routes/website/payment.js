var request= require('request');
var express = require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
var pool = require(path.join(__dirname, '/../../dependencies/connection.js'));
var isLoggedIn = require(path.join(__dirname, '/../../dependencies/checkloggedin.js'));
var passport = require(path.join(__dirname,'/../../dependencies/passportlogin.js'));


function payment(order_id,purpose,amount,phone,buyer_name,email)
{
    
var headers = { 'X-Api-Key': 'd82016f839e13cd0a79afc0ef5b288b3', 'X-Auth-Token': '3827881f669c11e8dad8a023fd1108c2'}
var payload = {
  purpose: purpose,
  amount: amount,
  phone: phone,
  buyer_name: buyer_name,
  redirect_url: '/orderplaced/'+order_id,
  send_email: true,
  webhook: 'http://www.example.com/webhook/',
  send_sms: true,
  email: email,
  allow_repeated_payments: false}

request.post('https://www.test.instamojo.com/api/1.1/payment-requests/', {form: payload,  headers: headers}, function(error, response, body){
  if(!error && response.statusCode == 201){
    console.log(body);
  }
});
}

