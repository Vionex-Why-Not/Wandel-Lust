if(process.env.NODE_ENV!="production"){
  require("dotenv").config();
  // console.log(process.env);
}

let express=require("express");
let app=express();
// let port=3000;
let port=process.env.PORT || 3000;
let path=require("path");
const mongoose=require("mongoose");
let listing=require("./models/listing.js");
let methodOverride=require("method-override");
app.use(methodOverride("_method"));
let ejsMate=require("ejs-mate");
app.engine("ejs",ejsMate);
let wrapAsync=require("./utils/wrapAsync.js")
let ExpressError=require("./utils/ExpressError.js")

let {listingSchema, reviewSchema}=require("./schema.js")
let Review=require("./models/review.js");
// let reviewSchema=require("./schema.js")

const listings=require("./routes/listing.js")
const review=require("./routes/review.js");
const userRouter=require("./routes/user.js")

const session=require("express-session")
const MongoStore = require('connect-mongo');
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local").Strategy;
const User=require("./models/user.js");
const dbURL=process.env.ATLAS_URL
const store=MongoStore.create({
  mongoUrl:dbURL,
  crypto:{
    secret:process.env.SECRET,
  },
  touchAfter:24*60*60,
  }
)

store.on("error",(err)=>{
  console.log("Error in session store",err);
})

const sessionOption={
  store,
  secret:process.env.SECRET,
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires:Date.now()+7 * 24 * 60 * 60 * 1000,
    maxAge:7*24*60*60*1000,
    httpOnly:true,
  }
  
}

// app.get("/",(req,res)=>{
//   res.send("hi i am home page");
// })
app.use(session(sessionOption));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  res.locals.currentUser=req.user;
  next();
})



// this is the Atlas URL for the database connection



main()
.then(()=>{
  console.log("connected to database");
})
.catch((err)=>{
  console.log("error connecting to database",err);
})

async function main(){
  // await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
  await mongoose.connect(dbURL,{ family: 4 });
}

app.listen(port,()=>{
  console.log(`Server is running on http://localhost:${port}`);
})

app.set("view engine","ejs"); 

app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));



app.get("/test",wrapAsync(async (req,res)=>{
  let sample=new listing({
    title:"Beautiful Beach",
    description:"A beautiful beach with crystal clear water and white sand.",
    image:" ",  
    price:150,
    location:"Maldives",
    
  })
  await sample.save();
  res.send("Test listing created");
  console.log("Test listing created");
})
)








//Demo Path to check the user.js/models/hasing/password/username
app.get("/demouser",async(req,res)=>{
  let fakeUser=new User({
    email:"abc@gmail.com",
    username:"Unknown person",
  })

  let result=await User.register(fakeUser,"helloworld");
  res.send(result);
})

//User Routes
app.use("/",userRouter)

//Listings Routes
app.use("/listings",listings);

//Review Routes
app.use("/listings/:id/review",review);




app.use((err,req,res,next)=>{
  let {statusCode=500,message="Something Went Wrong"}=err;
  console.log(err.message)
  res.render("error.ejs",{err})
  // res.status(statusCode).send(message);
})


// app.all(/(.*)/,(req,res,next)=>{
//   next(new ExpressError(404,"Page not found"));
// })









// app.all(/(.*)/,(req,res,next)=>{
//   next(new ExpressError(404,"Page not founnd "))
// })

// app.use((err,req,res,next)=>{
//   res.send("something Went Wrong Plaease Check it !")
// })\\\