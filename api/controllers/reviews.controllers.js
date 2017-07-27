var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

module.exports.getHotelAllReviews = function(req, res) {
	var hotelId = req.params.hotelId;
	console.log("GET That Hotel", hotelId);
	Hotel
		.findById(hotelId)
		.select('reviews')
		.exec(function(err, thisHotel) {
			console.log("returned Doc:", thisHotel)
			res
				.status(200)
				.json(thisHotel);
		});
};

module.exports.getThatReview = function(req, res) {
	var hotelId = req.params.hotelId;
	var reviewId = req.params.reviewId;
	console.log("GET That Hotel", hotelId);
	console.log('GET reviewId ' + reviewId + ' for hotelId ' + hotelId);
	Hotel
		.findById(hotelId)
		.select('reviews')
		.exec(function(err, thisHotel) {
			console.log("returned Doc:", thisHotel);
			var review = thisHotel.reviews.id(reviewId);
			res
				.status(200)
				.json(review);
		});
};



var _addReview = function(req, res, hotel) {
	hotel.reviews.push({
		name: req.body.name,
		rating: parseInt(req.body.rating, 10),
		review: req.body.review
	});

	hotel.save(function (err,hotelUpdated) {
		if (err) {
			res
				.status(500)
				.json(err);
		} else {
			res
				.status(201)
				.json(hotelUpdated.reviews[hotelUpdated.reviews.length - 1]);
		}
	});
};


module.exports.addAReview = function(req, res) {
	var hotelId = req.params.hotelId;
	console.log("GET That Hotel", hotelId);
	Hotel
		.findById(hotelId)
		.select('reviews')
		.exec(function(err, thisHotel) {
			var response = {
				status: 200,
				message: []
			};
			if (err) {
				console.log("Error finding hotels");
				response.status = 500;
				response.message = err;
			} else if (!thisHotel) {
				response.status = 404;
				response.message = {
					"message": "Hotel Not Found" + id
				};
			}
			if (thisHotel) {
				_addReview(req, res, thisHotel);
			} else {
				res
					.status(response.status)
					.json(response.message);
			}

		});
};

module.exports.updateThatReview = function (req,res) {
	var hotelId = req.params.hotelId;
	var reviewId = req.params.reviewId;
	console.log("GET That Hotel", hotelId);
	console.log('GET reviewId ' + reviewId + ' for hotelId ' + hotelId);
	Hotel
		.findById(hotelId)
		.select('reviews')
		.exec(function(err, thisHotel) {
			var response = {
				status: 200,
				message: {}
			};
			if (err) {
				console.log("Error finding hotels");
				response.status = 500;
				response.message = err;
			} else if (!thisHotel) {
				response.status = 404;
				response.message = {
					"message": "Hotel Not Found" + hotelId
				};
			}else{
				var review = thisHotel.reviews.id(reviewId);
				if(!review){
					res.
						response.status = 404;
						response.json = {"Message" : "Review not found" + reviewId};
				}
			}
			if(response.status !==200){
				res
					.status(response.status)
					.json(response.message);				
			}else{
				review.name =  req.body.name;
				review.rating = parseInt(req.body.rating, 10);
				review.review = req.body.review;
				thisHotel.save(function (err, hotelUpdated) {
					if (err) {
						res.status(500)
							.json(err);
					} else {
						res
							.status(204)
							.json();
					}
				});	
			}
		});
};


module.exports.deleteThatReview = function (req,res) {
	var hotelId = req.params.hotelId;
	var reviewId = req.params.reviewId;
	console.log("GET That Hotel", hotelId);
	console.log('GET reviewId ' + reviewId + ' for hotelId ' + hotelId);
	Hotel
		.findById(hotelId)
		.select('reviews')
		.exec(function(err, thisHotel) {
			var response = {
				status: 200,
				message: {}
			};
			if (err) {
				console.log("Error finding hotels");
				response.status = 500;
				response.message = err;
			} else if (!thisHotel) {
				response.status = 404;
				response.message = {
					"message": "Hotel Not Found" + hotelId
				};
			}else{
				var review = thisHotel.reviews.id(reviewId);
				if(!review){
					res.
						response.status = 404;
						response.json = {"Message" : "Review not found" + reviewId};
				}
			}
			if(response.status !==200){
				res
					.status(response.status)
					.json(response.message);				
			}else{
				console.log(thisHotel);
				thisHotel.reviews.id(reviewId).remove();
				thisHotel.save(function (err, hotelUpdated) {
					if (err) {
						res.status(500)
							.json(err);
					} else {
						res
							.status(204)
							.json(thisHotel);
					}
				});	
			}
		});
};

