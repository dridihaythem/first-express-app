const express = require('express');
const app = express();
const userRoute = require('./routes/userRoute');

app.use('/api/v1/users', userRoute);

module.exports = app;
