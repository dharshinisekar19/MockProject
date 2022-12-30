const mongoose = require("mongoose")
const Model = mongoose.Schema

const commentModel = Model ({
    comment :{type : String},
    userId : {type : String}
})

const postModel = Model({
    likes : {type : Array, default:[]},
    userId : {type:String, required : true },
    image : {type:String},
    desc : {type : String, max :500},
    commentsPost : [commentModel]
},
{ versionKey: false },
{ timestamps: true }

)
module.exports = mongoose.model("post", postModel)
// module.exports = {commentModel,postModel}