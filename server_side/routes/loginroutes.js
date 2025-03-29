const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const UserModel = require("../models/AdminModel");
const { body, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");

const sendVerificationEmail = async (user) => {
    const token = jwt.sign({ email: user.email }, "shivangi123", {
        expiresIn: "1d",
    });

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "agshivangi3393@gmail.com",
            pass: "wcve fbgw bzkk uuna"
        },
    });

    const url = `http://localhost:5000/api/auth/verify/${token}`;

    await transporter.sendMail({
        to: user.email,
        subject: "Email Verification",
        html: `<p>Click <a href="${url}">here</a> to verify your email.</p>`,
    });
};

router.post("/signup", async (req, res) => {
    const { email, password, name, lastName, role } = req.body;
    console.log("req.body", req.body);
    if (!email || !password || !name || !lastName) {
        res.status(400).json({ message: "Email or password or name is not present" })
    }
    try {

        const findUser = await UserModel.findOne({ email: email });
        if (findUser) {
            return res.status(400).json({ message: "User Already Exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = new UserModel({
            firstName: name,
            lastName: lastName,
            email: email,
            password: hashedPassword,
            role: role
        })
        await user.save();
        await sendVerificationEmail(user);
        res.status(200).json({ message: "User Created Successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something Went Wrong Please Try Again Later" })
    }

});

router.get("/verify/:token", async (req, res) => {
    try {
        const { email } = jwt.verify(req.params.token, "shivangi123");

        console.log(email, "email")
        await UserModel.findOneAndUpdate({ email }, { isVerified: true });
        res.json({ message: "Email verified successfully!" });
    } catch (err) {
        res.status(400).json({ message: "Invalid or expired token" });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });
        if (user.role !== "admin") return res.status(403).json({ message: "You are not allowed to login from here" });
        if (!user.isVerified) return res.status(400).json({ message: "Email not verified" });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, role: user.role }, "shivangi123", { expiresIn: "1d" });

        res.json({ token, 
            user: { firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role },
        });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});


module.exports = router;