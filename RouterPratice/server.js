const express=require("express");
const app=express();
let users=require("./router/user.js");
let posts=require("./router/post.js");  
let path=require("path");

const port=8080;

app.listen(port,()=>{
  console.log(`Server is running on http://localhost:${port}`);
})  

// app.get("/user",(req,res)=>{
//   res.send("This is the Root Path")
// })

// app.use("/user",users);

// app.use("/post",posts);


// let cookieparser=require("cookie-parser");
// app.use(cookieparser("secretcode"));


// app.get("/",(req,res)=>{
//   res.cookie("Country","India", { signed: true });
//   res.cookie("Made-In","India", { signed: true });
//   res.send("Hi this is cookie dema root has been cretaed ");
// })


// //get cookie for the verification process in this cases



// app.get("/getcookie",(req,res)=>{

//   res.cookie("username","Admin", { signed: true });
//   res.cookie("password","12345", { signed: true });
//   res.send("Cookies have been set");
// })

// //verfication process route cretated

// app.get("/verify",(req,res)=>{

//   console.log(req.signedCookies);
//   console.log(req.cookies);
//   res.send(`Cookies have been verified hello my dear Welcome Back to our Website`);
// })





//Express-Session Middleware we are going to perform the Session



// app.use(session({secret:"unknown Person"}))

// app.get("/",(req,res)=>{
//   res.send("This is the session demao rooth path to check whether it is working or not let's see");
// })

// app.get("/recount",(req,res)=>{
//   if(req.session.count){
//     req.session.count++
//   } else{
//     req.session.count=1;
//   }

//   res.send(`You have visited this page ${req.session.count} times`);
// })


let session=require("express-session");
let flash=require("connect-flash")
app.set("'view engine","ejs");
app.set("views",path.join(__dirname,"views"));




const sessionOptions={
  secret:"unknown Person",
  resave:false,
  saveUninitialized:true

}

app.use(session(sessionOptions));
app.use(flash())

app.get("/register",(req,res)=>{
  let {name="anonymous"}=req.query;

  req.session.name=name;

  req.flash("sucess","Successfully Registered");

  res.redirect("/hello");

})


app.get("/hello",(req,res)=>{

  res.render("page.ejs",{name:req.session.name, msg:req.flash("sucess")});

})