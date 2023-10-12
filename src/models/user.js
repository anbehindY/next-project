import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, 'Please provide a username'],
		unique: true,
		trim: true,
	},
	email: {
		type: String,
		required: [true, 'Please provide an email'],
		unique: true,
		trim: true,
	},
	password: {
		type: String,
		required: [true, 'Please provide a password'],
		trim: true,
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
	isVerified: {
		type: Boolean,
		default: false,
	},
	verifyToken: {
		type: String,
	},
	forgotPasswordToken: {
		type: String,
	},
	verifyTokenExpiry: {
		type: Date,
	},
	forgotPasswordTokenExpiry: {
		type: Date,
	},
});

const User = mongoose.models.users || mongoose.model('users', userSchema);

export default User;
