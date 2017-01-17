/**
 * Created by yanglizhuo on 16/12/22.
 */
var express = require('express');
var router = express.Router();
// var controller = require('../DAO/Controllers/Users.model.controller');
var path = require('path');

/* GET users listing. */
router.get('/',function (req,res,next) {
    res.sendFile(path.join(__dirname,"../public/views",'mall.html'));
});

router.get('/checksession',function (req,res,next) {
    var user =req.session.user;
    // console.log(user);
    if(!user){
        res.json('empty');
    }
    else{
        res.json(user);
    }
});

module.exports = router;
