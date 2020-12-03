var express = require('express');
var router = express.Router();

//her skal vi require vores controllers
var index_controller = require('../Controller/indexController');
var user_controller = require('../Controller/usersActionsController');
//var matches_controller = require('../Controller/matchAndLikeController');


//User front, login and logout
router.get('/', user_controller.userCreate_get);
router.post('/loginUser', index_controller.login_post);
router.get('/logout', index_controller.logout);

//Register form
router.get('/createUserPost', user_controller.userCreate_get);
router.post('/createUserPost', user_controller.userCreate_post);

//CRUD for USER
/*router.get('/', user_controller.userCreate_get);
router.post('/', user_controller.userCreate_post);*/

// Delete User
router.get('/deleteUser', user_controller.userDelete_get);
router.post('/deleteUser', user_controller.userDelete_post);

// Update User
router.get('/updateUser', user_controller.userUpdate_get);
router.post('/updateUser', user_controller.userUpdate_post);

/*//CRUD for MATCHES
router.get('/', matches_controller);
router.post('/', matches_controller);
router.get('/', matches_controller);
*/

module.exports = router;