import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Auth from "../models/AuthSchema.js";

const router = express.Router();

//For - Signup
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await Auth.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email has already been used" });
    }
    //hashed password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Auth({ username, email, password: hashedPassword });
    await newUser.save();

    console.log("My JWT Secret is:", process.env.JWT_SECRET);

    //genrate token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({ message: "User created successfully", token });
  } catch (error) {
    console.error("🔥 SIGNUP CRASH ERROR:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
router.post("/signup", registerUser);

//For - Login

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // 1. Find the user by email
    const user = await Auth.findOne({ email });

    // 2. If user doesn't exist, stop here
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 3. Compare the plain text password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    // 4. If the password is wrong, stop here
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 5. ONLY IF THE PASSWORD IS CORRECT, generate the token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    // 6. Send the token to the frontend
    res.json({
      message: "Login successful",
      token: token,
      user: { id: user._id, username: user.username },
    });
  } catch (error) {
    console.error("🔥 LOGIN CRASH ERROR:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
router.post("/login", loginUser);

export default router;
