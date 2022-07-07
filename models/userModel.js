const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, 'user must have a name'],
		minlength: [3, 'name must be at least 3 characters long'],
		maxlength: 30,
	},
	age: {
		type: Number,
		required: true,
	},
	gender: {
		type: String,
		required: true,
	},
	country: {
		type: String,
		required: true,
	},
	hobbies: [String],
});

const User = mongoose.model('User', userSchema);
module.exports = User;