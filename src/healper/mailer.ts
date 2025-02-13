import nodemailer from 'nodemailer';
import User from '@/models/userModel';  
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();


  export const sendMail = async ({email,emailType,userId}:any) => {
    try { 
        const hasedToken= await bcryptjs.hash(userId.toString(), 10,)
        if(emailType ==='verify'){
            await User.findByIdAndUpdate(userId,{
                verifyToken: hasedToken,
                verifyTokenExpire: Date.now() + 3600000
            })
        }else if(emailType ==='reset'){
        
            await User.findByIdAndUpdate(userId,{
                forgotPasswordToken: hasedToken,
                dorgotPasswordTokenExpire: Date.now() + 3600000
            })
        }
       // Looking to send emails in production? Check out our Email API/SMTP product!
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
        user: "986e49cb8b2030",
        pass: "8c7dd414e8546a"
        }
    });

    const mailOptions = {
        from: 'ece22123@iiitkalyani.ac.in',
        to: email,
        subject: emailType==='verify'?'Verify your email':'Reset your password',
        html:`<p>Click <a href="${process.env.domain}/verifyemail?token=${hasedToken}">here</a> 
            to ${emailType === 'verify' ? 'verify your email' : 'reset your password'}
            or just copy paste the link <br> ${process.env.DOMAIN}/verifyemail?token=${hasedToken}</p>`
    }
    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
    } catch (error:any) {
        console.error("Error in sendMail:", error);
        return error;
    }
  }