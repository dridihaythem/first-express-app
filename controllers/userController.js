const User = require('../models/userModel');
const AppError = require('../utils/AppError');
const catchAsync = require('./../utils/catchAsync');

exports.updateMe = catchAsync(async (req, res, next) => {
	if (req.body.password || req.body.correctPassword) {
		return next(new AppError('this route is not for password updates', 400));
	}
	const { name, email } = req.body;
	const user = await User.findByIdAndUpdate(req.user.id, { name, email }, { new: true, runValidators: true });

	res.status(200).json({
		status: 'success',
		data: { user },
	});
});

exports.getAllUsers = (req, res) => {
	res.status(500).json({
		status: 'error',
		message: 'this route is not yet defined!',
	});
};
exports.createUser = (req, res) => {
	res.status(500).json({
		status: 'error',
		message: 'this route is not yet defined!',
	});
};
exports.getUser = (req, res) => {
	res.status(500).json({
		status: 'error',
		message: 'this route is not yet defined!',
	});
};
exports.updateUser = (req, res) => {
	res.status(500).json({
		status: 'error',
		message: 'this route is not yet defined!',
	});
};
exports.deleteUser = (req, res) => {
	res.status(500).json({
		status: 'error',
		message: 'this route is not yet defined!',
	});
};
