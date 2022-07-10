const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');
const { deleteReview, getAllReviews, createReview } = require('../controllers/reviewController');

const router = express.Router({ mergeParams: true });

router.route('/').get(getAllReviews).post(protect, restrictTo('user'), createReview);
router.route('/:id').delete(protect, restrictTo('admin'), deleteReview);

module.exports = router;
