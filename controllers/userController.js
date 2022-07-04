const User = require('./../models/userModel');

exports.getAllUsers = (req, res) => {
	res.send('get all users');
};
exports.getUser = (req, res) => {
	res.send('get user');
};
exports.createUser = async (req, res) => {
	try {
		const user = await User.create(req.body);
		res.status(500).json({ status: 'success', data: { user } });
	} catch (e) {
		res.status(500).json({ status: 'fail', message: e });
	}
};
exports.updateUser = (req, res) => {
	res.send('update user');
};
exports.deleteUser = (req, res) => {
	res.send('delete user');
};
