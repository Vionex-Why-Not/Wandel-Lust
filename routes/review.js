const express=require("express");
const router=express.Router({mergeParams:true});
let listing=require("../models/listing.js");
let methodOverride=require("method-override");
// app.use(methodOverride("_method"));

let wrapAsync=require("../utils/wrapAsync.js")
let ExpressError=require("../utils/ExpressError.js")

let {listingSchema, reviewSchema}=require("../schema.js")
let Review=require("../models/review.js");

// let {isLoggedIn,isReviewAuthor}=require("/Major project/middleware.js")

const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");

let listingControl=require("../controllers/review.js")

//Middleware to validate the Review Schema
const ValidateReview=(req,res,next)=>{
  let {error}=reviewSchema.validate(req.body);

  if(error){
    let msg=error.details.map((el)=>
      el.message).join(",");    
    
    throw new ExpressError(400,msg);
    }
  else{
    next();
  }
}


//Creating the Post request Method to add The Review in the Listings or in the Db
router.post("/", isLoggedIn,ValidateReview, wrapAsync(listingControl.createPost));


//Creating the Delete Request Method to delete the Review from the Listings or from the Db

router.delete("/:reviewId", isLoggedIn,isReviewAuthor,wrapAsync(listingControl.destroyReview))

module.exports=router;