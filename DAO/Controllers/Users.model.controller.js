/**
 * Created by yanglizhuo on 16/12/20.
 */

var mongoose = require('mongoose');
var Users = require('../Models/Users');
var sha1 = require('sha1');

module.exports = {
    create:function (req,res,next) {
        // console.log(req.body);
        // req.body.password = sha1(req.body.password);
        var user = new Users(req.body);
        Users.create(user).then(function (data) {
            delete data.password;
            req.session.user = data;
            res.json(data);
        }).catch(function (e) {
            if(e.message.match("E11000 duplicate key")){
                res.json("hehe");
            }
        })

    },
    
    signin:function (req,res,next) {
        var name = req.body.username;
        var password = req.body.password;
        Users.findOne({username:name}).then(
            function (data) {
                // console.log(data);
                if(!data){
                    res.json("nouser")
                }
                else if(password!= data.password){
                    res.json('wrong')
                }else{
                    data.password="";
                    // console.log(data);
                    req.session.user = data;
                    res.json(data);
                }
            }
        ).catch(next);
    },
    
    signout:function (req,res,next) {
        req.session.user =null;
        res.json('logoutsuccess');
    },

    getUserById:function (req,res,next,id) {

        Users.findOne({_id:id}).then(
            function (data) {
                req.usergot = data;
                return next();
            }
        ).catch(next);
    },

    getUser:function (req,res,next) {
        res.json(req.usergot);
    }
};