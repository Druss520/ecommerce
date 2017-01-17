/**
 * Created by yanglizhuo on 16/12/22.
 */


angular.module('webapp').controller('routeController',['$window','$scope','routeService','$state','$rootScope','$timeout',routeController]);

function routeController($window,$scope,routeService,$state,$rootScope,$timeout) {

    $scope.options = [
        "Digital",
        "Outdoor",
        "Food"
    ];

    $scope.signupinfo={};
    $scope.loginsucc = true;
    $scope.loginuser = "";
    $scope.signininfo={};
    $scope.checkpassword={};
    $scope.searchinfo={};
    $scope.searchinfo.searchString = '';
    $rootScope.searchWord = '';


    $scope.onloadview = function () {
        routeService.checksession().then(
            function (data) {
                // console.log(data);
                if(data.data=="empty"){
                    $scope.loginsucc = true;
                }
                else{
                    sessionStorage.user = JSON.stringify(data.data);
                    // console.log(sessionStorage.user);
                   $scope.loginuser = data.data.username;
                    $scope.loginsucc = false;

                }
            },
            function (error) {
                console.log(error);
            }
        )
    };

    $scope.onloadview();

    $rootScope.onClickview = function () {
        routeService.checksession().then(
            function (data) {
                // console.log(data);
                if(data.data=="empty"){
                    $scope.loginsucc = true;
                    $(".fade").modal("hide");
                    $state.go('home');
                }
            },
            function (error) {
                console.log(error);
            }
        )
    };

    $scope.showsign = function () {
        $("#login-modal").modal("show");
    };

    var clear = function () {
        $timeout(function () {
            $scope.hehe1=null;
        },3000);
    };
    
    $scope.signup111 = function () {

        var str = $scope.signupinfo.email;
        var regemail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/ ;
        if(!regemail.test(str)){
            $scope.hehe1 = "Invalid Email Address";
            clear();
            return;
        }
        if($scope.signupinfo.username=='' || $scope.signupinfo.username==undefined){
            $scope.hehe1 = "Please enter Username";
            clear();
            return;
        }
        if($scope.signupinfo.password=='' || $scope.signupinfo.password==undefined){
            $scope.hehe1 = "Please enter password";
            clear();
            return;
        }
        if($scope.signupinfo.password.length<6 || $scope.signupinfo.password.length>14){
            $scope.hehe1 = "invalid password length";
            clear();
            return;
        }
        if($scope.signupinfo.password!=$scope.checkpassword.repassword){
            // console.log($scope.checkpassword.repassword);
            // console.log($scope.signupinfo.password);
            $scope.hehe1 = "two passwords are different";
            clear();
            return;
        }

        routeService.signup($scope.signupinfo).then(
            function (data) {
                // console.log(data);
                if(data.data=="hehe"){
                    $scope.hehe1 = "username already in use";
                    clear();
                }
                else{
                    sessionStorage.user = JSON.stringify(data.data);
                    $window.location.reload();
                }

            },
            function (error) {
                $scope.hehe1 = error;
            }
        );

    };

    $scope.signin111 = function () {

        if($scope.signininfo.username=='' || $scope.signininfo.username==undefined){
            $scope.hehe1 = "Please enter Username";
            clear();
            return;
        }
        if($scope.signininfo.password=='' || $scope.signininfo.password==undefined){
            $scope.hehe1 = "Please enter password";
            clear();
            return;
        }

        routeService.signin($scope.signininfo).then(
            function (data) {
                if(data.data=='nouser'){
                    $scope.hehe1 = "invalid username";
                    clear();
                }else if(data.data=='wrong'){
                    $scope.hehe1 = "invalid password";
                    clear();
                }else{
                    sessionStorage.user = JSON.stringify(data.data);
                    $window.location.reload();
                }
            },
            function (error) {
                $scope.hehe1 = error;
            }
        )

    };

    $scope.signout111 = function () {
        routeService.signout().then(
            function (data) {
                $window.location.href = '/';
            },
            function (error) {
                $scope.hehe1 = error;
            }
        )
    };

    $scope.checkvalidation = function () {
        $rootScope.onClickview();
    };

    $scope.startSearch = function () {
        // console.log($scope.searchinfo.searchString);
        $rootScope.searchWord = $scope.searchinfo.searchString;
        if($rootScope.searchWord !='' && $rootScope.searchWord !=null && $rootScope.searchWord!=undefined) {
            $state.go('homeSearch', {searchStr: $scope.searchinfo.searchString});
        }
    }
    
}