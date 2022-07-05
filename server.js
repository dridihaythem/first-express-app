const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

const PORT = process.env.PORT || 3000;
const DB = process.env.DATABASE_LOCAL;

mongoose.connect(DB, { useNewUrlParser: true }).then((con) => console.log('connected to db'));

app.listen(PORT, () => console.log(`app is running on port ${PORT}`));
