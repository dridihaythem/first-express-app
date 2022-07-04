const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3000;

// middleware
app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
	console.log('👋 hello from middleware');
	next();
});

app.use((req, res, next) => {
	req.requestTime = new Date().toISOString();
	next();
});

// top-level code is executed only one time.
// so it will not block the event-loop
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

// Actions
const getAllTours = (req, res) => {
	res.status(200).json({
		requestAt: req.requestTime,
		status: 'success',
		results: tours.length,
		data: { tours },
	});
};

const createTour = (req, res) => {
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
const getTour = (req, res) => {
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
const updateTour = (req, res) => {
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
const deleteTour = (req, res) => {
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

const getAllUsers = (req, res) => {
	res.status(500).json({
		status: 'error',
		message: 'this route is not yet defined!',
	});
};
const createUser = (req, res) => {
	res.status(500).json({
		status: 'error',
		message: 'this route is not yet defined!',
	});
};
const getUser = (req, res) => {
	res.status(500).json({
		status: 'error',
		message: 'this route is not yet defined!',
	});
};
const updateUser = (req, res) => {
	res.status(500).json({
		status: 'error',
		message: 'this route is not yet defined!',
	});
};
const deleteUser = (req, res) => {
	res.status(500).json({
		status: 'error',
		message: 'this route is not yet defined!',
	});
};

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
//  if you want to make a param optional you can add "?"
//  example : /api/v1/tours/:id/:user?
// app.get('/api/v1/tours/:id', getTour);

// put = except that we receive the entire new updated object
// patch = except that we receive only properties that should be updated
// app.patch('/api/v1/tours/:id', updateTour);
//app.delete('/api/v1/tours/:id', deleteTour);

app.route('/api/v1/tours').get(getAllTours).post(createTour);
app.route('/api/v1/tours/:id').get(getTour).patch(deleteTour).delete(deleteTour);

app.route('/api/v1/users').get(getAllUsers).post(createUser);
app.route('/api/v1/users/:id').get(getUser).patch(updateUser).delete(deleteUser);

app.listen(3000, () => console.log(`Server is listening on port ${port}`));
