angular.module('meanhotel')
	.controller('HotelsCtrl',HotelsCtrl);

function HotelsCtrl(hotelDataFactory) {
	var vm = this;
	vm.title = 'Mean Hotel App :)';
	hotelDataFactory.hotelList().then(function (response) {
		console.log(response.data);
		vm.hotels = response.data;
	});
}