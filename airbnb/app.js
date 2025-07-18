const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError  = require('./utils/ExpressError.js');
const listingRouter = require('./routes/listings.js');
const reviewRouter = require('./routes/review.js');
const userRouter = require('./routes/user.js');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);


const sessionOption = {
    secret:"mysupersecretcode",
    resave:false,
    saveUninitialized:true,
    cookie:{
        httpOnly:true,
        expires:Date.now() + 7*24*60*60*1000,
        maxAge:7*24*60*60*1000
    }
}

app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


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
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user;
    next();
})

app.get('/', (req, res) => {
    res.render('listings/home.ejs');  
});


app.get("/demouser",async(req, res,) => {
    const fakeUser = new User({
        email : "abc@gmail.com",
        username:"abc"
    });
    let newUser = await User.register(fakeUser, "abc123");
    res.send(newUser);
});


app.use("/listings",listingRouter);
app.use('/listings/:id/reviews',reviewRouter);
app.use('/',userRouter);

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