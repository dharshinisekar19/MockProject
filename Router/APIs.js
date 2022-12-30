const express = require("express")
const router = express.Router()
const userController = require("../Controller/user")
const postController = require("../Controller/post")

//route user
router.post("/signup", userController.Signup)
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
router.delete("/comments/:id/:commentId",postController.DeleteComment)

module.exports = router