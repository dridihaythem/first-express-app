const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
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
app.listen(3000, () => console.log(`Server is listening on port ${port}`));
