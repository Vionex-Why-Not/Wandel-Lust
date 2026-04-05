let listing=require("./models/listing")
let Review=require("./models/review")

module.exports.isLoggedIn=(req,res,next)=>{

  console.log(req.path,"...",req.originalUrl)

 if(!req.isAuthenticated()){
  req.session.redirectUrl=req.originalUrl;
  req.flash("error","You have to logged in First to continue")
   return  res.redirect("/login");
  }
  next();
}

module.exports.saveUrl=(req,res,next)=>{
  if(req.session.redirectUrl){
  res.locals.redirectUrl=req.session.redirectUrl;
  }
 
  next();

}


module.exports.isOwner=async(req,res,next)=>{
  let {id}=req.params;
  let listing=await listing.findById(id);

  if(!listing.Owner._id.equals(res.locals.currentUser._id)){
    req.flash("error","YOu are not The Owner so You dont have permission")
    res.redirect(`/listings/${id}`)
  }

  next();
}



module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;

  const review = await Review.findById(reviewId);

  if (!review.author.equals(req.user._id)) {
    req.flash("error", "You are not allowed to modify this review");
    return res.redirect(`/listings/${id}`); // 🔥 return is REQUIRED
  }

  next();
};
