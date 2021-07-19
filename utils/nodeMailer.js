const nodemailer = require("nodemailer");
const SiteSettings = require("../model/Site");

const EmailNotification=async(email, message, subject)=> {
  const siteset = await SiteSettings.findById("6051fe8435e8702a5a8a0957");

  let transporter = nodemailer.createTransport({
    pool: true,
    port:   siteset.SMTPPort,
    host:    siteset.SMTPServer,
    secure: true,
    auth: {
      // type: 'OAuth2',
      user:   siteset.SMTPMail,
      pass:  siteset.SMTPPassword
    },
  });

  try {
    await transporter.sendMail({
        from: `"ProLive Invest" ${siteset.SMTPMail }`, 
        to:email,
        subject: subject,  
        html: message
      });
      console.log("message sent")
      
  } catch (error) {
      console.log(error+ " is the error")
  }
 
}


module.exports =EmailNotification



