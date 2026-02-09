import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";


export const signup = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { name, email, password } = req.body;

        //check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const error = new Error("User already exists with this email");
            error.statusCode = 400;
            throw error;
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create user
        const newUser = await User.create([{ name, email, password: hashedPassword }], { session });

        const token = jwt.sign(
            { userId: newUser[0]._id },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );


        await session.commitTransaction();
        session.endSession();
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                token,
                user: newUser[0]
            }
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}

export const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            const error = new Error("User not found with this email");
            error.statusCode = 404;
            throw error;
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            const error = new Error("Invalid password");
            error.statusCode = 401;
            throw error;
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );


        res.status(200).json({
            success: true,
            message: "User signed in successfully",
            data: {
                token,
                user
            }
        });
    } catch (error) {
        next(error);
    }
}

export const signout = async (req, res, next) => { }