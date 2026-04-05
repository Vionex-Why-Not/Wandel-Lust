const User=require("../models/user");

module.exports.userGet=(req,res)=>{
 res.render("users/signUp.ejs")
}

module.exports.userPost=async(req,res)=>{

  try{
let {username,email,password}=req.body;

let newUser=new User({username,email});

let registerUser=await User.register(newUser,password);

console.log(registerUser);


//signup after login automatically

req.login(registerUser,(err)=>{
  if(err){
    return next(err);
  }
  req.flash("success","Welcome to Wanderlust")
res.redirect("/listings")
})

  }
catch(e){
  console.log(e.message);
  req.flash("error",e.message);
  res.redirect("/signup")
}
}

module.exports.loginget=(req,res)=>{
  res.render("users/login.ejs");
}

module.exports.loginPost=(req,res)=>{

  let redirectUrl=res.locals.redirectUrl || "/listings";
  req.flash("success","Welcome to the Wanderlust");
  res.redirect(redirectUrl);
}

module.exports.logout=(req,res,next)=>{
  req.logout((err)=>{
    if(err){
    return next(err);
    }

  
  req.flash("success","you have logout Successfully!");
  res.redirect("/listings")

  });
}
