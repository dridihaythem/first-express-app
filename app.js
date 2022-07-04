const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3000;

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

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

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.listen(3000, () => console.log(`Server is listening on port ${port}`));
