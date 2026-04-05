const mongoose=require("mongoose");
const initData=require("./data.js");
const listing=require("../models/listing.js");

main()
.then(()=>{
  console.log("seeding done");
})
.catch((err)=>{
  console.log(err);
});

async function main(){
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
}

const initDB = async () => {
  await listing.deleteMany({});
  
  // 1. Fix the spelling: initData (not intiData)
  // 2. Fix the logic: Assign the result of map to a NEW variable
  const dataWithOwner = initData.data.map((obj) => ({
    ...obj, 
    Owner: "69554faea246c9a8587985bd"  // <--- Ensure this User ID exists in your DB!
  }));

  // 3. Insert the new variable
  await listing.insertMany(dataWithOwner); 
  console.log("Database initialized with sample data");
};

initDB();
initDB();