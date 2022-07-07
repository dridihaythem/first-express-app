const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const app = express();

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// middleware
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}
console.log(process.env.NODE_ENV);

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

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
app.all('*', (req, res, next) => {
	res.status(404).json({
		status: 'fail',
		message: `Can't find ${req.originalUrl} on this server!`,
	});
});

module.exports = app;
