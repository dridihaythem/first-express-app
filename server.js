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

// mongoose use the native javascript data types
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

const testTour = new Tour({ name: 'The forest hiker', rating: 4.7, price: 100 });

testTour
	.save()
	.then((doc) => console.log(doc))
	.catch((err) => console.log('Error :', err));

// console.log(app.get('env'));
// console.log(process.env);
app.listen(3000, () => console.log(`Server is listening on port ${port}`));
