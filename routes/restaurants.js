const express = require("express");
const router = express.Router();
const restaurants = require("../controllers/restaurants");
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isAuthor, validateRestaurant } = require("../middleware");

const Restaurant = require("../models/restaurant");

router
  .route("/")
  .get(catchAsync(restaurants.index))
  .post(
    isLoggedIn,
    validateRestaurant,
    catchAsync(restaurants.createRestaurant)
  );

router.get("/new", isLoggedIn, restaurants.renderNewForm);

router
  .route("/:id")
  .get(catchAsync(restaurants.showRestaurant))
  .put(isLoggedIn, isAuthor, catchAsync(restaurants.updateRestaurant))
  .delete(isLoggedIn, isAuthor, catchAsync(restaurants.deleteRestaurant));

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(restaurants.renderEditForm)
);

module.exports = router;
