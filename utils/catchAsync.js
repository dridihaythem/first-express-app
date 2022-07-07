module.exports = (fn) => {
	// this function should not called,
	// but instead it should sit here and wait until express calls it. (as soon as someone hits the route)
	// this is why catchAsync a function
	// exp :the catchAsync function return another function
	// which is then gonna be assigned to createTour
	// and so that function can then later be called when necessary.
	return (req, res, next) => fn(req, res, next).catch((err) => next(err));
};
