import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Signup
export const signup = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ error: "Username and password are required" });

        // Check if username exists
        const existingUser = await userModel.findOne({ username });
        if (existingUser) return res.status(400).json({ error: "Username already taken" });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = await userModel.create({ username, password: hashedPassword });
        const token = jwt.sign({ id: newUser._id }, process.env.TOKEN_SECRET, { expiresIn: "365d" });

        const isProd = process.env.ENVIRONMENT === "prod";
        res.cookie("token", token, { httpOnly: true, secure: isProd, sameSite: isProd ? "None" : "Lax", maxAge: 365 * 24 * 60 * 60 * 1000 });
        return res.status(201).json({ message: "Signup successful", isAuthorized: token ? true : false });

    } catch (err) {
        return res.status(500).json({ error: "Server error during signup" });
    }
};

// Login 
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ error: "Username and password are required" });

        // Find user
        const user = await userModel.findOne({ username });
        if (!user) return res.status(400).json({ error: "Username not registered." });

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid password." });

        // Generate token
        const token = jwt.sign({ id: user._id, username: user.username }, process.env.TOKEN_SECRET, { expiresIn: "7d" });

        const isProd = process.env.ENVIRONMENT === "prod";
        res.cookie("token", token, { httpOnly: true, secure: isProd, sameSite: isProd ? "None" : "Lax", maxAge: 365 * 24 * 60 * 60 * 1000 });
        return res.status(200).json({ message: "Login successful", isAuthorized: token ? true : false });

    } catch (err) {
        return res.status(500).json({ error: "Server error during login" });
    }
};

// Logout
export const logout = async (req, res) => {
    try {
        const isProd = process.env.ENVIRONMENT === "prod";
        res.clearCookie("token", {httpOnly: true,secure: isProd,sameSite: isProd ? "strict" : "lax",});
        return res.status(200).json({ message: "Logout successful", isAuthorized: false });
        
    } catch (err) {
        return res.status(500).json({ error: "Server error during logout" });
    }
};
