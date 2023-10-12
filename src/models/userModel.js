import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, 'Please provide a username'],
		unique: true,
		trim: true,
		maxLength: [20, 'Username cannot be more than 20 characters'],
	},
	email: {
		type: String,
		required: [true, 'Please provide an email'],
		unique: true,
		trim: true,
		maxLength: [20, 'Email cannot be more than 50 characters'],
	},
	password: {
		type: String,
		required: [true, 'Please provide a password'],
		trim: true,
		maxLength: [30, 'Password cannot be more than 50 characters'],
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

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
