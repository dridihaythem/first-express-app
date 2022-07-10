const express = require('express');
const tourController = require('./../controllers/tourController');
const { protect, restrictTo } = require('./../controllers/authController');
// const { createReview } = require('../controllers/reviewController');
const reviewRouter = require('./reviewRoutes');
const router = express.Router();

// router.param('id', tourController.checkID);

//NB: we can the catchAsync function here
// example :
// router.route('/').get(catchAsync(tourController.getAllTours))
//.post(catchAsync(tourController.createTour));

router.route('/top-5-cheap').get(tourController.aliasTopTours, tourController.getAllTours);
router.route('/tour-stats').get(tourController.getTourStats);
router
	.route('/monthly-plan/:year')
	.get(protect, restrictTo('admin', 'lead-guide', 'guide'), tourController.getMonthlyPlan);

router
	.route('/')
	.get(tourController.getAllTours)
	.post(protect, restrictTo('admin', 'lead-guide'), tourController.createTour);
router
	.route('/:id')
	.get(tourController.getTour)
	.patch(protect, restrictTo('admin', 'lead-guide'), tourController.updateTour)
	.delete(protect, restrictTo('admin', 'lead-guide'), tourController.deleteTour);

// router.route('/:id/reviews').post(protect, restrictTo('user'), createReview);

router.use('/:id/reviews', reviewRouter);

module.exports = router;
