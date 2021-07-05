
const express = require("express");
const controllerGames = require("../controllers/gamesController");
const controllerPublisher = require("../controllers/gamepublisherController");
const ControllerReviews = require("../controllers/gameReviewsController")
const ControllerUsers = require("../controllers/usersController");


const router = express.Router();

router.route("/games")
    .get(controllerGames.GamesGetAll)
    .post(ControllerUsers.authenticate,ControllerUsers.authenticate,controllerGames.gamesAddOne);

router.route("/games/:gameId")
    .get(controllerGames.GamesGetOne)
    .patch(ControllerUsers.authenticate, controllerGames.GamesPartialUpdateOne)
    .delete(ControllerUsers.authenticate, controllerGames.GamesDeleteOne)
    .put(ControllerUsers.authenticate, controllerGames.gamesFullUpdateOne)

router.route("/games/:gameId/publishers")
    .post(ControllerUsers.authenticate, controllerPublisher.publisherAddOne)
    .get(controllerPublisher.publisherGetOne);


router.route("/games/:gameId/publishers/:publisherId")

.put(ControllerUsers.authenticate,controllerPublisher.publisherFullUpdateOne)
.delete(ControllerUsers.authenticate, controllerPublisher.publisherDeleteOne);

router.route("/games/:gameId/reviews")
.post(ControllerUsers.authenticate,ControllerReviews.ReviewAddOne)
.get(ControllerUsers.authenticate,ControllerReviews.ReviewsGetAll)
.put(ControllerUsers.authenticate,ControllerReviews.ReviewsFullUpdateAll)
.delete(ControllerUsers.authenticate,ControllerReviews.ReviewDeleteOne)


router.route("/users/register")
.post(ControllerUsers.Register);

router.route("/users/login")
.post(ControllerUsers.Login);

module.exports = router;
