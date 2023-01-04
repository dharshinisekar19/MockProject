const mongoose = require('mongoose');
const express = require("express")
const dotenv = require("dotenv")
const morgan = require("morgan")
const helmet = require("helmet")
const ApiRouter = require("./Router/APIs")
dotenv.config()

const url = "mongodb://localhost/socialMedia";
const app = express();
mongoose.set('strictQuery', false);

mongoose.connect(url, { useNewUrlParser: true }).then(() => {
    console.log("successfully connected to database")
})
    .catch((error) => {
        console.log("database connection failed..");
    })


app.use(express.json())
app.use(helmet())
app.use(morgan("common")) 
app.use("/api",ApiRouter)

app.listen(6000, () => {
    console.log("server started");
})