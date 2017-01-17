/**
 * Created by yanglizhuo on 16/12/22.
 */

angular.module('webapp').service('routeService',['$http','$q',routeService]);

function routeService($http,$q) {

    function handleRequest(method,url,data) {
        var deferred = $q.defer();
        var config = {
            method:method,
            url:url
        };
        if("POST" === method){
            config.data = data;
        }else if("GET" === method){
            config.params = data;
        }

        $http(config).then(
            function (data) {
                deferred.resolve(data);
            },
            function (err) {
                deferred.reject(err);
            }
        );

        return deferred.promise;
    }




    return{
        //user
        signup:function (data) {
            return handleRequest('POST','/users/signup',data);
        },
        checksession:function (params) {
            return handleRequest('GET','/checksession',params);
        },
        signin:function (data) {
            return handleRequest('POST','/users/signin',data);
        },
        signout:function (params) {
            return handleRequest('GET','/users/signout',params);
        },
        getUserInfo:function (id) {
            return handleRequest('GET','/users/'+id)
        },

        //item
        createItem:function (data) {
            return handleRequest('POST','/items/create',data);
        },
        getAllItem:function (params) {
            return handleRequest('GET','/items/allItem',params);
        },
        getItemsByUser:function (id) {
            return handleRequest('GET','/items/'+id);
        },
        getTotalItemsCount:function (params) {
            return handleRequest('GET','/items/count',params);
        },
        getItemDetailById:function (id) {
            return handleRequest('GET','/items/getById',id);
        },
        deleteItembyId:function (id) {
            return handleRequest('POST','/items/delete',id);
        },
        getCategoryCount:function (data) {
            return handleRequest('GET','/items/categoryCount',data);
        },
        getCategoryItem:function (data) {
            return handleRequest('GET','/items/categoryItem',data);
        },
        getSearchItem:function (word) {
            return handleRequest('GET','/items/searchItem',word);
        },
        getSearchCount:function (word) {
            return handleRequest('GET','/items/searchCount',word);
        },

        //order
        createOrder:function (data) {
            return handleRequest('POST','/orders/create',data);
        },
        deleteOrder:function (data) {
            return handleRequest('POST','/orders/delete',data);
        },

        //cart
        getOrders:function (id) {
            return handleRequest('GET','/orders/toCart',id);
        }
    }
}