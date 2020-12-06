var express = require('express');
var router = express.Router();

//her skal vi require vores controllers
var index_controller = require('../Controller/indexController');
var user_controller = require('../Controller/usersActionsController');
var matches_controller = require('../Controller/matchAndLikeController');



//User front, login and logout
router.get('/loginUser', index_controller.login_get);
router.post('/loginUser', index_controller.login_post);
router.get('/logout', index_controller.logout);
router.get('/hovedside', index_controller.hovedside_get);


//CRUD for USER

//Register form
router.get('/', user_controller.userCreate_get);
router.post('/createUserPost', user_controller.userCreate_post);


// Delete User
router.get('/deleteUser', user_controller.userDelete_get);
router.post('/deleteUser', user_controller.userDelete_post);

// Update User
router.get('/updateUser', user_controller.userUpdate_get);
router.post('/updateUser', user_controller.userUpdate_post);

//CRUD for Findmatches
router.get('/findMatches', matches_controller.show_all_get);
router.get('/findMatches', matches_controller.findmatches_get);
//router.get('/findMatches', matches_controller.findMatch_get);
//router.post('/', matches_controller); // endpoint til 
//router.get('/', matches_controller);

//CRUD for SeMatches
router.get('/matches', matches_controller.matches_get); //endpoints til at get matches

module.exports = router;