import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/user';
import mailer from '@/helpers/mailer';

connect();

export async function POST(request: NextRequest) {
	try {
		const { email } = await request.json();
		const user = await User.findOne({ email });

		await mailer({ email, emailType: 'RESET', userId: user._id });

		return NextResponse.json({
			message: 'Password reset link sent to your email',
			success: true,
		});
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
