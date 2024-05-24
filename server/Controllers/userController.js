import User from "../Models/userModel.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../Utils/error.js";
import jwt from 'jsonwebtoken';

export const getAllUsers = async(req,res,next) =>{}

export const signup = async(req,res,next) =>{
    //console.log(req.body);
    const {name,email,username,password}=req.body;
    if(!name || !username || !email || !password || name==='' || username==='' || password==='' || email==='')
    {
        next(errorHandler(499,'All fields are required!'));
    }
    const hashedPassword=bcryptjs.hashSync(password,10);
    const newUser=new User({
        name,
        email,
        username,        
        password:hashedPassword
    });
    try{
        await newUser.save();
        res.status(200)
           .json('Signup successfull!');
    }
    catch(err){
        res.status(402)
           .json('User already exists!');
    }
}

export const signin = async(req,res,next) =>{
    const {email,username,password}=req.body;
    if(!username || !email || !password || username==='' || password==='' || email==='')
    {
        next(errorHandler(499,'All fields are required!'));
    }
    try{
        const validUser=await User.findOne({email});
        if(!validUser)
        return res.status(404)
                  .json('User not found!');
        const validPassword=bcryptjs.compareSync(password,validUser.password);
        if(!validPassword)
        return res.status(401)
                  .json('Wrong credentials!');        
        //const token=jwt.sign({id: validUser._id, isAdmin: validUser.isAdmin}, process.env.JWT_SECRET);
        const {password:pass, ...rest}=validUser._doc;
        res.status(200)
        //    .cookie('access_token',token,{
        //     httpOnly:true,
        //    })
           .json('Signin successfull!');
    }
    catch(err){
        res.status(401)
           .json('Signin Unsuccessfull!');
    }
}

export const signout = async(req,res,next) =>{}