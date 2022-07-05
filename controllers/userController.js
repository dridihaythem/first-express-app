const User = require('./../models/userModel');
const APIFeatures = require('./../utils/APIFeatures');

exports.getAllUsers = async (req, res) => {
	try {
		const features = new APIFeatures(User.find(), req.query).filter().limitfields().sort().paginate();
		const users = await features.query;
		res.status(200).send({ status: 'success', results: users.length, data: { users } });
	} catch (e) {
		res.status(500).send({ status: 'fail', message: e.message });
	}
};

exports.getUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		res.status(200).send({ status: 'success', data: { user } });
	} catch (e) {
		res.status(500).send({ status: 'fail', message: e.message });
	}
};

exports.createUser = async (req, res) => {
	try {
		const user = await User.create(req.body);
		res.status(201).send({ status: 'success', data: { user: user } });
	} catch (e) {
		res.status(500).send({ status: 'fail', message: e.message });
	}
};

exports.updateUser = async (req, res) => {
	try {
		const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
		res.status(200).send({ status: 'success', data: { user } });
	} catch (e) {
		res.status(404).send({ status: 'fail', message: e.message });
	}
};

exports.deleteUser = async (req, res) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id);
		res.status(200).send({ status: 'success', data: null });
	} catch (e) {
		res.status(500).send({ status: 'fail', message: e.message });
	}
};
