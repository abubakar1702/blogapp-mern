import mongoose from "mongoose";
import 'dotenv/config'

export const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("database is connected")
    } catch (error) {
        console.log(error)
    }
}