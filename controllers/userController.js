const User = require('../models/userModel');
const AppError = require('../utils/AppError');
const catchAsync = require('./../utils/catchAsync');
const { deleteOne, updateOne, getOne } = require('./handlerfactory');

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

exports.deleteMe = catchAsync(async (req, res, next) => {
	await User.findByIdAndUpdate(req.user.id, { active: false });

	res.status(204).json({
		status: 'success',
		data: null,
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
exports.getUser = getOne(User);

// FIXME : findByIdAndUpdate will not fire save middlewares
// do not change password with this
exports.updateUser = updateOne(User);
exports.deleteUser = deleteOne(User);
