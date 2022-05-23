const express = require("express");
const app = express();
const mongoose =require("mongoose");
const dotenv= require("dotenv");
const port = 5000;
dotenv.config()
app.use(express.json())
const authRoute = require("./routes/Auth")

mongoose.connect(
  process.env.MONGO_URL
)
.then(console.log("connected to mongo"))
.catch((err)=>console.log(err))

app.use("/api/v1/auth",authRoute)
 
app.listen(port,()=>{
  console.log("Backend is running");
});