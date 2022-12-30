const jwt = require("jsonwebtoken");
const userModel = require("../Models/userModel")

async function tokenValidator(req, res, next) {
    try {
        const bearerToken = req.headers.authorization;
        if (bearerToken) {
            var bearer = bearerToken.split(" ");
            var token = bearer[1];
        }
        if (!token) {
            res.status(403).json({ message: "A token is required for authentication" })
            return
        }
    } catch (err) {
        res.status(401).json({ message: "token invalid" });
        return
    }

    try {
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        const verified = jwt.verify(token, jwtSecretKey);
        console.log("jwt", jwtSecretKey);
        const existingUserId = await userModel.findById(verified.userId);
        // if (existingUserId) {
        //     // res.status(200).json({ message:"successfully verified and userId in database", data: verified });
        // } else {
        //     res.status(400).json({ message: "userId incorrect" })
        //     return
        // }

        req.role = verified.role
        req.userId = verified.userId
        console.log(req.role);
        console.log(req.userId);
        next();


    } catch (err) {
        console.log("came here!!");
        res.status(400).send(err);
        return
    }
}
module.exports.tokenValidator = tokenValidator;