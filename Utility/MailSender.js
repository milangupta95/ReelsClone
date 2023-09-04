const nodemailer = require("nodemailer");
require('dotenv').config();
let emaili = process.env.email;
let appPassword = "hzfaullzpshrrslv";
module.exports = async function sendMail(email,message,subject="OTP") {
    try {
        console.log(emaili);
        console.log(appPassword);
        const mess = (String)(message);
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
              user: emaili, 
              pass: appPassword,
            },
          });
          transporter.sendMail({
            from: 'milanguta95@gmail.com',
            to: email,
            subject: subject,
            text: mess,
          }).then((info) => {
            console.log(info);
          });
    } catch(err) {
      console.log(err);
    }
}
