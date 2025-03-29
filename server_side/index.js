const express = require("express");
const cors = require("cors");
require("dotenv").config();
const LoginRoutes = require("./routes/loginroutes");
const mongoose = require("mongoose");


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
app.use("/api/auth", LoginRoutes);

// =====================mongoose connection====================
mongoose.connect("mongodb://localhost:27017/Techeruditedatabase")
    .then(() => {
        console.log("MONGODB IS CONNECTED")
    })
    .catch((error) => {
        console.log(error)
    })
// ==============server connection=====================
app.listen(5000, () => {
    try {
        console.log("server is listening at port 5000")
    } catch (error) {
        console.log(error)
    }
})



