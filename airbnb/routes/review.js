const express = require('express');
const router = express.Router({ mergeParams: true }); // VERY IMPORTANT to access :id from parent route
const { Listing } = require('../models/Listing.js');
const Review = require('../models/Review.js');
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/ExpressError.js');
const { reviewSchema } = require('../schema.js');

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
router.post('/', validateReview, wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        throw new ExpressError(404, "Listing not found");
    }

    const newReview = new Review(req.body.review);
    listing.review.push(newReview); // Add review reference to listing
    await newReview.save();
    await listing.save();

    res.redirect(`/listings/${listing._id}`);
}));

// DELETE - Remove a review
router.delete('/:reviewId', wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { review: reviewId } }); // Remove from listing
    await Review.findByIdAndDelete(reviewId); // Delete review

    res.redirect(`/listings/${id}`);
}));

module.exports = router;
