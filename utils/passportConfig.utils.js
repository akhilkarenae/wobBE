import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import dotenv from "dotenv"

dotenv.config()
import CustomError from "../errorHandlers/CustomError.errorHandlers.js";
import { findUserById } from "../db/repository/user.repository.js";


const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
}

export const initializingJwtStrategy = (passport)=>{
    passport.use(new JwtStrategy(opts, async (jwt_payload, done)=> {
        try{
            const isUser = await findUserById(jwt_payload.id)
            if(!isUser) return done(null,false,{ message: "User not found" });
            const user = {
                id:isUser._id,
                email:isUser.email,
                name:isUser.fullName,
            }
            return done(null,user);
        }catch(err){
            throw new CustomError(err);  
        } 
    }));
}
