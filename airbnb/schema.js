const Joi = require('joi');

const listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.object({
            filename: Joi.string().required(),
            url: Joi.string().uri().required()
        }).required(),
        price: Joi.number().min(0).required(),
        location: Joi.string().required(),
        country: Joi.string().required()
    }).required()
});

const reviewSchema = Joi.object({
    review: Joi.object({
        comment: Joi.string().required(),
        rating: Joi.number().min(1).max(5).required()
    }).required()
});

module.exports = { listingSchema, reviewSchema };