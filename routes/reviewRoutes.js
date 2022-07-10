const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');
const {
	deleteReview,
	getAllReviews,
	createReview,
	updateReview,
	setTourUserIds,
} = require('../controllers/reviewController');

const router = express.Router({ mergeParams: true });

router.route('/').get(getAllReviews).post(protect, restrictTo('user'), setTourUserIds, createReview);
router.route('/:id').delete(protect, restrictTo('admin'), deleteReview).patch(updateReview);

module.exports = router;
