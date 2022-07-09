/*
    node import-dev-data --delete
    node import-dev-data --import
*/
const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const Tour = require('.//models/tourModel');

// const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
const DB = process.env.DATABASE_LOCAL;

mongoose
	.connect(DB, {
		useNewUrlParser: true,
	})
	.then((con) => {
		// console.log(con.connections);
		console.log('DB connection successful');
	});

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/tours.json`, 'utf-8'));

const importData = async () => {
	try {
		await Tour.create(tours);
		console.log('Data successfully loaded');
	} catch (e) {
		console.log(e);
	}
	process.exit();
};

const deleteData = async () => {
	try {
		await Tour.deleteMany();
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
		console.log('invalid command');
		process.exit();
}
