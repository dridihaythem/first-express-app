const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

process.on('uncaughtException', (err, origin) => {
	console.log('UNCAUGHT EXCEPTION 💥');
	console.log(err.name);
	console.log(err.message);
	console.log(err.stack);
	process.exit(1);
});

const app = require('./app');

const port = process.env.PORT || 3000;

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

// console.log(app.get('env'));
// console.log(process.env);
const server = app.listen(3000, () => console.log(`Server is listening on port ${port}`));

process.on('unhandledRejection', (err) => {
	console.log('UNHANDLED REJECTION 💥', err.stack);
	server.close(() => process.exit(1));
});
