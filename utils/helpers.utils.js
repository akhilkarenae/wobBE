import bcrypt from 'bcrypt'
import dotenv from "dotenv"

dotenv.config()

import CustomError from "../errorHandlers/CustomError.errorHandlers.js";


export const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regex.test(email);
}

export const validatePassword = (password) => {
    const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{3,}$/
    return regex.test(password);
}


export const validateUser = async ({ email, password }) => {  
    const errors = [];
    if (!validateEmail(email)) {
        errors.push('Invalid email address');
    }

    if (validatePassword(password) === false) {
        errors.push('Password should be more than 3 characters and contains, special character uppercase letter, lowercase letter');
    }
    return errors;
}


export const validateTitle = ({title}) =>{
    const errors = [];
    if(!title || title.length<3){
        errors.push("title can not be less the three chars")
    }
    return errors
}

export const generatePassword = async (password) => {
    const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_WORK_FACTOR));
    return await bcrypt.hash(password, salt)
}

export const isValidPassword = async (password, hashedPassword) => {
    try {
        if(!validatePassword(password)){
            return "Please enter a valid password"
        }
        const match = await bcrypt.compare(password, hashedPassword);
        return !!(match);
    } catch (err) {
        throw new CustomError(err)
    }
}
