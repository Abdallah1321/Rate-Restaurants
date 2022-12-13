const { restaurantSchema, reviewSchema } = require("./schemas.js");
const ExpressError = require("./utils/ExpressError");
const Restaurant = require("./models/restaurant");
const Review = require("./models/review.js");

module.exports.isLoggedIn = (req, res, next) => {
  console.log("REQ.USER...", req.user);
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "you must be signed in first!");
    return res.redirect("/login");
  }
  next();
};

module.exports.validateRestaurant = (req, res, next) => {
  const { error } = restaurantSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const restaurant = await Restaurant.findById(id);
  if (!restaurant.author.equals(req.user._id)) {
    req.flash("error", "You do not have permission");
    return res.redirect(`/restaurants/${id}`);
  }
  next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review.author.equals(req.user._id)) {
    req.flash("error", "You do not have permission");
    return res.redirect(`/restaurants/${id}`);
  }
  next();
};

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
