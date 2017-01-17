/**
 * Created by yanglizhuo on 16/12/27.
 */

var mongoose = require('mongoose');
var Items = require('../Models/Items');

module.exports = {

    createItem:function (req,res,next) {
        var items = new Items(req.body);
        Items.create(items).then(function (data) {
            res.json(data);
        })
            .catch(function (e) {
                console.log(e);
            })
    },

    getAllItem:function (req,res,next) {
        // console.log(req.query);
        var pagesize = parseInt(req.query.pagesize);
        var pagestart = parseInt(req.query.pagestart);

        Items
            .find()
            .skip((pagestart-1)*pagesize)
            .limit(pagesize)
            .then(function (data) {
            res.json(data);
        }).catch(function (e) {
            console.log(e);
        })
    },

    getItemsByUser:function (req,res,next,id) {
        if(!id){
            return next(new Error("id not found"));
        }

        Items
            .find({seller:id})
            .then(function (data) {
                req.hehe = data;
                return next();
            })
            .catch(function (e) {
                console.log(e);
            })
    },

    get:function (req,res,next) {
        // console.log('here')
        // console.log(req.params['Uid'])
        res.json(req.hehe);
    },

    getTotalCount:function (req,res,next) {
        Items
            .count({},function (error,cnt) {
                if(error){
                    console.log(error);
                }
                res.json(cnt);
            })
    },

    getById:function (req,res,next) {
        var id = req.query.id;
        // console.log(id);
        Items
            .findOne({_id:id})
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                console.log(e);
            })
    },
    
    deleteById:function (req,res,next) {
        var id = req.body.id;
        Items
            .remove({_id:id})
            .then(function (data) {
                res.json("success");
            })
            .catch(function (e) {
                console.log(e);
            })
    },
    
    categoryCount:function (req,res,next) {
        var cat = req.query.str;
        Items
            .count({category:{$in:[cat]}},function (error,cnt) {
                if(error){
                    console.log(error);
                }
                res.json(cnt);
            })

    },

    categoryItem:function (req,res,next) {
        var cat = req.query.str;
        var pagesize = parseInt(req.query.pagesize);
        var pagestart = parseInt(req.query.pagestart);

        Items
            .find({category:{$in:[cat]}})
            .skip((pagestart-1)*pagesize)
            .limit(pagesize)
            .then(function (data) {
                res.json(data);
            }).catch(function (e) {
            console.log(e);
        })

    },

    searchCount:function (req,res,next) {
        var word = req.query.word;
        Items
            .count({$or:[{itemname:{$regex:word,$options:'i'}},{sellerName:{$regex:word,$options:'i'}},{description:{$regex:word,$options:'i'}},{category:{$regex:word,$options:'i'}}]},function (error,cnt) {
                if(error){
                    console.log(error)
                }
                res.json(cnt);
            })
    },

    searchItem:function (req,res,next) {
        var word = req.query.word;
        var pagesize = parseInt(req.query.pagesize);
        var pagestart = parseInt(req.query.pagestart);

        Items
            .find({$or:[{itemname:{$regex:word,$options:'i'}},{sellerName:{$regex:word,$options:'i'}},{description:{$regex:word,$options:'i'}},{category:{$regex:word,$options:'i'}}]})
            .skip((pagestart-1)*pagesize)
            .limit(pagesize)
            .then(function (data) {
                res.json(data);
            }).catch(function (e) {
            console.log(e);
        })
    }
};