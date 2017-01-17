/**
 * Created by yanglizhuo on 17/1/5.
 */

angular.module('webapp').controller('SearchController',['$window','$rootScope','routeService','$state','$scope',SearchController]);


function SearchController($window,$rootScope,routeService,$state,$scope) {

    $scope.allItems = [];


    $scope.ItemPage={};

    $scope.req = {};

    $scope.req.word = '';

    $scope.ItemPage.maxSize = 3;
    $scope.totalPageItems = 6;
    $scope.ItemPage.pagesize = 6;
    $scope.ItemPage.pagestart = 1;


    $scope.onloadItemList = function () {

        $scope.req.word = $rootScope.searchWord;

        // console.log($rootScope.searchWord);
        var url = $window.location.href.split('/');
        $scope.ItemPage.word = url[url.length-1];

        if($scope.req.word!=null && $scope.req.word!='') {
            $scope.ItemPage.word = $scope.req.word;
        }


                routeService.getSearchCount($scope.ItemPage).then(
                    function (data) {
                        // console.log(data);
                        $scope.totalPageItems = data.data;
                    },
                    function (error) {
                        console.log(error);
                    }
                );

                routeService.getSearchItem($scope.ItemPage).then(
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
    };

    $scope.onloadItemList();

    $scope.changePage = function () {

            routeService.getSearchItem($scope.ItemPage).then(
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

    };

    $scope.sendItemId = function (data) {
        $rootScope.chosenItemId = data;
    };




}