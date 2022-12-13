const express = require("express");
const router = express.Router({ mergeParams: true });
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");
const Restaurant = require("../models/restaurant");
const catchAsync = require("../utils/catchAsync");
const reviews = require("../controllers/reviews");
const ExpressError = require("../utils/ExpressError");
const Review = require("../models/review");

router.post("/", validateReview, isLoggedIn, catchAsync(reviews.createReview));

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(reviews.deleteReview)
);

module.exports = router;
