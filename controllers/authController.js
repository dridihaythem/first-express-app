const { promisify } = require('util');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const jwt = require('jsonwebtoken');

const signToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

exports.signup = catchAsync(async (req, res, next) => {
	const user = await User.create(req.body);
	const token = signToken(user._id);
	res.status(201).send({
		status: 'success',
		data: { token, user },
	});
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

	const token = signToken(user._id);

	res.status(201).send({
		status: 'success',
		data: { token, user },
	});
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
