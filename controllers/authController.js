const crypto = require('crypto');
const { promisify } = require('util');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const sendEmail = require('./../utils/email');
const jwt = require('jsonwebtoken');

const signToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

const createAndSendToken = (user, statusCode, res) => {
	const token = signToken(user._id);
	const cookieOptions = {
		expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
		httpOnly: true,
	};
	if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
	res.cookie('jwt', token, cookieOptions);
	res.status(statusCode).send({
		status: 'success',
		data: { token, user },
	});
};

exports.signup = catchAsync(async (req, res, next) => {
	const user = await User.create(req.body);
	createAndSendToken(user, 200, res);
});

exports.login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return next(new AppError('Please provide email and password', 400));
	}

	const user = await User.findOne({ email }).select('+password');

	if (!user || !(await user.correctPassword(password, user.password))) {
		return next(new AppError('Incorrect email or password', 401));
	}

	createAndSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
	let token;
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1];
	}

	if (!token) {
		return next(new AppError('you are not login', 401));
	}

	// when we call verify with only 2 args :  it will behave as a synchronous fn
	// so we use promisify to make it asynchronous
	const data = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

	const user = await User.findById(data.id);
	if (!user || user.changedPasswordAfter(data.iat)) {
		return next(new AppError('Invalid token , please login again', 401));
	}

	req.user = user;
	next();
});

exports.restrictTo = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return next(new AppError('You do not have permission to perform this action', 403));
		}
		next();
	};
};

exports.forgetPassword = catchAsync(async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email });

	if (!user) {
		return next(new AppError('No user with that email', 404));
	}

	const resetToken = user.createPasswordResetToken();
	await user.save({ validateBeforeSave: false });

	const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/users/reset-password/${resetToken}`;

	const message = `Forget your password ? ${resetUrl}`;

	await sendEmail({ email: user.email, subject: 'Reset Password', message });

	res.status(200).send({
		status: 'success',
		message: 'Token sent',
	});
});

exports.resetPassword = catchAsync(async (req, res, next) => {
	const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

	const user = await User.findOne({ passwordResetToken: hashedToken, passwordResetExpires: { $gt: Date.now() } });

	if (!user) {
		return next(new AppError('Token is invalid or has expired', 400));
	}

	user.password = req.body.password;
	user.passwordConfirm = req.body.passwordConfirm;
	user.passwordResetToken = undefined;
	user.passwordResetExpires = undefined;

	await user.save(); //use save to run all validators and the save pre middleware

	createAndSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
	// get the user
	const user = await User.findById(req.user.id).select('+password');
	// check if password is correct
	if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
		return next(new AppError('Your current password is wrong', 401));
	}
	user.password = req.body.password;
	user.passwordConfirm = req.body.passwordConfirm;

	await user.save();
	createAndSendToken(user, 200, res);
});
