import {Router} from "express";
import { getUserById, getUsers } from "../controller/user.controller.js";
import authorize from "../middleware/auth.middleware.js";

const userRouter=Router();

userRouter.get("/",getUsers);  

userRouter.get("/:id",authorize, getUserById);

userRouter.post("/",(req,res)=>{
    res.send({title:"create new user"});
});

userRouter.put("/:id",(req,res)=>{
    res.send({title:"update user by id"});
});

userRouter.delete("/:id",(req,res)=>{
    res.send({title:"delete user by id"});
});

export default userRouter;