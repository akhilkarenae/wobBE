import CustomError from "./CustomError.errorHandlers.js";

export class ValidationError extends CustomError{
    constructor(message,status){
        super(message,status);
        this.name="ValidationError"
        this.message=message
        this.status=status || 412
    }
}