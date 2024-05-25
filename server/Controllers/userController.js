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
           .json('Account created successfully!');
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
        const token=jwt.sign({id: validUser._id}, process.env.JWT_SECRET);
        const {password:pass, ...rest}=validUser._doc;
        res.status(200)
           .cookie('access_token',token,{
            httpOnly:true,
           })
           .json(rest);
    }
    catch(err){
        res.status(401)
           .json('Signin Unsuccessfull!');
    }
}

export const signout=async(req,res,next)=>{
    try{
      res.clearCookie('access_token')
         .status(200)
         .json('User has been Signed Out!');
    }
    catch(err){
        res.status(401)
           .json('Unable to Signout!');
    }
}

export const google=async(req,res,next)=>{
    const {name,email}=req.body;
    try{
        const user=await User.findOne({email});
        if(user)
        {
            //console.log(user);
            const token=jwt.sign({id: user._id}, process.env.JWT_SECRET);
            const {password, ...rest}=user._doc;
            res.status(200)
               .cookie('access_token',token,{
                httpOnly:true,
               })
               .json(rest);
        }
        else
        {
            const generatedPassword=Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword=bcryptjs.hashSync(generatedPassword,10)+Math.random().toString(9).slice(-4);
            const newUser=new User({
                name,
                email,
                username:name.toLowerCase().split(' ').join(''),
                password:hashedPassword
            });
            await newUser.save();
            const token=jwt.sign({id: newUser._id}, process.env.JWT_SECRET);
            const {password, ...rest}=newUser._doc;
            res.status(201)
               .cookie('access_token',token,{
                httpOnly:true,
               })
               .json(rest);
        }
    }
    catch(err){
        res.status(401)
           .json('Unauthorised!');
    }
}