import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        maxLength: [50, "Name cannot exceed 50 characters"],
        minLength: [2, "Name must be at least 2 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],   
        minLength: [6, "Password must be at least 6 characters"]
    }

}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;