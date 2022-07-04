const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
	first_name: {
		type: String,
		required: [true, 'First name is required'],
	},
	last_name: {
		type: String,
		required: [true, 'Last name is required'],
	},
	email: {
		type: String,
		required: [true, 'email is required'],
		email: true,
	},
});

const User = new mongoose.model('User', userModel);

module.exports = User;
