import User from "../models/User.js";
import Role from "../models/Role.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import {createSuccess} from '../utils/success.js'

export const register = async (req, res, next) => {
    // return next(createError(500, "my custome Error"));
  const role = await Role.find({ role: "user" });
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    email: req.body.email,
    password: hashPassword,
    roles: role,
  });
  await newUser.save();
//   return res.status(200).send("User register Successfully!");
return next(createSuccess(200, "User Registered Successfully!"))
};

export const registerAdmin=async(req, res, next) => {
   const role = await Role.find({});
   const salt =await bcrypt.genSalt(10);
   const hashPassword=await bcrypt.hash(req.body.password, salt);
   const newAdmin=new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    email: req.body.email,
    password: hashPassword,
    isAdmin:true, 
    roles: role,
   });

   await newAdmin.save();

   return next(createSuccess(200, "Admin Register Successfully!"))
}

export const login = async(req, res, next) => {
    try {

        const user=await User.findOne({email: req.body.email}).populate("roles","role");

        const {roles} =user

        if(!user){
            res.status(404).send("User not Found!")
        }

        const isPasswordCorrect=await bcrypt.compare(req.body.password, user.password);
        
        if(!isPasswordCorrect){
            return res.status(400).send("Password is incorrect!");
        }

        const token =jwt.sign(
            {id : user._id, isAdmin:user.isAdmin, roles:roles},
            process.env.JWT_SECRET
        );

      return  res.cookie("access_token", token, {httpOnly:true}).status(200).json({
            status:200,
            message:"Login Success",
            data:user
        })
        // res.status(200).send("Login SuccessFully!")
        // return next(createSuccess(200, "login Successfully!"));

    } catch (error) {
        res.status(500).send("Something went Worng!");
    }
}