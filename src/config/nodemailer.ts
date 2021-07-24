import nodemailer = require('nodemailer')
import dotenv from 'dotenv';
dotenv.config();

export const userEmail = "server.mails.jovani@gmail.com";//change for another user
export const pswEmail = "kagmjcdlkzonbvrz";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: userEmail, 
    pass: pswEmail,
  },
});



transporter.verify().then(() =>{
    console.log('nodemailer ready for send emails');
})
