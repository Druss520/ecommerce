/**
 * Created by yanglizhuo on 17/1/1.
 */

var mongoose = require('mongoose');
var Orders = require('../Models/Orders');
var Items = require('../Models/Items');

module.exports = {

    create:function (req,res,next) {
        var order = new Orders(req.body);

        var quant =  req.body.quantity;
        var itemId = req.body.item;
        var buyer = req.body.buyer;

        // console.log(req.body);
        Items
            .findOne({_id:itemId})
            .then(function (data) {
                // console.log(data);
                var total = data.totalNum;
                var ordered = data.orderedNum;
                // console.log(total,' ',ordered,' ',quant);
                if(total<ordered+quant){
                    res.json('overload');
                }
                else{
                    Items.update({_id:itemId},{$inc:{orderedNum:quant}}).then(
                        function (data) {
                            // console.log(data);
                        }
                    );

                    Orders.findOne({item:itemId,buyer:buyer})
                        .then(function (data) {
                            console.log(data);
                            if(data!=null){
                                Orders.update({item:itemId,buyer:buyer},{$inc:{quantity:quant}})
                                    .then(function (data) {
                                        res.json(data);
                                    })
                            }
                            else{
                                Orders.create(order).then(
                                    function (data) {
                                        res.json(data);
                                    }
                                ).catch(function (e) {
                                    console.log(e);
                                })
                            }
                        }).catch(function (err) {
                        console.log(err);
                    });

                }
            })
            .catch(function (err) {
                console.log(err);
            });

    },
    
    toCart:function (req,res,next) {
        var userId = req.query.userInfoId;
        // console.log(userId);

        Orders.find({buyer:userId,paymentStatus:false}).then(
            function (data) {
                res.json(data);
            }
        ).catch(function (e) {
            console.log(e);
        })
    },

    delete:function (req,res,next) {
        var order = req.body;
        // console.log(order);

        Items.update({_id:order.item},{$inc:{orderedNum:-order.quantity}})
            .then(
                function (data) {

                }
            );

        Orders.remove({_id:order._id})
            .then(function (data) {
                res.json('success');
            })
            .catch(function (e) {
                console.log(e);
            })
    }

};