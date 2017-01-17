/**
 * Created by yanglizhuo on 16/12/29.
 */

angular.module('webapp').controller('LoadItemByUser',['$window','$rootScope','routeService','$state','$scope',LoadItemByUser]);


function LoadItemByUser($window,$rootScope,routeService,$state,$scope) {


    $scope.allItemsfromUser = [];


    $scope.onloadItemListByUser = function () {


        routeService.getItemsByUser(JSON.parse(sessionStorage.user)._id).then(
            function (data) {
                // console.log(data);
                $scope.allItemsfromUser = data.data;

            },
            function (error) {
                console.log(error);
            }
        );
    };

    $scope.onloadItemListByUser();

    $scope.deleteItem = function (data) {
        $rootScope.onClickview();
        // console.log(data);
        routeService.deleteItembyId({id:data})
            .then(
                function (data) {
                    if(data.data=='success'){
                        $window.location.reload();
                    }
                },
                function (err) {
                    console.log(err)
                }
            )
    }
}