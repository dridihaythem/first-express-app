const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, 'user must have a name'],
		minlength: [3, 'name must be at least 3 characters long'],
		maxlength: 10,
	},
	age: {
		type: Number,
		required: true,
	},
	country: {
		type: String,
	},
	hobbies: [String],
});

const User = mongoose.model('User', userSchema);
module.exports = User;
