import { UserModel } from "../models/user.model.js";


export const findUserByEmail = async (email) => {
    try{
        const user = await UserModel.findOne({ email })
        return user;
    }catch(err){
        console.log(err)
    }
}

export const findUserById = async (userId) => {
    try{
        const user = await UserModel.findById({ _id: userId });
        return user;
    }catch(err){
        console.log(err)
    }
}

export const saveUser = async (email,hashedPassword) =>{
    try{
        const user = new UserModel({ email: email, password: hashedPassword });
        const newUser = user.save();
        return newUser;
    }catch(err){
        console.log(err)
    }
}