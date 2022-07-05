const { json } = require('express');
const Tour = require('./../models/tourModel');
const APIFeatures = require('./../utils/APIFeatures');

exports.aliasTopTours = async (req, res, next) => {
	req.query.limit = '5';
	req.query.sort = '-ratingsAverage,price';
	req.query.fields = 'name,ratingsAverage,price';
	next();
};

exports.getAllTours = async (req, res) => {
	// console.log(req.query);
	try {
		const features = new APIFeatures(Tour.find(), req.query).filter().sort().limitFields().paginate();
		const tours = await features.query; // execute query

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
