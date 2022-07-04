const dotenv = require('dotenv');
dotenv.config({path : './config.env'})
const app = require('./app');

const port = process.env.PORT || 3000;

// console.log(app.get('env'));
// console.log(process.env);
app.listen(3000, () => console.log(`Server is listening on port ${port}`));