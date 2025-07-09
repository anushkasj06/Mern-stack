const { Listing } = require('../models/Listing.js');
const Review = require('../models/Review.js');


module.exports.createReview = async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        throw new ExpressError(404, "Listing not found");
    }

    const newReview = new Review(req.body.review);
    newReview.author = req.user._id; // Set the author of the review
    listing.review.push(newReview); // Add review reference to listing
    await newReview.save();
    await listing.save();
    req.flash('success', 'Review added!');

    res.redirect(`/listings/${listing._id}`);
}


module.exports.DestroyReview = async (req, res) => {
    const { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { review: reviewId } }); // Remove from listing
    await Review.findByIdAndDelete(reviewId); // Delete review
    req.flash('success', 'Review deleted!');
    res.redirect(`/listings/${id}`);
};