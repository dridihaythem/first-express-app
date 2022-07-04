const fs = require('fs');
const Tour = require('./../models/tourModel');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.getAllTours = (req, res) => {
	res.status(200).json({
		requestAt: req.requestTime,
		status: 'success',
		results: tours.length,
		data: { tours },
	});
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
exports.getTour = (req, res) => {
	// console.log(req.params);
	const id = Number(req.params.id);
	const tour = tours.find((el) => el.id === id);
	res.status(200).json({
		status: 'success',
		data: { tour },
	});
};
exports.updateTour = (req, res) => {
	const id = Number(req.params.id);
	const tour = tours.find((el) => el.id === id);
	res.status(200).json({
		status: 'success',
		data: { tour: '<updated tour here>' },
	});
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
