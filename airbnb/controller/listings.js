const { Listing, listingSchema } = require('../models/Listing.js');


module.exports.index = async (req, res) => {
    const listings = await Listing.find();
    res.render('listings/index.ejs', { listings: listings });
}


module.exports.newListing =  (req, res) => {
    res.render('listings/new.ejs');
}


module.exports.GetListingById =  async (req, res) => {
    const listing = await Listing.findById(req.params.id).populate({path:'review', populate:{path:'author'}}).populate('owner');
    if (!listing) {
        req.flash('error', 'Listing not found');
        return res.redirect('/listings');
    }
    console.log(listing);
    res.render('listings/show.ejs', { listing: listing });
}

module.exports.CreateListing = async (req, res, next) => {

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
    newlisting.owner = req.user._id;
    await newlisting.save();
    req.flash('success', 'Successfully made a new listing');
    res.redirect('/listings');
};

module.exports.EditListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash('error', 'Listing not found');
        return res.redirect('/listings');
    }
    res.render('listings/edit.ejs', { listing: listing });
}

module.exports.DoneListingEditing = async (req, res) => {
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
    req.flash('success', 'Listing updated successfully');
    res.redirect(`/listings/${listing._id}`);
};


module.exports.DeleteListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findByIdAndDelete(id);
    if (!listing) {
        return res.status(404).send("Listing not found");

    }
    req.flash('success', 'Listing deleted successfully');
    res.redirect('/listings');
};