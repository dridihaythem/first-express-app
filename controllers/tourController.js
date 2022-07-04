const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.getAllTours = (req, res) => {
	res.status(200).json({
		requestAt: req.requestTime,
		status: 'success',
		results: tours.length,
		data: { tours },
	});
};

exports.createTour = (req, res) => {
	// console.log(req.body);
	const newId = tours[tours.length - 1].id + 1;
	const newTour = { id: newId, ...req.body };
	// console.log(newTour);
	tours.push(newTour);
	// we are inside of a call-back function that is gonna run in the event loop
	// so we can't never block the event loop
	// we must use writeFile and not writeFileSync
	fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
		res.status(201).send({
			status: 'success',
			data: { tour: newTour },
		});
	});
};
exports.getTour = (req, res) => {
	// console.log(req.params);
	const id = Number(req.params.id);
	const tour = tours.find((el) => el.id === id);
	if (tour) {
		res.status(200).json({
			status: 'success',
			data: { tour },
		});
	} else {
		res.status(404).json({
			status: 'fail',
			message: 'No tour found',
		});
	}
};
exports.updateTour = (req, res) => {
	const id = Number(req.params.id);
	const tour = tours.find((el) => el.id === id);
	if (tour) {
		res.status(200).json({
			status: 'success',
			data: { tour: '<updated tour here>' },
		});
	} else {
		res.status(404).json({
			status: 'fail',
			message: 'No tour found',
		});
	}
};
exports.deleteTour = (req, res) => {
	const id = Number(req.params.id);
	const tour = tours.find((el) => el.id === id);
	if (tour) {
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
	} else {
		res.status(404).json({
			status: 'fail',
			message: 'No tour found',
		});
	}
};
