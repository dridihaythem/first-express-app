const { json } = require('express');
const Tour = require('./../models/tourModel');
const APIFeatures = require('./../utils/APIFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');
const { deleteOne, updateOne, createOne, getOne } = require('./handlerfactory');

exports.aliasTopTours = async (req, res, next) => {
	req.query.limit = '5';
	req.query.sort = '-ratingsAverage,price';
	req.query.fields = 'name,ratingsAverage,price';
	next();
};

exports.getAllTours = catchAsync(async (req, res, next) => {
	// console.log(req.query);
	const features = new APIFeatures(Tour.find(), req.query).filter().sort().limitFields().paginate();
	const tours = await features.query; // execute query

	res.status(200).json({
		// requestAt: req.requestTime,
		status: 'success',
		results: tours.length,
		data: { tours },
	});
});

exports.createTour = createOne(Tour);

exports.getTour = getOne(Tour, { path: 'reviews' });

exports.updateTour = updateOne(Tour);

exports.deleteTour = deleteOne(Tour);

exports.getTourStats = catchAsync(async (req, res, next) => {
	const stats = await Tour.aggregate([
		{ $match: { ratingsAverage: { $gte: 4.5 } } },
		{
			$group: {
				_id: { $toUpper: '$difficulty' },
				numTours: { $sum: 1 },
				numRatings: { $sum: '$ratingsQuantity' },
				avgRating: { $avg: '$ratingsAverage' },
				avgPrice: { $avg: '$price' },
				minprice: { $min: '$price' },
				maxprice: { $max: '$price' },
			},
		},
		{
			$sort: { avgPrice: 1 },
		},
		// {
		// 	$match: { _id: { $ne: 'EASY' } },
		// },
	]);

	res.status(200).json({
		status: 'success',
		data: { stats },
	});
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
	const year = Number(req.params.year);
	const stats = await Tour.aggregate([
		{
			$unwind: '$startDates',
		},
		{
			$match: {
				startDates: {
					$gte: new Date(`${year}-01-01`),
					$lte: new Date(`${year}-12-31`),
				},
			},
		},
		{
			$group: {
				_id: { $month: '$startDates' },
				numTours: { $sum: 1 },
				tours: { $push: '$name' },
			},
		},
		{
			$addFields: { month: '$_id' },
		},
		{
			$project: {
				_id: 0,
			},
		},
		{
			$sort: { month: 1 },
		},
	]);

	res.status(200).json({
		status: 'success',
		data: { stats },
	});
});
