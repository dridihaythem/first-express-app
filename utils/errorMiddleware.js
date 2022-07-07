const middleware = (err, req, res, next) => {
	res.status(err.statusCode).json({
		status: err.status,
		message: err.message,
	});
	next();
};

module.exports = middleware;
