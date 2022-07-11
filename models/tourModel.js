const mongoose = require('mongoose');
const slugify = require('slugify');
// const validator = require('validator');
const User = require('./userModel');
const tourSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'A tour must have a name'],
			unique: true,
			trim: true,
			maxlength: [40, 'A tour name must have less or equal then 40 characters'],
			minlength: [10, 'A tour name must have more or equal then 10 characters'],
			// validate: [validator.isAlpha, 'A tour name must only contain characters'],
		},
		slug: String,
		duration: {
			type: Number,
			required: [true, 'A tour must have a duration'],
		},
		maxGroupSize: {
			type: Number,
			required: [true, 'A tour must have a group size'],
		},
		difficulty: {
			type: String,
			required: [true, 'A tour must have a difficulty'],
			enum: {
				values: ['easy', 'medium', 'difficult'],
				message: 'Difficulty is either: easy, medium or difficult',
			},
		},
		ratingsAverage: {
			type: Number,
			default: 4.5,
			min: [1, 'Rating must be above 1.0'],
			max: [5, 'Rating must be below 5.0'],
			set: (val) => Math.round(val * 10) / 10,
		},
		ratingsQuantity: {
			type: Number,
			default: 0,
		},
		price: {
			type: Number,
			required: [true, 'A tour must have a price'],
		},
		priceDiscount: {
			type: Number,
			validate: {
				validator: function (val) {
					// this only points to current doc on NEW document creation
					return val < this.price;
				},
				message: 'Discount price ({VALUE}) should be below regular price',
			},
		},
		summary: {
			type: String,
			trim: true,
			required: [true, 'A tour must have a summary'],
		},
		description: {
			type: String,
			trim: true,
		},
		imageCover: {
			type: String,
			required: [true, 'A tour must have a cover image'],
		},
		images: [String], //array of String
		createdAt: {
			type: Date,
			default: Date.now(),
			select: false, // hide sensitive data
		},
		startDates: [Date],
		secretTour: {
			type: Boolean,
			default: false,
		},
		startLocation: {
			type: {
				type: String,
				default: 'Point',
				enums: ['Point'],
			},
			coordinates: [Number],
			address: String,
			description: String,
		},
		locations: [
			{
				type: {
					type: String,
					default: 'Point',
					enums: ['Point'],
				},
				coordinates: [Number],
				address: String,
				description: String,
				day: Number,
			},
		],
		// guides: Array,
		guides: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		],
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	},
);

// tourSchema.index({ price: 1 });
tourSchema.index({ price: 1, ratingsAverage: -1 });
tourSchema.index({ slug: 1 });
tourSchema.index({ startLocation: '2dshpere' });

// virtual populate
tourSchema.virtual('reviews', { ref: 'Review', foreignField: 'tour', localField: '_id' });

// tourSchema.pre('save', async function (next) {
// 	const guidesPromises = this.guides.map(async (id) => await User.findById(id));
// 	this.guides = await Promise.all(guidesPromises);
// 	next();
// });

// run before save() and create()
tourSchema.pre('save', function (next) {
	this.slug = slugify(this.name, { tower: true });
	next();
});

tourSchema.post('save', function (doc, next) {
	// console.log(doc);
	next();
});

// modify the query
// find / findOne / findOneAndUpdate  findOneAndDelete etc ...

tourSchema.pre(/^find/, function (next) {
	this.find({ secretTour: { $ne: true } });
	next();
});

tourSchema.pre('aggregate', function (next) {
	// add begin of array
	this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
	next();
});

tourSchema.pre(/^find/, function (next) {
	this.populate({ path: 'guides', select: '-__v -passwordChangedAt' });
	next();
});

const Tour = mongoose.model('Tour', tourSchema);

tourSchema.virtual('durationWeeks').get(function () {
	return this.duration / 7;
});

module.exports = Tour;
