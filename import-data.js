const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const PORT = process.env.PORT || 3000;
const DB = process.env.DATABASE_LOCAL;

mongoose.connect(DB, { useNewUrlParser: true }).then((con) => console.log('connected to db'));

const User = require('./models/userModel');

const data = fs.readFileSync('./users.json');

const importData = async () => {
	try {
		await User.insertMany(JSON.parse(data));
		console.log('Data successfully loaded');
	} catch (e) {
		console.log(e);
	}
	process.exit();
};

const deleteData = async () => {
	try {
		await User.deleteMany({});
		console.log('Data successfully deleted');
	} catch (e) {
		console.log(e);
	}
	process.exit();
};

switch (process.argv[2]) {
	case '--import':
		importData();
		break;
	case '--delete':
		deleteData();
		break;
	default:
		console.log('Please provide a valid command');
		process.exit();
}
