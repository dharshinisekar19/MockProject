const jwt = require("jsonwebtoken");


const tokenGenerator = (userId, role) => {
    try {
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        const token = jwt.sign(
            { userId, role },
            jwtSecretKey,
            { expiresIn: "3hours" }
        )
        return token;
    } catch (err) {
        console.log('the err while token generation',err)
    }
}
module.exports = {tokenGenerator}