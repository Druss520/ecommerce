/**
 * Created by yanglizhuo on 16/12/28.
 */

angular.module('webapp').controller('LoadItemController',['$window','$rootScope','routeService','$state','$scope',LoadItemController]);


function LoadItemController($window,$rootScope,routeService,$state,$scope) {


    $scope.allItems = [];

    $rootScope.chosenItemId = '';

    $scope.ItemPage={};

    $scope.ItemPage.maxSize = 3;
    $scope.totalPageItems = 6;
    $scope.ItemPage.pagesize = 6;
    $scope.ItemPage.pagestart = 1;
    $scope.categoryString = "all";

    $scope.onloadItemList = function () {

        // console.log($scope.ItemPage);

        routeService.getTotalItemsCount().then(
            function (data) {
                // console.log(data);
                $scope.totalPageItems=data.data;
            },
            function (error) {
                console.log(error);
            }
        );

        routeService.getAllItem($scope.ItemPage).then(
            function (data) {
                // console.log(data);
                $scope.allItems = data.data;
                for ( var y in $scope.allItems){
                    if($scope.allItems[y].img == undefined || $scope.allItems[y].img==""){
                        $scope.allItems[y].img ="https://www.2020spaces.com/wp-content/uploads/2014/05/placeholder-640x320.png";
                    }
                }
            },
            function (error) {
                console.log(error);
            }
        );
    };

    $scope.onloadItemList();

    $scope.changePage = function () {
        if($scope.categoryString=='all') {
            routeService.getAllItem($scope.ItemPage).then(
                function (data) {
                    // console.log(data);
                    $scope.allItems = data.data;
                    for (var y in $scope.allItems) {
                        if ($scope.allItems[y].img == undefined || $scope.allItems[y].img == "") {
                            $scope.allItems[y].img = "https://www.2020spaces.com/wp-content/uploads/2014/05/placeholder-640x320.png";
                        }
                    }
                },
                function (error) {
                    console.log(error);
                }
            );
        }
        else{
            routeService.getCategoryItem($scope.ItemPage).then(
                function (data) {
                    // console.log(data);
                    $scope.allItems = data.data;
                    for (var y in $scope.allItems) {
                        if ($scope.allItems[y].img == undefined || $scope.allItems[y].img == "") {
                            $scope.allItems[y].img = "https://www.2020spaces.com/wp-content/uploads/2014/05/placeholder-640x320.png";
                        }
                    }
                },
                function (error) {
                    console.log(error);
                }
            );
        }
    };


    $scope.sendItemId = function (data) {
        $rootScope.chosenItemId = data;
    };

    $scope.hehe = function () {
        $scope.categoryString='all';
        $scope.ItemPage.pagestart=1;
        $scope.onloadItemList();
    };
    
    $scope.changeCategory = function (data) {
        $scope.categoryString = data;
        $scope.ItemPage.pagestart=1;
        $scope.ItemPage.str = data;

        routeService.getCategoryCount({str:data}).then(
            function (data) {
                $scope.totalPageItems=data.data;
            },
            function (err) {
                console.log(err);
            }
        );

        routeService.getCategoryItem($scope.ItemPage).then(
            function (data) {
                $scope.allItems = data.data;
                for ( var y in $scope.allItems){
                    if($scope.allItems[y].img == undefined || $scope.allItems[y].img==""){
                        $scope.allItems[y].img ="https://www.2020spaces.com/wp-content/uploads/2014/05/placeholder-640x320.png";
                    }
                }
            },
            function (err) {
                console.log(err);
            }
        )

    }
}