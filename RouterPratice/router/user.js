const express=require("express");
const router=express.Router();


router.get("/",(req,res)=>{
 res.send("THis is The rOOt Path of User of Get");
})

router.get("/:id",(req,res)=>{
  res.send("THis is The rOOt Path of User of Get od the ID");
})


router.post("/",(req,res)=>{
res.send("THis is The rOOt Path of User of Post");
})


router.post("/:id",(req,res)=>{
  res.send("THis is The rOOt Path of User of Post");
})
router.delete("/",(req,res)=>{
  res.send("THis is The rOOt Path of User of Get of the Delete path");
})


module.exports=router;