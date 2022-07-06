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

exports.statsByAge = async (req, res) => {
	try {
		const stats = await User.aggregate([
			{
				$group: {
					_id: '$age',
					users: { $sum: 1 },
				},
			},
			{
				$addFields: { age: '$_id' },
			},
			{
				$sort: { _id: 1 },
			},
			{
				$project: {
					_id: 0,
				},
			},
		]);

		res.status(200).send({ status: 'success', stats });
	} catch (e) {
		res.status(500).send({ status: 'fail', message: e.message });
	}
};

exports.statsByGender = async (req, res) => {
	try {
		const stats = await User.aggregate([
			{
				$group: {
					_id: { $toUpper: '$gender' },
					users: { $sum: 1 },
					avgAge: { $avg: '$age' },
					minAge: { $min: '$age' },
					maxAge: { $max: '$age' },
				},
			},
			{
				$match: { _id: { $in: ['MALE', 'FEMALE'] } },
			},
			{
				$addFields: { gender: '$_id' },
			},
			{
				$project: {
					_id: 0,
				},
			},
		]);

		res.status(200).send({ status: 'success', stats });
	} catch (e) {
		res.status(500).send({ status: 'fail', message: e.message });
	}
};

exports.statsByCountry = async (req, res) => {
	try {
		const stats = await User.aggregate([
			{
				$group: {
					_id: { $toUpper: '$country' },
					users: { $sum: 1 },
				},
			},
			{
				$addFields: { country: '$_id' },
			},
			{
				$project: {
					_id: 0,
				},
			},
		]);

		res.status(200).send({ status: 'success', stats });
	} catch (e) {
		res.status(500).send({ status: 'fail', message: e.message });
	}
};
