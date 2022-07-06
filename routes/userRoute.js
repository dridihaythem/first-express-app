const express = require('express');
const userController = require('./../controllers/userController');

const router = express.Router();

router.route('/').get(userController.getAllUsers).post(userController.createUser);
router.route('/stats/age').get(userController.statsByAge);
router.route('/stats/gender').get(userController.statsByGender);
router.route('/stats/country').get(userController.statsByCountry);
router.route('/:id').get(userController.getUser).patch(userController.updateUser).delete(userController.deleteUser);

module.exports = router;
