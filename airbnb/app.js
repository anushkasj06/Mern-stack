const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError  = require('./utils/ExpressError.js');
const listing = require('./routes/listings.js');
const review = require('./routes/review.js');
 

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);


const MONGO_URL = "mongodb://127.0.0.1:27017/airbnb";

main().then(() => {
    console.log("Connected to MongoDB");
}
).catch(err => {
    console.log(err);
});


async function main(){
    await mongoose.connect(MONGO_URL);
}

app.get('/', (req, res) => {
    res.render('listings/home.ejs');  
});

app.use("/listings",listing);
app.use('/listings/:id/reviews',review);

app.all('/random', (req, res, next) => {
    next(new ExpressError(404,"page not found"));
});

app.use((err, req, res, next) => {
    let{ statusCode, message } = err;
    res.render('error.ejs', { statusCode: statusCode || 500, message: message || "Something went wrong" });
});

app.listen(8080, ()=>{
    console.log("Server is running on port 8080");
});