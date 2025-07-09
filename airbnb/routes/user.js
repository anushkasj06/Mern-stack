const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const wrapAsync = require('../utils/wrapAsync.js');
const passport = require('passport');
const {RedirectUrl} = require('../middleware.js');
const UserController = require('../controller/user.js');


router.route("/signup")
.get(UserController.RenderSignupForm )
.post(wrapAsync( UserController.Signup));

router.route("/login")
.get(UserController.RenderLoginForm)
.post(RedirectUrl, passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login"
}),UserController.Login);


router.get("/logout",  UserController.Logout);

module.exports = router;