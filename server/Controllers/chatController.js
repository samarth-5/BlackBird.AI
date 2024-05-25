import User from "../Models/userModel.js";
import { GoogleGenerativeAI } from '@google/generative-ai';

export const getOldMessages = async(req,res) => {
    try{
      //console.log(req.params);
      const existingUser=await User.findById(req.params.id);
      if(!existingUser)
      {
          return res.status(404).json({message:'User does not exist!'});
      }
      const chats=existingUser.chats;
      res.status(200).json(chats);
    }
    catch(err){
       next(err);
    }
}

export const generateChatCompletion = async(req,res) => {

    const existingUser = await User.findById(req.body.id);
    if(!existingUser)
    {
        return res.status(404)
                  .json('User does not exist!');
    }
    existingUser.chats.push({role: "user", content: req.body.content});

    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    async function run() 
    {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

      const prompt = req.body.content;

      try{        
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        //console.log(text);
        existingUser.chats.push({role: "ai", content: text});
        const updatedUser=await User.findByIdAndUpdate(existingUser._id,{$set:{chats:existingUser.chats}},{new: true});
        return res.status(200).json(updatedUser);
      }
      catch(err){
        console.log(err);
        return res.status(401)
                  .json('Try some custom input');
      }
    }
    run();
}

export const deleteChat=async(req,res)=>{
  try{
      const updatedUser=await User.findByIdAndUpdate(req.params.id,{$set: {chats: []}},{new: true});
      res.status(200).json(updatedUser);
  }
  catch(err){
    console.log(err);
  }
}