const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controllers/errorController');
const app = express();

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

app.use(helmet());

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}
console.log(process.env.NODE_ENV);

app.use(express.json({ limit: '10kb' }));

//Data Sanitization against NoSQL query injection
app.use(mongoSanitize());
//Data Sanitization against XSS
app.use(xss());

//Preventing Parameter Pollution
app.use(hpp());

app.use(express.static(`${__dirname}/public`));

const limiter = rateLimit({
	max: 100,
	windowMs: 60 * 60 * 1000,
	message: 'Too many requests from this IP, please try again in an hour!',
});

app.use('/api', limiter);

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
	next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404)); // skip all others middlewares in the stack
});

app.use(globalErrorHandler);

module.exports = app;
