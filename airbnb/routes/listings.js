const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/ExpressError.js');
const { Listing, listingSchema } = require('../models/Listing.js');




const validateListing = (req, res, next) => {
    let {error} = listingSchema.validate(req.body);
    if (error) {
        let errorMessage = error.details.map(detail => detail.message).join(', ');
        return next(new ExpressError(400, errorMessage));
    }
    next();
}

router.get('/',wrapAsync( async (req, res) => {
    const listings = await Listing.find();
    res.render('listings/index.ejs', { listings: listings });
}));

router.get("/new", (req, res) => {
    res.render('listings/new.ejs');

});

router.get('/:id',wrapAsync( async (req, res) => {
    const listing = await Listing.findById(req.params.id).populate('review');
    if (!listing) {
        return res.status(404).send("Listing not found");
    }
    res.render('listings/show.ejs', { listing: listing });
}));

router.post('/', validateListing, wrapAsync(async (req, res, next) => {

    const { title, description,url,filename, price, location, country } = req.body;
    const newlisting = new Listing({
        title,
        description,
        image: {
            filename,
            url: url || "https://images.trvl-media.com/lodging/2000000/1450000/1450000/1449989/977abdf6.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill"
        },
        price,
        location,
        country
    });
    await newlisting.save();
    res.redirect('/listings');
}));



router.get('/:id/edit',wrapAsync( async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        return res.status(404).send("Listing not found");
    }
    res.render('listings/edit.ejs', { listing: listing });
}));

router.put('/:id', validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    const { title, description, url, filename, price, location, country } = req.body;
    
    const listing = await Listing.findByIdAndUpdate(id, {
        title,
        description,
        image: {
            filename,
            url: url || "https://images.trvl-media.com/lodging/2000000/1450000/1450000/1449989/977abdf6.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill"
        },
        price,
        location,
        country
    }, { new: true });
    if (!listing) {
        return res.status(404).send("Listing not found");
    }
    res.redirect(`/listings/${listing._id}`);
}));


router.delete('/:id',wrapAsync( async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findByIdAndDelete(id);
    if (!listing) {
        return res.status(404).send("Listing not found");

    }

    res.redirect('/listings');
}));


module.exports = router;