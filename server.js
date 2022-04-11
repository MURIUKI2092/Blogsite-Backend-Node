const express = require("express");
const app = express();
const mongoose =require("mongoose");
const dotenv= require("dotenv");
const port = 5000;
dotenv.config()

mongoose.connect(
  process.env.MONGO_URL
)
.then(console.log("connected to mongo"))
.catch((err)=>console.log(err))
 
app.listen(port,()=>{
  console.log("Backend is running");
});