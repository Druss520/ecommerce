var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */

module.exports = function (app) {

    app.use('/',require('./mall'));
    app.use('/users',require('./users'));
    app.use('/items',require('./Items.route.Service'));
    app.use('/orders',require('./Orders.route.Service'));

};
