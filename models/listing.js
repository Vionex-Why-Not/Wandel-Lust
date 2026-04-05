const mongoose = require('mongoose');
let {Schema} = mongoose;
const Review=require("./review")
let listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true    
    },
    description: {
        type: String,     
        required: true
    },
    image: {
      url: {
        type: String,
        default: "https://images.unsplash.com/photo-1504470695779-75300268aa0e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        // Check if v is empty string "" OR undefined OR null
        set: (v) => v === "" ? "https://images.unsplash.com/photo-1504470695779-75300268aa0e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v,
      },
      filename: String,
    },  
    price: {
        type: Number,
        required: true,
        min:0
    },
    location: {
        type: String,
        required: true
    } ,
    country:{
      type:String,
    },

    Review:[
      {
        type:Schema.Types.ObjectId,
        ref:"Review"
      }
    ],
    Owner:{
      type:Schema.Types.ObjectId,
      ref:"User"
    },

    geometry:{
       type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
  }
});


listingSchema.post("findOneAndDelete",async(data)=>{
  if (data){
    await Review.deleteMany({_id:{$in:data.Review}})
  }
})




const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;


