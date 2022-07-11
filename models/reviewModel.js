const mongoose = require('mongoose');
const Tour = require('./tourModel');

const reviewSchema = mongoose.Schema(
	{
		review: {
			type: String,
			required: [true, 'Review is required'],
		},
		rating: {
			type: Number,
			min: [1, 'Rating must be above 1.0'],
			max: [5, 'Rating must be below 5.0'],
			required: [true, 'Rating is required'],
		},
		createdAt: {
			type: Date,
			default: Date.now(),
		},
		tour: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Tour',
			required: [true, 'Review must belong to a tour'],
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: [true, 'Review must belong to a user'],
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	},
);

reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, function (next) {
	// this.populate({
	// 	path: 'tour',
	// 	select: 'name',
	// }).populate({
	// 	path: 'user',
	// 	select: 'name photo',
	// });
	this.populate({
		path: 'user',
		select: 'name photo',
	});
	next();
});

reviewSchema.statics.calcAverageRatings = async function (tourId) {
	// this point to the current Model
	const stats = await this.aggregate([
		{
			$match: { tour: tourId },
		},
		{
			$group: {
				_id: '$tour',
				nRatings: { $sum: 1 },
				avgRatings: { $avg: '$rating' },
			},
		},
	]);
	// console.log(stats);
	if (stats.length > 0) {
		await Tour.findByIdAndUpdate(tourId, {
			ratingsQuantity: stats[0].nRatings,
			ratingsAverage: stats[0].avgRatings,
		});
	} else {
		await Tour.findByIdAndUpdate(tourId, {
			ratingsQuantity: 0,
			ratingsAverage: 0,
		});
	}
};

// calculate stats after save new review
// post middleware doesn't have access to next
reviewSchema.post('save', function () {
	// this point to the current document
	// (this.tour == tour id)
	this.constructor.calcAverageRatings(this.tour);
});

// review is deleted or update using
// findByIdAndUpdate or findByIdAndDelete
// for these we don't have document middleware
// but only query middleware (we don't have access to the document)
// findByIdAnd is a shortcut for findOneAnd
reviewSchema.post(/^findOneAnd/, function (doc) {
	if (doc) {
		doc.constructor.calcAverageRatings(doc.tour);
	}
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
