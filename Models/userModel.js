const mongoose = require("mongoose")

const userSchema = mongoose.Schema
const userModel = userSchema({
    username: { type: String,default: "" },
    email: { type: String, required: true },
    profileImage: { type: String, default: "" },
    followers: { type: Array, default: [] },
    followings: { type: Array, default: [] },
    account: { type: Boolean, default: true },
    password: { type: String, required: true },
    location: { type: String,default: ""  },
    bio :{ type : String,default: "" },
},
    { versionKey: false },
    { timestamps: true }
);
module.exports = mongoose.model("User", userModel)