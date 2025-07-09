const User = require('../models/user.js');


module.exports.RenderSignupForm = (req, res)=>{
    res.render("users/signup.ejs");
};

module.exports.Signup = async(req, res)=>{
    try{
        let {username, email, password} = req.body;
        let user = new User({username, email});
        const newuser = await User.register(user, password);
        req.login(newuser, (err)=>{
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome to Airbnb");
            res.redirect("/listings");
        });
        
    }catch(e){
        req.flash("error", e.message);
        console.log("error");
        res.redirect("/signup");
    }

};

module.exports.RenderLoginForm = (req, res)=>{
    res.render("users/login.ejs");
};

module.exports.Login=  (req, res) => {
    req.flash("success", "Welcome Back to Airbnb");

    // Use res.locals.redirectUrl safely
    const redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.Logout = (req, res)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "You are Logged Out!");
        res.redirect("/listings");
    })
};