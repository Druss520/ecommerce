/**
 * Created by yanglizhuo on 16/12/31.
 */

angular.module('webapp').controller('itemDetailController',['$window','$rootScope','routeService','$state','$scope',itemDetailController]);


function itemDetailController($window,$rootScope,routeService,$state,$scope) {


    $scope.itemDetails = {};
    $scope.req = {};

    $scope.numLeft= 0;

    $scope.createNewOrder={};
    $scope.createNewOrder.quantity=1;

    $scope.onload = function () {
        var url = $window.location.href.split('/');
        $scope.req.id = url[url.length-1];
        // console.log(id);

        if($scope.req.id.length ==24) {
            routeService.getItemDetailById($scope.req).then(
                function (data) {
                    // console.log(data);
                    $scope.itemDetails = data.data;
                    if($scope.itemDetails.img == undefined || $scope.itemDetails.img==""){
                        $scope.itemDetails.img ="http://placehold.it/320x320";
                        // http://placehold.it/320x320
                    }
                    if($scope.itemDetails.totalNum==undefined){
                        $scope.itemDetails.totalNum=0;
                    }
                    if($scope.itemDetails.orderedNum==undefined){
                        $scope.itemDetails.orderedNum=0;
                    }
                    $scope.numLeft=$scope.itemDetails.totalNum-$scope.itemDetails.orderedNum;
                },
                function (error) {
                    console.log(error);
                }
            )
        }
        else{
            $scope.req.id = $rootScope.chosenItemId;
            routeService.getItemDetailById($scope.req).then(
                function (data) {
                    // console.log(data);
                    $scope.itemDetails = data.data;
                    if($scope.itemDetails.img == undefined || $scope.itemDetails.img==""){
                        $scope.itemDetails.img ="http://placehold.it/320x320";
                    }
                    if($scope.itemDetails.totalNum==undefined){
                        $scope.itemDetails.totalNum=0;
                    }
                    if($scope.itemDetails.orderedNum==undefined){
                        $scope.itemDetails.orderedNum=0;
                    }
                    $scope.numLeft=$scope.itemDetails.totalNum-$scope.itemDetails.orderedNum;
                },
                function (error) {
                    console.log(error);
                }
            )
        }

        // console.log($scope.loginsucc);

    };

    $scope.onload();

    $scope.addToCart = function () {

        if($scope.loginsucc==true){
            $("#login-modal").modal("show");
        }
        else{
            // console.log($scope.createNewOrder.quantity);
            if($scope.createNewOrder.quantity!=null ) {
                $scope.createNewOrder.paymentStatus = false;
                $scope.createNewOrder.buyer = JSON.parse(sessionStorage.user)._id;
                $scope.createNewOrder.item = $scope.itemDetails._id;

                // console.log($scope.createNewOrder);

                routeService.createOrder($scope.createNewOrder)
                    .then(
                        function (data) {
                            // console.log(data);
                            if(data.data=='overload'){
                                $('.alert-danger').toggleClass('hidden',false);
                            }
                            else {
                                $window.location.reload();
                            }
                        },
                        function (error) {
                            console.log(error)
                        }
                    )
            }
        }
    }



}