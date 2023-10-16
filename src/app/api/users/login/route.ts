import { connect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect();

export async function POST(request: NextRequest) {
	try {
		const reqBody = await request.json();
		const { email, password } = reqBody;

		console.log(reqBody);

		// Check if user either doesn't exist or password is invalid
		const user = await User.findOne({ email });
		const validPassword = await bcrypt.compare(password, user.password);

		if (!user || !validPassword) {
			return NextResponse.json(
				{ error: 'Invalid email or password' },
				{ status: 400 }
			);
		}
    console.log('user exists');
		// Generate JWT
		const tokenData = {
			id: user._id,
			username: user.username,
			email: user.email,
		};

		const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
			expiresIn: '6h',
		});

		const response = NextResponse.json({
			message: 'User logged in successfully',
			success: true,
		});

		response.cookies.set('token', token, {
			httpOnly: true,
		});

		return response;
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
