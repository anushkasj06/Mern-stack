const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./Review.js');
const Joi = require('joi');

// Mongoose Listing schema
const ListingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        filename: String,
        url: {
            type: String,
            default: "https://images.trvl-media.com/lodging/2000000/1450000/1450000/1449989/977abdf6.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill",
            set: v => v === "" ? "https://images.trvl-media.com/lodging/..." : v
        }
    },
    price: Number,
    location: String,
    country: String,
    review: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
});

// Delete associated reviews after listing deletion
ListingSchema.post("findOneAndDelete", async function (listing) {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.review } });
    }
});

const Listing = mongoose.model('Listing', ListingSchema);

// Joi schema
const listingSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().allow(''),
    url: Joi.string().allow(''),
    filename: Joi.string().allow(''),
    price: Joi.number().required(),
    location: Joi.string().required(),
    country: Joi.string().required()
});

// Export both
module.exports = { Listing, listingSchema };
