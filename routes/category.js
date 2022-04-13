const router = require("express").Router()
const category = require("../models/category")


router.post("/",async(req,res)=>{
  const newCategory = new category(req.body);

  try{
    const savedCategory = await newCategory.save()
    res.status(200).json(savedCategory)

  }catch(err){
    res.status(500).json(err);
  }
})
//get all categories
router.get("/",async(req,res)=>{
  
  try{
    const categories = await category.find()
    res.status(200).json(categories)

  }catch(err){
    res.status(500).json(err);
  }
})
module.exports= router