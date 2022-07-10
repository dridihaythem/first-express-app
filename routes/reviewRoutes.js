const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');
const { deleteReview, getAllReviews, createReview, updateReview } = require('../controllers/reviewController');

const router = express.Router({ mergeParams: true });

router.route('/').get(getAllReviews).post(protect, restrictTo('user'), createReview);
router.route('/:id').delete(protect, restrictTo('admin'), deleteReview).patch(updateReview);

module.exports = router;
