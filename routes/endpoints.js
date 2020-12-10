//Vi anvender express-pakken fra NPM
var express = require('express');
var router = express.Router();


/* 
Requests for user // (login, log ud samt hovedside)
*/


// her require vi vores controller for indexController
var indexController = require('../Controller/indexController');

//Her ses det, at vi arbejder med login
// vi laver en get request for at tilgå login siden
// vi laver en post request så det er muligt at logge ind
// vores logout sikrer, at vi kan logge ud
router.get('/loginUser', indexController.login_get);
router.post('/loginUser', indexController.login_post);
router.get('/logout', indexController.logout);

// denne route gør, at når vi rammer stien '/hovedside' viderestilles vi til hovedsiden for brugeren
router.get('/hovedside', indexController.hovedside_get);




/* 
Requests for user // (opret user, delete user og opdater user)
*/

// her require vi vores controller for usersActionsController
var userController = require('../Controller/usersActionsController');


// her sørger vi for, at når vi rammer stien '/' skal vi tilgå vores "startside"
// vores post request sørger for, at vi kan oprette en bruger
router.get('/', userController.userCreate_get);
router.post('/createUserPost', userController.userCreate_post);

// Delete User requests
// get sørger for, at vi kan tilgå siden
// post sørger for, at vi kan slette vores bruger
router.get('/deleteUser', userController.userDelete_get);
router.post('/deleteUser', userController.userDelete_post);

// Update User requests = både en get og post
// get sørger for, at vi kan tilgå siden
// post sørger for, at vi kan uploade ændringer til databasen
router.get('/updateUser', userController.userUpdate_get);
router.post('/updateUser', userController.userUpdate_post);


/* 
Requests for matches
*/


//her require vi vores controller for matchAndLikeController
var matchController = require('../Controller/matchAndLikeController');


//CRUD oprettet for findmatches.ejs = her ses det, at vi har en request, der tilgår side
//Vi har ligeledes en request, der laver like-funktion i form af makematch
//Til sidst har vi deletematch-funktionen
router.get('/findMatches', matchController.findmatches_get);
router.get('/makematch/:id/:name', matchController.makematch);
router.get('/removematch/:id/:name', matchController.removematch);

module.exports = router;