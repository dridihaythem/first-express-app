const AppError = require('./../utils/AppError');

const sendErrorDev = (err, res) => {
	res.status(err.statusCode).json({
		status: err.status,
		message: err.message,
		error: err,
		stack: err.stack,
	});
};

const sendErrorProd = (err, res) => {
	if (err.isOperational) {
		res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
		});
	} else {
		console.error('ERROR 💥', err);

		res.status(500).json({
			status: 'error',
			message: 'Something went very wrong !',
		});
	}
};

const handleCastErrorDB = (err) => {
	const message = `Invalid ${err.path}: ${err.value}`;
	return new AppError(message, 404);
};

module.exports = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error';

	if (process.env.NODE_ENV === 'development') {
		sendErrorDev(err, res);
	} else {
		let newError = { ...err };
		if (err.name == 'CastError') {
			newError = handleCastErrorDB(newError);
		}
		sendErrorProd(newError, res);
	}
};
