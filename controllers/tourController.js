const { json } = require('express');
const Tour = require('./../models/tourModel');

exports.getAllTours = async (req, res) => {
	// console.log(req.query);
	try {
		// const tours = await Tour.find({
		// 	duration: 5,
		// 	difficulty: 'easy',
		// });

		// const tours = await Tour.find().where('duration').equals(5).where('difficulty').equals('easy');
		// 1) filtering
		const queryObj = { ...req.query };
		const excludedFields = ['page', 'sort', 'limit', 'fields'];
		excludedFields.forEach((el) => delete queryObj[el]);

		// 2) Advanced filtering
		// change { duration: { $gte: '5' }, difficulty: 'easy', page: '5'}
		// TO { duration: { gte: '5' }, difficulty: 'easy', page: '5' }
		let queryStr = JSON.stringify(queryObj);
		queryStr = JSON.parse(queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`));

		// console.log(queryStr);

		const query = Tour.find(queryStr); // build the query
		const tours = await query; // execute query

		res.status(200).json({
			// requestAt: req.requestTime,
			status: 'success',
			results: tours.length,
			data: { tours },
		});
	} catch (e) {
		res.status(500).send({
			status: 'fail',
			message: 'error !',
		});
	}
};

exports.createTour = async (req, res) => {
	try {
		const newTour = await Tour.create(req.body);
		res.status(201).send({
			status: 'success',
			data: { tour: newTour },
		});
	} catch (e) {
		res.status(400).send({
			status: 'fail',
			message: 'invalid data sent!',
		});
	}
};
exports.getTour = async (req, res) => {
	try {
		const tour = await Tour.findById(req.params.id);
		// or
		// const tour = await Tour.findOne({ _id: req.params.id });
		res.status(200).json({
			status: 'success',
			data: { tour },
		});
	} catch (e) {
		res.status(404).send({
			status: 'fail',
			message: e,
		});
	}
};
exports.updateTour = async (req, res) => {
	try {
		const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
		res.status(200).json({
			status: 'success',
			data: { tour },
		});
	} catch (e) {
		res.status(404).json({
			status: 'fai',
			message: e,
		});
	}
};
exports.deleteTour = async (req, res) => {
	try {
		await Tour.findByIdAndDelete(req.params.id);
		res.status(204).json({
			status: 'success',
			data: null,
		});
	} catch (e) {
		res.status(404).json({
			status: 'fai',
			message: e,
		});
	}
};
