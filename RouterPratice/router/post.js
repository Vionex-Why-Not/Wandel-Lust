const express=require("express");
const router=express.Router();


router.route("/")
.get((req,res)=>{
 res.send("THis is The rOOt Path of Post of Get");
})
.post((req,res)=>{
 res.send("THis is The rOOt Path of Post of Post");
})
.delete((req,res)=>{
 res.send("THis is The rOOt Path of Post of Get of the Delete path");
})

router.route("/:id")
.get("/:id",(req,res)=>{
  res.send("THis is The rOOt Path of Post   of Get od the ID");
})
.post("/:id",(req,res)=>{
  res.send("THis is The rOOt Path of Post of Post");
})







module.exports=router;


// router.get("/",(req,res)=>{
//  res.send("THis is The rOOt Path of Post of Get");
// })

// router.post("/",(req,res)=>{
//  res.send("THis is The rOOt Path of Post of Post");
// })


// router.get("/:id",(req,res)=>{
//   res.send("THis is The rOOt Path of Post   of Get od the ID");
// })

// router.post("/:id",(req,res)=>{
//   res.send("THis is The rOOt Path of Post of Post");
// })
// router.delete("/",(req,res)=>{
//  res.send("THis is The rOOt Path of Post of Get of the Delete path");
// })