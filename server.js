const express = require("express");
const app = express();
const mongoose =require("mongoose");
const dotenv= require("dotenv");
const port = 5000;
const multer = require("multer")
dotenv.config()
app.use(express.json())
const authRoute = require("./routes/Auth");
const userRoute = require("./routes/users")
const postRoute = require("./routes/posts")
const categoryRoute = require("./routes/category")

mongoose.connect(
  process.env.MONGO_URL
)
.then(console.log("connected to mongo"))
.catch((err)=>console.log(err))

const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"images");
  },filename:(req,file,cb)=>{
    cb(null,"hello.jpeg");
  }
})
const upload= multer({storage:storage})
app.post("/api/v1/upload",upload.single("file"),(req,res)=>{
  res.status(200).json("file has been uploaded")
})

app.use("/api/v1/auth",authRoute);
app.use("/api/v1/users",userRoute)
app.use("/api/v1/posts",postRoute);
app.use("/api/v1/categories",categoryRoute);
 
 
app.listen(port,()=>{
  console.log("Backend is running");
});