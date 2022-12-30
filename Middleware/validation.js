const emailValidate = require("email-validator")
const passwordValidate = require("password-validator")

//validate email
emailValidate.validate("test@email.com") // true

// validate password
var Pwdvalidator = new passwordValidate();

Pwdvalidator
.is().min(8)  // min length 8
.is().max(100)  // max length  100
.has().uppercase() // should be uppercase
.has().lowercase()  // should be lowercase
.has().digits(2)    // must have atleast 2 digits
.has().not().spaces()   // should not have space
.is().not().oneOf(["Password","Password123"]) // blacklist these values

module.exports={emailValidate,Pwdvalidator}

