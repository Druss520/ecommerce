var express = require('express');
var router = express.Router();
var controller = require('../DAO/Controllers/Users.model.controller');

/* GET users listing. */
router.post('/signup', controller.create);

router.post('/signin',controller.signin);

router.get('/signout',controller.signout);

router.get('/:Uid',controller.getUserById);

router.param('Uid',controller.getUser);

module.exports = router;
