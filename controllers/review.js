let Review=require("../models/review.js");
let listing=require("../models/listing.js");

module.exports.createPost=async(req, res) => {
    
    // 1. Define as 'listingItem' (Capital I)
    let listingItem = await listing.findById(req.params.id);

    if (!listingItem) {
        throw new ExpressError(404, "Listing not found");
    }

    let newReview = new Review(req.body.Review);
    
    newReview.author=req.user._id;

    console.log(newReview)
    // 2. Use 'listingItem' (Capital I)
    listingItem.Review.push(newReview);

    await newReview.save();
    await listingItem.save();
    
    console.log("Review Added Successfully");
    res.redirect(`/listings/${listingItem._id}`);
}


module.exports.destroyReview=async(req,res)=>{

let {id,reviewId}=req.params;

await listing.findByIdAndUpdate(id,{$pull:{Review:reviewId}});

await Review.findByIdAndDelete(reviewId);

res.redirect(`/listings/${id}`);

}