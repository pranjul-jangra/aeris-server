import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./src/routes/authRoutes.js";
import historyRouter from "./src/routes/historyRoutes.js";

dotenv.config();
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));
app.options(/(.*)/, cors());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/history', historyRouter);



// Connect DB & Start Server
mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB connected")).catch(err => console.error(err));
app.listen(process.env.PORT || 5100, () => console.log("app is running..."));
