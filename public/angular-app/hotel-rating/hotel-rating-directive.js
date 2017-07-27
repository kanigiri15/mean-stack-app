/*angular.module('meanhotel').directive('hotelRating', hotelRating);

function hotelRating() {
	return {
		restrict: 'E',
		template: '<span ng-repeat="star in vm.stars track by $index" class="glyphicon glyphicon-star">{{ star }}</span>',
		bindToController : true,
		controller: 'HotelCtrl',
		controllerAs : 'vm',
		scope: {
			stars:'@'
		}
	}
}*/

angular.module('meanhotel').component('hotelRating',{
	bindings:{
		stars: '='
	},
	template: '<span ng-repeat="star in vm.stars track by $index" class="glyphicon glyphicon-star">{{ star }}</span>',
	controller: 'HotelCtrl',
	controllerAs : 'vm',
});

angular.module('meanhotel').component('reviewRating',{
	bindings:{
		stars:'='
	},
	template:'<span ng-repeat="star in review track by $index" class="glyphicon glyphicon-star">{{ star }}</span>',
	controller:'HotelCtrl',
	controllerAs:'review'
});