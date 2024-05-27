import express from "express";
import passport from "passport";

import {
  signup,
  login
} from "../controllers/user.controllers.js";


const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);


export default userRouter