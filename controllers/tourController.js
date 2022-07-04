const fs = require('fs');
const Tour = require('./../models/tourModel');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.getAllTours = async (req, res) => {
	try {
		const tours = await Tour.find();

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
exports.deleteTour = (req, res) => {
	const id = Number(req.params.id);
	const tour = tours.find((el) => el.id === id);
	fs.writeFile(
		`${__dirname}/dev-data/data/tours-simple.json`,
		JSON.stringify(tours.filter((el) => el.id !== id)),
		(err) => {
			res.status(204).json({
				status: 'success',
				data: null,
			});
		},
	);
};
