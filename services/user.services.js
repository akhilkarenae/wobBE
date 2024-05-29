import { generatePassword } from "../utils/helpers.utils.js";
import { saveUser } from "../db/repository/user.repository.js";
import CustomError from "../errorHandlers/CustomError.errorHandlers.js";

const createUser = async ({email, password}) => {
    try {
        const hashedPassword = await generatePassword(password);
        const newUser = await saveUser(email,hashedPassword)
        return newUser;
    } catch (err) { 
        throw new CustomError(err);
    }
}

export {createUser}