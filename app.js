const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

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

app.listen(3000, () => console.log(`Server is listening on port ${port}`));
