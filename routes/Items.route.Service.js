/**
 * Created by yanglizhuo on 16/12/27.
 */

var express = require('express');
var router = express.Router();
var controller = require('../DAO/Controllers/Items.model.controller');

router.post('/create',controller.createItem);

router.get('/allItem',controller.getAllItem);

router.get('/count',controller.getTotalCount);

router.get('/getById',controller.getById);

router.post('/delete',controller.deleteById);

router.get('/categoryCount',controller.categoryCount);

router.get('/categoryItem',controller.categoryItem);

router.get('/searchItem',controller.searchItem);

router.get('/searchCount',controller.searchCount);




router.param('Uid',controller.getItemsByUser);

router.get('/:Uid',controller.get);

module.exports = router;