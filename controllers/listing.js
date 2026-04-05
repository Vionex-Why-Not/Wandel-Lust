let listing=require("../models/listing")

// this is the use for the geooding to get the lat and long of the location and then we can use it to show the location on the map
const mbxGeocoding= require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken=process.env.MAP_TOKEN;
const geocodingclient= mbxGeocoding({ accessToken: mapToken });

module.exports.index=async(req,res)=>{


  let allListings=await listing.find({});
    res.render("./listings/index.ejs",{allListings})
  };

module.exports.renderNewForm=(req,res)=>{
   
  
  res.render("./listings/new.ejs");
}

module.exports.showRoute=async(req,res)=>{
  let {id}=req.params;
  console.log(id);
  let alldetails=await listing.findById(id).populate({path:"Review",
    populate:{
      path:"author"
    }
  }
  ).populate("Owner");

  if(!alldetails){
    req.flash("error","Lsiting you requested For doesn't Exist");
    return res.redirect("/listings");
  }
  res.render("./listings/show.ejs",{alldetails,mapToken: process.env.MAP_TOKEN });
}

module.exports.editRoute=async(req,res)=>{
  let {id}=req.params;

  let editUser=await listing.findById(id);
   if(!editUser){
    req.flash("error","Lsiting you requested For doesn't Exist");
   return  res.redirect("/listings");
  }

  let OriginalImageURL=editUser.image.url;
 OriginalImageURL = OriginalImageURL.replace("/upload", "/upload/w_250");
  req.flash("success","sucessfully Edited  listing")
  res.render("./listings/edit.ejs",{ editUser, OriginalImageURL })
}



// controllers/listing.js
module.exports.addRoute = async (req, res) => {

// this is the code for the geocoding to get the lat and long of the location and then we can use it to show the location on the map
let Response= await geocodingclient.forwardGeocode({
 query: req.body.listing.location,
  limit:1
})
.send()


  // Check if file exists to prevent errors
  let url = req.file.path;
  let filename = req.file.filename;

  // Create the new instance using the nested 'listing' object from req.body
  const newListing = new listing(req.body.listing);
  
  newListing.Owner = req.user._id;
  newListing.image = { url, filename }; // Set the cloud upload details

  newListing.geometry = Response.body.features[0].geometry; // Set the geometry from geocoding response
  await newListing.save();
  req.flash("success", "Successfully added new listing!");
  res.redirect("/listings");
};


module.exports.updateRoute=async(req,res)=>{
  let {id}=req.params;
 let list=await listing.findByIdAndUpdate(id, req.body.listing, {runValidators:true, new:true});

 if(typeof req.file!=="undefined"){
  let url=req.file.path;
  let filename=req.file.filename;
  list.image={url,filename};
  await list.save();
 }

 req.flash("success","sucessfully UPdated listing")
 res.redirect(`/listings/${id}`);
}


module.exports.deleteRoute=async(req,res)=>{
  let {id}=req.params;
  let listings=await listing.findByIdAndDelete(id);
   if(!listings){
    req.flash("error","Lsiting you requested For doesn't Exist");
   return  res.redirect("/listings");
  }
   req.flash("success","sucessfully Delete the listing")
  res.redirect("/listings");
}