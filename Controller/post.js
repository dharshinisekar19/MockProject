const post = require("../Models/postModel")
const mongoose = require("mongoose");

async function PostStory(req, res) {
    try {
        const postUser = new post(req.body)
        const savedPost = await postUser.save()
        res.status(200).json({ message: "post created successfully", data: savedPost });
    } catch (err) {
        res.status(400).json({ message: err })
        return
    }
}
// update a post 
async function UpdatePost(req, res) {
    try {
        const updatePost = await post.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        });
        res.status(200).json({ message: "post updated successfully" });
    } catch (err) {
        res.status(400).json({ message: err })
    }
}
//delete a post
async function DeletePost(req, res) {
    try {
        const deletePost = await post.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "post deleted successfully" });
    } catch (err) {
        res.status(400).json({ message: err })
    }
}
//like a post 
async function likePost(req, res) {
    try {
        const Post = await post.findById(req.params.id)
        if(!Post.likes.includes(req.body.userId)){
            await Post.updateOne({$push: {likes :req.body.userId}})
            res.status(200).json({ message: "liked Successfully" })
        }else{
           await Post.updateOne({$pull: {likes : req.body.userId}})
           res.status(400).json({ message : "The post has been disliked"}) 
        }
    } catch (err) {
        console.log("err",err);
        res.status(400).json({ message: err })
        return
    }
}
//commentpost
async function CommentPost (req,res){
    try{
        const comment = await post.findById(req.params.id)
       await comment.updateOne({$push : {commentsPost :req.body.commentsPost}})
        res.status(200).json({message : "comment successfully"})
        
    }catch(err){
        console.log("err",err);
        res.status(400).json({ message: err })
        return
    }
}
//getpost
async function GetPost(req,res){
    try{
        const Post = await post.findById(req.params.id)
        res.status(200).json({ data: Post })
        
    }catch(err){
        console.log("err",err);
        res.status(400).json({ message: err })
        return
    }
}
//deletecomment
async function DeleteComment(req,res){
    try{
        const data = await post.findByIdAndUpdate(req.params.id,{$pull : {commentsPost:req.params.commentId}});
        console.log("re",req.params.id);
        console.log("com",req.params.commentId);
        console.log("king",req.params);
        if(!data){
            res.status(400).json({ message: "post not found" })
        }
        // await post.commentModel.findByIdAndDelete(req.params.commentId)
        // res.status(200).json({ message: "comment deleted" })  
        
    }catch(err){
        console.log("err",err);
        res.status(400).json({ message: err })
        return
    }
}
module.exports = {
    PostStory,UpdatePost,DeletePost,likePost,CommentPost,GetPost,DeleteComment
}