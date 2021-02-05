var nodemailer = require('nodemailer');
// email sender function

exports.sendEmail = function(req){
// Definimos el transporter
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'tpapiuaede@gmail.com',
            pass: '123456Api'
        }
    });
// Definimos el email
mailOptions=req
// Enviamos el email
transporter.sendMail(mailOptions, function(error, info){
    if (error){
        console.log(error);
        //res.send(500, err.message);
    } else {
        console.log("Email sent");
        res.status(200).jsonp(req.body);
    }
});
};