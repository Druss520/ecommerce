/**
 * Created by yanglizhuo on 16/12/26.
 */

angular.module('webapp').config(

function ($stateProvider,$urlRouterProvider,$qProvider) {

    $qProvider.errorOnUnhandledRejections(false);

    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home',{
            url:'/home',
            templateUrl:"/views/defaultList.html"

        })
        .state('personal',{
            url:'/personal',
            templateUrl:'/views/userPage.html',
            controller:function ($scope,routeService,$state) {
                $scope.checkIfJump = function () {
                    routeService.checksession().then(
                        function (data) {
                            // console.log(data);
                            if(data.data=="empty"){
                                $state.go("home");
                            }
                        },
                        function (error) {
                            console.log(error);
                        }
                    )
                };

                $scope.checkIfJump();
            }
        })
        .state('itemDetail',{
            url:'/itemDetail/:itemId',
            templateUrl:'/views/itemDetail.html'
            // controller:itemDetailController
        })
        .state('homeSearch',{
            url:'/home/:searchStr',
            templateUrl:'/views/search.html'
        })
});