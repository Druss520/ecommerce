/**
 * Created by yanglizhuo on 17/1/1.
 */

angular.module('webapp').controller('CartController',['$window','$rootScope','routeService','$state','$scope',CartController]);


function CartController($window,$rootScope,routeService,$state,$scope) {

    $scope.cartItems =[];
    $scope.orderList = [];
    $scope.reqhehe = {};
    $scope.reqhehe.userInfoId = '';
    $scope.shippingFee = 10.2;
    $scope.subtotal = 0;
    $scope.emptyCart = true;



    $scope.cartOnLoad = function () {

        routeService.checksession().then(
            function (data) {
                // console.log(data);
                if(data.data!="empty"){
                    $scope.loginsucc = false;

                    $scope.reqhehe.userInfoId = JSON.parse(sessionStorage.user)._id;

                    routeService.getOrders($scope.reqhehe).then(
                        function (data) {
                            // console.log(data);
                            $scope.orderList = data.data;
                            $rootScope.itemNum = $scope.orderList.length;
                            if($rootScope.itemNum!=0) {
                                // console.log($scope.orderList);
                                $scope.emptyCart=false;
                                $scope.orderList.forEach(function (elem) {
                                    routeService.getItemDetailById({id: elem.item}).then(
                                        function (data) {
                                            if (data.data.img == undefined || data.data.img == ""){
                                                data.data.img="http://placehold.it/72x72";
                                            }
                                            $scope.subtotal += elem.quantity * data.data.price;
                                            $scope.cartItems.push(data.data);
                                            // console.log($scope.cartItems);
                                        },
                                        function (err) {
                                            console.log(err)
                                        }
                                    )
                                })
                            }
                            else {
                                $scope.emptyCart=true;
                            }
                        },
                        function (e) {
                            console.log(e)
                        }
                    );

                }
            },
            function (error) {
                console.log(error);
            }
        );
    };

    $scope.cartOnLoad();

    $scope.jumpToDetail = function (data) {
        $rootScope.chosenItemId = data;
        $(".fade").modal("hide");
        $state.go('itemDetail',{itemId:data});
        $window.location.reload();
    };

    $scope.continueShopping = function () {
        $(".fade").modal('hide');
    };

    $scope.deleteOrder = function (order) {
        routeService.deleteOrder(order).then(
            function (data) {
                if(data.data=='success'){
                    $scope.cartItems =[];
                    $scope.orderList = [];
                    $scope.subtotal = 0;
                    $scope.cartOnLoad();
                    $scope.$digest();
                }
            },
            function (error) {
                console.log(error);
            }
        )
    };

    $scope.$watch('orderList',function(){
        // console.log('watch')
        $scope.subtotal = 0;
        $scope.cartItems.forEach(function (elem,index) {
            $scope.subtotal += elem.price * $scope.orderList[index].quantity;
        });
    },true);

    $scope.pay = function () {
        $("#modalCart").modal('hide');
    }

}