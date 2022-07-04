const User = require('./../models/userModel');

exports.getAllUsers = async (req, res) => {
	try {
		const users = await User.find();
		res.status(200).json({ status: 'success', data: { users } });
	} catch (e) {
		res.status(500).json({ status: 'fail', message: e });
	}
};
exports.getUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		res.status(200).json({ status: 'success', data: { user } });
	} catch (e) {
		res.status(500).json({ status: 'fail', message: e });
	}
};
exports.createUser = async (req, res) => {
	try {
		const user = await User.create(req.body);
		res.status(200).json({ status: 'success', data: { user } });
	} catch (e) {
		res.status(500).json({ status: 'fail', message: e });
	}
};
exports.updateUser = async (req, res) => {
	try {
		const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
		res.status(200).json({ status: 'success', data: { user } });
	} catch (e) {
		res.status(500).json({ status: 'fail', message: e });
	}
};
exports.deleteUser = async (req, res) => {
	try {
		await User.findByIdAndDelete(req.params.id);
		res.status(200).json({ status: 'success', data: null });
	} catch (e) {
		res.status(500).json({ status: 'fail', message: e });
	}
};
