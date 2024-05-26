import mongoose from 'mongoose';

export const dbConnection = async()=>{
    try{
        const client = await mongoose.connect(process.env.MONOGO_URI,{
            serverSelectionTimeoutMS: 60000 // 60 seconds
        })
        console.log('bd connected')
    }catch(err)   {
        console.log(err)
    }
}
