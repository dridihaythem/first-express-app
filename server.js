const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

const PORT = process.env.PORT || 3000;
const DB = process.env.DATABASE_LOCAL;

mongoose.connect(DB, { useNewUrlParser: true }).then(() => console.log('DB connection successful'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
