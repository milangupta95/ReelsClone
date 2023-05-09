const nodemailer = require("nodemailer");
const emaili = require('../secrets').email;
const appPassword = require('../secrets').appPassword;
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
