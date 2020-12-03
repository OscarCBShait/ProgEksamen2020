var express = require('express');
var router = express.Router();

//her skal vi require vores controllers
var index_controller = require('../Controller/indexController');
var user_controller = require('../Controller/usersActionsController');
var matches_controller = require('../Controller/matchAndLikeController');


//User front, login and logout
router.get('/', index_controller.login_get);
router.post('/', index_controller.login_post);
router.get('/', index_controller.logout);

//Register form
router.get('/', user_controller.userCreate_get);
router.post('/', user_controller.userCreate_post);

//CRUD for USER
router.get('/', user_controller.userCreate_get);
router.post('/', user_controller.userCreate_post);

// Delete User
router.get('/', user_controller.userDelete_get);
router.post('/', user_controller.userDelete_post);

// Update User
router.get('/', user_controller.userUpdate_get);
router.post('/', user_controller.userUpdate_post);

//CRUD for MATCHES
router.get('/', matches_controller);
router.post('/', matches_controller);
router.get('/', matches_controller);


module.exports = router;