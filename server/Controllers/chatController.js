import User from "../Models/userModel.js";
import { GoogleGenAI } from "@google/genai";

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
       return (err.message);
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

    //const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const ai = new GoogleGenAI({});

    async function run() 
    {
      const prompt = req.body.content;
      try{        
          const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt,
        });
        const text = response.text;
        existingUser.chats.push({role: "ai", content: text});
        const updatedUser=await User.findByIdAndUpdate(existingUser._id,{$set:{chats:existingUser.chats}},{new: true});
        return res.status(200).json(updatedUser.chats[updatedUser.chats.length-1].content);
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