const Review = require('./../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
const { deleteOne, updateOne, createOne } = require('./handlerfactory');

exports.setTourUserIds = (req, res, next) => {
	if (!req.body.tour) req.body.tour = req.params.id;
	next();
};
exports.createReview = createOne(Review);

exports.getAllReviews = catchAsync(async (req, res, next) => {
	let filter = {};
	if (req.params.id) filter = { tour: req.params.id };

	const reviews = await Review.find(filter);
	res.status(200).json({
		status: 'success',
		results: reviews.length,
		data: { reviews },
	});
});

exports.updateReview = updateOne(Review);
exports.deleteReview = deleteOne(Review);
