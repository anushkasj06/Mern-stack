const express = require('express');
const router = express.Router({ mergeParams: true }); // VERY IMPORTANT to access :id from parent route
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/ExpressError.js');
const { reviewSchema } = require('../schema.js');
const { isLoggedIn, isReviewAuthor } = require('../middleware.js');
const ReviewController = require('../controller/review.js');

// Middleware to validate review using Joi
const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join(', ');
        return next(new ExpressError(400, errorMessage));
    }
    next();
};

// POST - Create new review
router.post('/', validateReview,isLoggedIn, wrapAsync(ReviewController.createReview));

// DELETE - Remove a review
router.delete('/:reviewId',isLoggedIn,isReviewAuthor, wrapAsync(ReviewController.DestroyReview));

module.exports = router;
