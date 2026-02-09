import mongoose from "mongoose";
import { MONGO_URI, NODE_ENV } from "../config/env.js";


if(!MONGO_URI){
    console.error("MONGO_URI is not defined in environment variables.");
}

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB successfully ");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); 
    }
};

export default connectDB;