const express = require('express');
const userRoutes = require('./routes/userRoute');
const AppError = require('./utils/AppError');
const errorMiddleware = require('./utils/errorMiddleware');

const app = express();

app.use(express.json());

app.use('/api/v1/users', userRoutes);

app.all('*', (req, res, next) => {
	next(new AppError('Endpoint not found', 404));
});

app.use(errorMiddleware);
module.exports = app;
