import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import User from '@/models/user';

export default async ({ email, emailType, userId }: any) => {
	try {

    // Create hash token( for verification or password reset )
		const hashedToken = await bcrypt.hash(userId.toString(), 10);

		if (emailType === 'VERIFY') {
			await User.findByIdAndUpdate(
				userId,

				{
					verifyToken: hashedToken,
					verifyTokenExpiry: Date.now() + 3_600_000,
				}
			);
		} else if (emailType === 'RESET') {
      await User.findByIdAndUpdate(
        userId,
        {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpirty: Date.now() + 3_600_000,
        })
    }

		const transporter = nodemailer.createTransport({
			host: 'sandbox.smtp.mailtrap.io',
			port: 2525,
			auth: {
				user: process.env.MAILTRAP_USER!,
				pass: process.env.MAILTRAP_SECRET!,
			},
		});

		const mailOptions = {
			from: 'anbehindY@gmail.com', // sender address
			to: email, // list of receivers
			subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password', // Subject line
			text: 'Just wanna know how it works', // plain text body
			html: `<p>Click <a href='${process.env.DOMAIN}/verification?token={hashedToken}'>here</a>
      to {emailType === 'VERIFY' ? 'verify your email' : 'reset your password'} or copy and paste the link
      below your browser.<br>${process.env.DOMAIN}/verification?token=${hashedToken}</p>`, // html body
		};

		const info = await transporter.sendMail(mailOptions);
		return info;
	} catch (error: any) {
		throw new Error(error.message);
	}
};
