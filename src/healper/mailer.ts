import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

interface SendMailParams {
    email: string;
    emailType: "verify" | "reset";
    userId: string;
}

export const sendMail = async ({ email, emailType, userId }: SendMailParams): Promise<any> => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailType === "verify") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpire: Date.now() + 3600000, // 1 hour
            });
        } else if (emailType === "reset") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpire: Date.now() + 3600000, // 1 hour
            });
        }

        // Looking to send emails in production? Check out our Email API/SMTP product!
const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "986e49cb8b2030",
      pass: "8c7dd414e8546a"
    }
  });

        const mailOptions = {
            from: "ece22123@iiitkalyani.ac.in",
            to: email,
            subject: emailType === "verify" ? "Verify your email" : "Reset your password",
            html: `
                <p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> 
                to ${emailType === "verify" ? "verify your email" : "reset your password"} or just copy 
                and paste the link: <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>
            `,
        };

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;
    } catch (error) {
        console.error("Error in sendMail:", error);
        throw new Error(error instanceof Error ? error.message : "Unknown error in sendMail");
    }
};
