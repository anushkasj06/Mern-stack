const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/ExpressError.js');
const {listingSchema } = require('../models/Listing.js');
const {isLoggedIn, isOwner} = require('../middleware.js');
const ListingController = require('../controller/listings.js');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


const validateListing = (req, res, next) => {
    let {error} = listingSchema.validate(req.body);
    if (error) {
        let errorMessage = error.details.map(detail => detail.message).join(', ');
        return next(new ExpressError(400, errorMessage));
    }
    next();
}

router.route('/')
.get(wrapAsync(ListingController.index))
// .post(isLoggedIn, validateListing, wrapAsync(ListingController.CreateListing));
.post(isLoggedIn, upload.single('image'),(req, res)=>{
    console.log(req.body);
    res.send(req.file);
})

router.get("/new",isLoggedIn,ListingController.newListing);

router.route("/:id")
.get(wrapAsync(ListingController.GetListingById))
.put(isLoggedIn,isOwner, validateListing, wrapAsync(ListingController.DoneListingEditing))
.delete(isLoggedIn,isOwner, wrapAsync( ListingController.DeleteListing))

router.get('/:id/edit',isLoggedIn,isOwner, wrapAsync( ListingController.EditListing));



module.exports = router;