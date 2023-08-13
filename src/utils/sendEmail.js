const nodemailer = require("nodemailer");
const { emailHost, emailUser, emailPass } = require("../config/secret");


const sendEmail = async(subject, message, send_to, sent_from, reply_to)=>{
    const transporter = nodemailer.createTransport({
        host: emailHost,
        port: 587,
        auth: {
            user: emailUser,
            pass: emailPass,
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const options = {
        from:  sent_from,
        to:  send_to,
        replyTo: reply_to,
        subject:  subject,
        html: message,
    }
    
    transporter.sendMail(options, function(err, info){
        if(err){
            console.log(err)
        }
        console.log(info)
    })
}

module.exports = sendEmail