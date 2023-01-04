const express = require("express")
const router = express.Router()
const userController = require("../Controller/user")
const postController = require("../Controller/post")
const upload = require("../Middleware/uploads")

//route user
router.post("/signup",upload.single('profileImage'),userController.Signup)
router.post("/login",userController.LogIN)
router.put("/:id",userController.UpdateUser)
router.delete("/:id",userController.DeleteUser)
router.get("/:id",userController.getUser)
router.put("/follow/:id",userController.followUser)

// postuser
router.post("/post",postController.PostStory)
router.put("/update/:id",postController.UpdatePost)
router.delete("/delete/:id",postController.DeletePost)
router.put("/like/:id",postController.likePost)
router.put("/comment/:id",postController.CommentPost)
router.get("/get/:id",postController.GetPost)
router.delete("/deletecomment/:id",postController.DeleteComment)

module.exports = router