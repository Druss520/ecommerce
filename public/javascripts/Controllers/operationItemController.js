/**
 * Created by yanglizhuo on 16/12/29.
 */

angular.module('webapp').controller('operationItemController',['$window','$rootScope','routeService','$state','$scope',operationItemController]);


function operationItemController($window,$rootScope,routeService,$state,$scope) {

    $scope.iteminfo = {};
    $scope.iteminfo.category =[];

    var userinfo = {};


    $scope.toCreateItem = function () {

        $rootScope.onClickview();

        userinfo = JSON.parse(sessionStorage.user);
        // console.log(userinfo);

        $scope.iteminfo.orderedNum = 0;
        $scope.iteminfo.seller = userinfo._id;
        $scope.iteminfo.sellerName = userinfo.username;

        routeService.createItem($scope.iteminfo).then(
            function (data) {
                $scope.iteminfo={};
                $window.location.reload();
                // console.log(data);
            },
            function (error) {
                console.log(error);
            }
        )
    };


}