const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'A tour must have a name'],
		unique: true,
		trim: true,
		maxlength: [40, 'A tour name must have less or equal then 40 characters'],
		minlength: [10, 'A tour name must have more or equal then 10 characters'],
	},
	rating: {
		type: Number,
		default: 4.5,
	},
	price: {
		type: Number,
		required: [true, 'A tour must have a price'],
	},
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
