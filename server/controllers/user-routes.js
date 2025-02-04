
const express = require("express");
const User = require("../models/userData");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const SALT = process.env.SALT
const jwt = require("jsonwebtoken")
const JWT_KEY = process.env.JWT_KEY
console.log("JWT_KEY:", JWT_KEY)


//create user endpoint
router.post("/register", async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;

    try{
        if(!firstName || !lastName || !email || !password || !role){
            return res.status(400).json({ err: "Please complete all fields"});
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ err: "This email is already in use" });
    }

    const saltRounds = parseInt(process.env.SALT);
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
    })

    await newUser.save();

    const payload = {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email
    };

    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "1h" });

    res.status(201).json({ message: "User created successfully", userId: newUser._id})
}catch (err) {
    res.status(500).json({ err: "internal server error" });
}
})

//login endpoint
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ err: "Please provide email and password" });
        }


        // check for existing user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ err: "User not found" });
        }


        //verify credentials
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ err: "Invalid email or password" });
        }


        // Generate JWT 
        const payload = {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        }
        const token = jwt.sign(payload, process.env.JWT_KEY);
        
        res.json({ message: 'Login successful', token, payload });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "Internal server error" });
    }
});

module.exports = router


