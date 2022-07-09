const mongoose = require('mongoose');

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

reviewSchema.pre(/^find/, function (next) {
	this.populate({
		path: 'tour',
		select: 'name',
	}).populate({
		path: 'user',
		select: 'name photo',
	});
	next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
