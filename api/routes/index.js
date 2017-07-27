var express = require('express');
var router = express.Router();

var ctrlHotels = require('../controllers/hotels.controllers.js');
var ctrlReviews = require('../controllers/reviews.controllers.js');
var ctrlUsers = require('../controllers/users.controllers.js');

router
	.route('/hotels')
	.get(ctrlHotels.hotelsGetAll)
	.post(ctrlHotels.addHotel);
router
	.route('/hotels/:hotelId')
	.get(ctrlHotels.getThatHotel)
	.put(ctrlHotels.updateThatHotel)
	.delete(ctrlHotels.deleteThatHotel);

router
	.route('/hotels/:hotelId/reviews')
	.get(ctrlReviews.getHotelAllReviews)
	.post(ctrlReviews.addAReview);

router
	.route('/hotels/:hotelId/reviews/:reviewId')
	.get(ctrlReviews.getThatReview)
	.put(ctrlReviews.updateThatReview)
	.delete(ctrlReviews.deleteThatReview);

router
	.route('/users/register')
	.post(ctrlUsers.register);
router
	.route('/users/login')
	.post(ctrlUsers.login)

module.exports = router;