var nodemailer = require('nodemailer');



function sendMail(f_name,email,link){




    var transporter = nodemailer.createTransport({
        service: 'gmail',
        //port: 587,
        auth: {
            user: 'originals.email.confirmation@gmail.com',
            pass: '.chinmaya123'
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    


    
      //initialising email contents
    let mailOptions = {
        from: 'originals.email.confirmation@gmail.com', // sender address
        to: email, // list of receivers
        subject: 'Originals - Email confirmation', // Subject line
        html: 'Hola, ' + f_name + "!<br>Click on the link below to validate your Originals account.<br>Confirmation Link: " + link // html body
    };
    




    transporter.sendMail(mailOptions, function(error, info){
        
        if (error) {
          console.log(error);
          console.log('i am caled');
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    


}




  module.exports=sendMail;