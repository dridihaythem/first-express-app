const User = require('./../models/userModel');

exports.getAllUsers = (req, res) => {
	res.status(200).send({ status: 'success', data: [] });
};

exports.getUser = (req, res) => {
	res.status(200).send({ status: 'success', data: [] });
};

exports.createUser = async (req, res) => {
	try {
		const user = await User.create(req.body);
		res.status(201).send({ status: 'success', data: { user: user } });
	} catch (e) {
		res.status(201).send({ status: 'fail', message: e.message });
	}
};

exports.updateUser = (req, res) => {
	res.status(200).send({ status: 'success', data: [] });
};

exports.deleteUser = (req, res) => {
	res.status(200).send({ status: 'success', data: [] });
};
