const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'A tour must have a name'],
			unique: true,
			trim: true,
			maxlength: [40, 'A tour name must have less or equal then 40 characters'],
			minlength: [10, 'A tour name must have more or equal then 10 characters'],
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
		},
		ratingsAverage: {
			type: Number,
			default: 4.5,
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
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	},
);

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

const Tour = mongoose.model('Tour', tourSchema);

tourSchema.virtual('durationWeeks').get(function () {
	return this.duration / 7;
});

module.exports = Tour;