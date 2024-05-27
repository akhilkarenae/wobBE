class CustomError extends Error{
    constructor(message,status,errorCode){
        super(message,status,errorCode)
        this.name="CustomError"
        this.status=status || 500
        this.message=message || "some Internal error occured"
        Error.captureStackTrace(this, this.constructor);
    }
}


export default CustomError