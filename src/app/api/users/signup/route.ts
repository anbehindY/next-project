import { connect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/user';
import bcrypt from 'bcryptjs';

connect();

export async function POST(request: NextRequest) {
	try {
		const reqBody = await request.json();
		const { username, email, password } = reqBody;
		console.log(reqBody);
		const user = await User.findOne({ email });

		if (user) {
			return NextResponse.json({ status: 400, message: 'User already exists' });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		const newUser = new User({
			username,
			email,
			password: hashedPassword,
		});

		const savedUser = await newUser.save();
		console.log(savedUser);
		return NextResponse.json({
			message: 'User created successfully',
			success: true,
			savedUser,
		});
	} catch (error: any) {
    console.error(error);
		return NextResponse.json({ status: 500, message: error.message });
	}
}
