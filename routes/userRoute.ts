import express from "express";
import { loginUser, registerUser } from "../controllers/userController";

const userRoute = express.Router();

userRoute.post("/login", loginUser);
userRoute.post("/register", registerUser);

export default userRoute;
    