import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import userRoutes from './Routes/userRoute.js';
import chatRoutes from './Routes/chatRoute.js';
import imageRoutes from './Routes/imageRoute.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
        .then(()=>{ console.log("Database connected!!"); })
        .catch((err)=>{ console.log(err) }); 

const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3000, ()=>{
    console.log('Server is running on port 3000!!');
});

app.get("/test",(req,res,next)=>{
    return res.send("Hello");
});

app.use("/api/user",userRoutes);
app.use("/api/chat",chatRoutes);
app.use("/api/image",imageRoutes);