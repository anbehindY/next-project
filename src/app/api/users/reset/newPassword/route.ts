import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/user';
import bcrypt from 'bcryptjs';

connect();

export async function POST(request: NextRequest) {
	try {
		const { token, password } = await request.json();
    console.log(token, password)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

		const user = await User.findOne({
			forgotPasswordToken: token,
			forgotPasswordTokenExpiry: { $gt: Date.now() },
		});

		if (!user) {
			return NextResponse.json(
				{ error: 'Invalid or expired token', token, password },
				{ status: 400 },
			);
		}

		user.password = hashedPassword;
		user.forgotPasswordToken = undefined;
		user.forgotPasswordTokenExpiry = undefined;
		await user.save();

		return NextResponse.json({
			message: 'Password reset successful',
			success: true,
		});
	} catch (error: any) {
    const { token, password } = await request.json();

		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
