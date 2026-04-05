const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync");
const User=require("../models/user");
const passport = require("passport");
const {isloggedIn,saveUrl,isOwner}=require("../middleware")

let listingControl=require("../controllers/user")
router.route("/signup")
.get(listingControl.userGet)
.post(wrapAsync(listingControl.userPost))

// router.get("/signup",listingControl.userGet)


// router.post("/signup",wrapAsync(listingControl.userPost))



//creating the Router for the Login Puproses

router.route("/login")
.get(listingControl.loginget)
.post(saveUrl,passport.authenticate("local",{
  failureRedirect:"/login",
  failureFlash:true,
}),listingControl.loginPost)


// router.get("/login",listingControl.loginget)


// router.post("/login",saveUrl,passport.authenticate("local",{
//   failureRedirect:"/login",
//   failureFlash:true,
// }),listingControl.loginPost)


//creating the logout route 

router.get("/logout",listingControl.logout);


module.exports=router; 