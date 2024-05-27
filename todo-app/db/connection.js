import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config()

export const dbConnection = async()=>{
    try{
        console.log(process.env.MONOGO_URI,"mongo uri")
        const client = await mongoose.connect('mongodb+srv://reddyakhilram:iZO1rTvAzfC9e8HW@cluster0.4tquku2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{
            serverSelectionTimeoutMS: 60000 // 60 seconds
        })
        console.log('bd connected')
    }catch(err)   {
        console.log(err)
    }
}
