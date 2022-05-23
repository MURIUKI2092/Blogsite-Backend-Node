const router = require ("express").Router()
const User =require("../models/users")
const Post =require("../models/post")
const bcrypt = require("bcrypt")



// create a new Post

router.post("/",async(req,res)=>{
  const newPost = new Post(req.body);

  try{
    const savedPost = await  newPost.save()
    res.status(200).json(savedPost);


  }catch(err){
    res.status(500).json(err);
  }
})

// update a single post

router.put("/:id",async (req,res)=>{
  try{
    const singlePost = await Post.findById(req.params.id)
    if(singlePost.username===req.body.username){
      try{
        const updatedPost =await Post.findByIdAndUpdate(req.params.id,{
          $set:req.body,},
          {new:true}

        );
        res.status(200).json(updatedPost)

      }catch(err){
        res.status(500).json("You can only update your post!")
      }
    }

  }catch(err){
    res.status(500).json(err)

  }
})

//delete a  single post
router.delete("/:id",async (req,res)=>{
  try{
    const singlePost = await Post.findById(req.params.id)
    if(singlePost.username===req.body.username){
      try{
        await singlePost.delete()
        res.status(200).json("The post has been deleted successfully....")
   

      }catch(err){
        res.status(500).json(err)
      }
    }else{
      res.status(401).json("you can only delete your post")
    }

  }catch(err){
    res.status(500).json(err)

  }
})
//get a single post
router.get("/:id",async (req,res)=>{
  try{
    const post = await Post.findById(req.params.id);
   
    res.status(200).json(post)

  }catch(err){
    res.status(500).json(err)
  }
})
//get all posts
router.get("/",async (req,res)=>{
  const username= req.query.user;
  const category= req.query.cat;
  try{
    let posts;
    if(username){
      posts= await Post.find({username})
    }else if(category){
      posts= await Post.find({categories:{
        $in:[category]}
      })
      
    }else{
      posts= await Post.find();
    }
    
   
    res.status(200).json(posts)

  }catch(err){
    res.status(500).json(err)
  }
})
module.exports =router