const mongoose = require("mongoose")
var nodemailer = require("nodemailer");
const userModel = require("../Models/userModel")
const HashGenerate = require("../Middleware/hashing")
const validator = require("../Middleware/validation")
const tokenGenerator = require("../Middleware/token")
const upload = require("../Middleware/uploads")
const sender =  require("../Middleware/mail")
async function Signup(req, res) {
    //password hashing
    req.body.password = await HashGenerate.HashGenerate(req.body.password)
    const user = new userModel(req.body) // create new user
    console.log(user);
    try {
        if ((req.body.username) = "") {
            res.status(400).json({ message: "please give username" })
            return
        }
        if (!validator.emailValidate.validate(req.body.email)) {
            res.status(400).json({ message: "Email format invalid"})
            return
        }
        if (!validator.Pwdvalidator.validate(req.body.password)) {
            res.status(400).json({ message: "Password invalid" })
            return
        }
        const ExistingUser = await userModel.findOne({ email: req.body.email })
        if (ExistingUser) {
            res.status(400).json({ message: "Email already exit, please give new email id" })
        } else {
            try {
                // sending mail 
                var sender = nodemailer.createTransport({
                    service: "outlook",
                    auth: {
                        user: "dharshini.s@datayaan.com",
                        pass: ""
                    }
                });
                var composemail = {
                    from: "dharshini.s@datayaan.com",
                    to: req.body.email,
                    subject: "send mail",
                    text: `hi, this is dharshini`
                };
                sender.sendMail(composemail, function (error, info) {
                    if (error) {
                        console.log(error);
                
                    } else {
                        console.log("mail send successfully" + info.response);
                    }
                })
                // file upload images
                if(req.file){
                    user.profileImage = req.file.path
                }
                // save response
                const savedUser = await user.save()
                res.status(200).json({ message: "signup successfully", data: savedUser });
            } catch (err) {
                res.status(400).json({ message: err })
                return
            }
        }

    } catch (err) {
        res.status(400).json({ message: err })
    }

}

async function LogIN(req, res) {
    console.log("came for login")
    try {
        if (!validator.emailValidate.validate(req.body.email)) {
            res.status(400).json({ message: "Email invalid" })
            return
        }
        if (!validator.Pwdvalidator.validate(req.body.password)) {
            res.status(400).json({ message: "Password invalid" })
            return
        }
        const ExistingUser = await userModel.findOne({ email: req.body.email })
        if (!ExistingUser) {
            res.status(400).json({ message: "Email incorrect" })
        } else {
            const checkUser = await HashGenerate.HashValidator(req.body.password, ExistingUser.password)
            if (!checkUser) {
                res.status(400).json({ message: "Password incorrect" })
            } else {
                const token = await tokenGenerator.tokenGenerator(ExistingUser._id, ExistingUser.role);
                res.status(200).json({
                    message: "successfully login",
                    accessToken: token
                });
            }
        }
    } catch (err) {
        console.log("error is",err)
        res.status(400).json({ message: err });
    }
}
async function UpdateUser(req,res) {
    // if(req.body.userId === req.params.id){
        try{
        const user = await userModel.findByIdAndUpdate(req.params.id,{
            $set : req.body,
        })
        res.status(200).json({ message: "Account has been updated" })
        }catch(err){
            res.status(400).json({ message: err })
        }
    // }else{
    //     res.status(400).json({ message: "you can update only your account" });
    // }
}
async function DeleteUser(req,res) {
   // if(req.body.userId === req.params.id){
        try{
        const user = await userModel.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Account has been deleted" })
        }catch(err){
            res.status(400).json({ message: err })
        }
    // }else{
    //     res.status(400).json({ message: "you can delete only your account" });
    // }
}
async function getUser(req,res) {
        try{
        const user = await userModel.findById(req.params.id)
        res.status(200).json({ data: user })
        }catch(err){
            res.status(400).json({ message: err })
        }
}
async function followUser(req,res){
    if(req.body.userId !==req.params.id){
        try{
            const user = await userModel.findById(req.params.id)
            const currentUser = await userModel.findById(req.body.userId)
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({ $push: { followers: req.body.userId}})
                await currentUser.updateOne({ $push: {followings: req.params.id}})
                res.status(200).json({ message: "user has been followed" })
            }else{
                await user.updateOne({ $pull: { followers: req.body.userId}})
                await currentUser.updateOne({ $pull: {followings: req.params.id}})
                res.status(400).json({ message: "un followed" });
            }
        }catch{
            res.status(400).json({ message: err })
        }
    }else{
        res.status(400).json({ message: "you can't follow yourself" });
    }
  
}
module.exports = {
    Signup, LogIN, UpdateUser, DeleteUser,getUser,followUser
}
