const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const requiredLogin=require('../middleware/requiredLogin')
const Post=mongoose.model("Post")

router.get('/allposts',requiredLogin,(req,res)=>{
    Post.find()
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .sort('-createdAt')
    .then(posts=>{
        res.json({posts:posts})
    })
    .catch(err=>{
        console.log(err)
        
    })
})
router.get('/subposts',requiredLogin,(req,res)=>{
    if(req.user.following)
    Post.find({postedBy:{$in:req.user.following}})
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .sort('-createdAt')
    .then(posts=>{
        res.json({posts:posts})
    })
    .catch(err=>{
        console.log(err)
        
    })
})
router.get('/mypost',requiredLogin,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .then(myposts=>{
        res.json({myposts})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/Createpost',requiredLogin,(req,res)=>{
    const{title,body,pic}=req.body
    if(!title || !body || !pic)
    {
        return res.status(422).json({error:"please fill all the fields"})

    }
    // console.log(req.user)
    // res.send("ok")
    req.user.password=undefined
    const post=new Post({
        title,body,
        photo:pic,
        postedBy:req.user

    })
    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })

})

router.put('/like',requiredLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $addToSet:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
       if(err)
       {
        return res.status(422).json({error:err})
       } else{
           res.json(result)
       }
    })


})
router.put('/unlike',requiredLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
       if(err)
       {
        return res.status(422).json({error:err})
       } else{
           res.json(result)
       }
    })


})

router.put('/comment',requiredLogin,(req,res)=>{
    const comment={
        text:req.body.text,
        postedBy:req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId,{
        $addToSet:{comments:comment}
    },{
        new:true
    })
    .populate("comments.postedBy","_id name")
    .populate("postedBy","_id name")
    .exec((err,result)=>{
       if(err)
       {
        return res.status(422).json({error:err})
       } else{
           res.json(result)
       }
    })


})
router.delete('/delete/:postId',requiredLogin,(req,res)=>{
    Post.findOne({_id:req.params.postId})
    .populate("postedBy","_id")
    .exec((err,post)=>{
        if(err || !post)
        {
            
          return res.status(422).json({error:"hello"+err})
        }
        if(post.postedBy._id.toString()===req.user._id.toString())
        {
           
             post.remove()
             .then(result=>{
                res.json(result)
             }).catch(err=>{
                console.log(err)
             })
        }
    })

})

// router.delete('/deleteComment/:postId/:commentId', requiredLogin, (req, res) => {
//     Post.findById(req.params.postId)
//     //   .populate("postedBy","_id name")
//       .populate("comments.postedBy","_id name")
//       .exec((err,post)=>{
//           if(err || !post){
//             return res.status(422).json({message:"Some error occured!!"});
//           }
//           const comment = post.comments.find((comment)=>
//             comment._id.toString() === req.params.commentId.toString()
//             );
//             if (comment.postedBy._id.toString() === req.user._id.toString()) {
//                 const removeIndex = post.comments
//                 .map(comment => comment.postedBy._id.toString())
//                 .indexOf(req.user._id);
//                 post.comments.splice(removeIndex, 1);
//                 post.save()
//                 .then(result=>{
//                     res.json(result)
//                 }).catch(err=>console.log(err));
//             }
//       })
//   });
 module.exports=router