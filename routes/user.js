import express from 'express'
const router=express.Router();
import User from '../models/user.js';
import wrapAsync from '../utils/wrapeAsync.js';
import passport from 'passport';
import  {saveRedirectUrl}  from '../midleware.js';
import userController from '../Controllers/users.js'


router.route("/signup")
.get(userController.rendersignupFrom)
.post(wrapAsync(userController.postSignup));


router.route("/login")
.get(userController.renderLoginForm)
.post(saveRedirectUrl,passport.authenticate("local",{failureRedirect: "/login",failureFlash:true}),wrapAsync(userController.Login));


router.get("/logout", userController.Logout);

export default router