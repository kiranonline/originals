//----------------------webpush notification-------------------
const webpush = require('web-push');
const publicVapidKey = 'BNSNBlyOuhqiVdXpNeykqQeuW1teX5UMtvKKmpFf3Xp5XmCKwX4o23Se9u5I2DGZImTmkxuMm-G2BLNZYdvmgoo';
const privateVapidKey = '0PA3A5mym1C_fW62zah-8MbQ1Nm-K_CsBC5tQAypZe0';
webpush.setVapidDetails('mailto:test@test.com',publicVapidKey,privateVapidKey);




function SendPushNotification(subscription,payload,callback){

    webpush.sendNotification(subscription,payload).catch(err=>console.log(err));
    callback();
}












module.exports=SendPushNotification;

