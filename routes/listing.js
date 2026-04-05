const express=require("express");
const router=express.Router();
let wrapAsync=require("../utils/wrapAsync.js")
let ExpressError=require("../utils/ExpressError.js")
let listing=require("../models/listing.js");
let {listingSchema, reviewSchema}=require("../schema.js")
let Review=require("../models/review.js");
let {isLoggedIn}=require("../middleware.js");
const multer=require("multer");
const {storage}=require("../CloudConfig.js")
const upload=multer({storage})


const Validatelisting=(req,res,next)=>{
  let {error}=listingSchema.validate(req.body);
  
  if(error){
    let msg=error.details.map((el)=>
      el.message).join(",");    
    
    throw new ExpressError(400,msg);
    }
  else{
    next();
  }
}


let listingControl=require("../controllers/listing.js")

// this is the router.route method is use in this format to "/"
// router.js
router.route("/")
  .get(wrapAsync(listingControl.index))
  .post(
    isLoggedIn, 
    upload.single("listing[image]"), // 1. Multer processes the file first
    Validatelisting,                 // 2. Validate the text data
    wrapAsync(listingControl.addRoute) // 3. Finally, save to DB
  );
// .post((req,res)=>{
//   // res.send(req.body);
// })

// .post(upload.single("listing[image]"),(req,res)=>{
//   res.send(req.file);
// })



//Index Route - to show all listings
// router.get("/",wrapAsync(listingControl.index));


  //new Route - to show form to create new listing
  router.get("/new",isLoggedIn,listingControl.renderNewForm)


//add Route - to add new listing to database

// router.post("/",wrapAsync(listingControl.editRoute))


router.route("/:id")
.get(wrapAsync(listingControl.showRoute))
  .put(
    isLoggedIn, 
    upload.single("listing[image]"), // 1. Multer processes the file first
    Validatelisting,                 // 2. Validate the text data
    wrapAsync(listingControl.updateRoute) // 3. Finally, save to DB
  )
// .put(upload.single("listing[image]"),Validatelisting,isLoggedIn,wrapAsync(listingControl.updateRoute))
.delete(isLoggedIn,wrapAsync(listingControl.deleteRoute  ))

//Show Route - to show details of one listing
// router.get("/:id",wrapAsync(listingControl.showRoute))


// //Edit Route - to show form to edit a listing
router.get("/:id/edit",isLoggedIn,wrapAsync(listingControl.editRoute))




//Update Route By using the Put Method
// router.put("/:id",Validatelisting,isLoggedIn,wrapAsync(listingControl.updateRoute))




//Delete Route to delete a listing
// router.delete("/:id",isLoggedIn,wrapAsync(listingControl.deleteRoute  ))









module.exports=router;