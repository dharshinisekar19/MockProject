var nodemailer = require("nodemailer");

var sender = nodemailer.createTransport({
    service: "outlook",
    auth: {
        user: "dharshini.s@datayaan.com",
        pass: ""
    }
});
var composemail = {
    from: "dharshini.s@datayaan.com",
    to: "vishal.v@datayaan.com",
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