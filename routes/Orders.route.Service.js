/**
 * Created by yanglizhuo on 17/1/1.
 */

var express = require('express');
var router = express.Router();
var controller = require('../DAO/Controllers/Orders.model.controller');

router.post('/create',controller.create);

router.get('/toCart',controller.toCart);

router.post('/delete',controller.delete);

module.exports = router;