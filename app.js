const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

// middleware
app.use(express.json());

// top-level code is executed only one time.
// so it will not block the event-loop
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

app.get('/api/v1/tours', (req, res) => {
	res.status(200).json({
		status: 'success',
		results: tours.length,
		data: { tours },
	});
});

app.post('/api/v1/tours', (req, res) => {
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
});

app.listen(3000, () => console.log(`Server is listening on port ${port}`));
