import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config()

import { findUserByEmail } from "../db/repository/user.repository.js";
import { ValidationError } from "../errorHandlers/ValidationError.errorHandlers.js";
import { createUser } from "../services/user.services.js";
import { isValidPassword, validateUser } from "../utils/helpers.utils.js";


const signup = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const validateErrors = await validateUser({ email, password });
      if (validateErrors.length > 0) {
        throw new ValidationError(validateErrors);
      }
      const user = await findUserByEmail(email);
      if (user) {
        throw new ValidationError("User already exists");
      }
      const newUser = await createUser({ email, password });
      return res.status(201).send({ success: true, message: "User created succesfully" });
    } catch (err) {
      console.log(err,"error")
      next(err);
    } 
};
  

const login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await findUserByEmail(email);
      if (!user) {
        return res
          .status(400)
          .send({ success: false, message: "user not found" });
      }
  
      const isMatch = await isValidPassword(password, user.password);
      if (!isMatch) {
        throw new ValidationError(
          "Please provide a valid email address and password."
        );
      }
      const payload = {
        id: user._id,
        email: user.email,
        name: user.fullName
      };
      const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: `${process.env.EXPIRES_IN}` || '1d',
      });
      return res
        .status(200)
        .send({
          success: true,
          token: "Bearer " + token,
          payload:payload,
          message: "Successfully logged in",
        });
    } catch (err) {
      next(err);
    }
};

export {signup,login}