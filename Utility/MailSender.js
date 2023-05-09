const nodemailer = require("nodemailer");
require('dotenv').config();
const emaili = process.env.email;
const appPassword = process.env.appPassword;
module.exports = async function sendMail(email,message,subject="OTP") {
    try {
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
