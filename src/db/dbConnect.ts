import mongoose from "mongoose";

let isConnected = false;
export const dbConnect = async()=>{
    mongoose.set("strictQuery",true)
    if (isConnected){
        return;
    }
    const MONGO_URI=process.env.MONGO_URI;
    if(!MONGO_URI) throw new Error("MONGO_URI is not defined");
    try {
        await mongoose.connect(MONGO_URI,{bufferCommands:false})
        isConnected = true;
        console.log("Connected to database")
    }catch(error){
        console.error("Error connecting to database",error)
    }
}