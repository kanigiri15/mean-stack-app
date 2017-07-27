angular.module('meanhotel')
.controller('HotelCtrl',HotelCtrl);

function HotelCtrl(hotelDataFactory, $routeParams, $route) {
	var vm = this;
	var id = $routeParams.id;
	hotelDataFactory.hotelDisplay(id).then(function (response) {
		console.log(response);
		vm.hotel = response.data;
		vm.stars = _getStarRating(response.data.stars);
	});

	function _getStarRating(stars) {
		return new Array(stars);
	}

	vm.addReview = function () {
		var postData = {
			name: vm.name,
			rating: vm.rating,
			review:vm.review
		};
		if (vm.reviewForm.$valid) {
			hotelDataFactory.postReview(id, postData).then(function (response) {
				if (response.status === 201){
					console.log(response.status);
					$route.reload();
				}
			}).catch(function (error) {
				console.log(error);
			});
		} else {
			vm.isSubmitted = true;
		}
	}

	vm.dReview = function (reviewId) {
		hotelDataFactory.deleteAReview(id, reviewId).then(function (response) {
			if(response.status  === 204	){
				$route.reload();
			}
		}).catch(function (error) {
			console.log(error);
		});
	}
}