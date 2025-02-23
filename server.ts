import app from "./app";
import dotenv from "dotenv";
import connectDB from "./config/db";
import mongoose from "mongoose";

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config();

const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

mongoose.connection.once("open", () => app.listen(port, () => console.log(`Server running on port http://localhost:${port}`)));
