import express from 'express';
import { generateChatCompletion,getOldMessages,deleteChat } from '../Controllers/chatController.js';

const router=express.Router();

router.get("/old/:id",getOldMessages);
router.post("/new",generateChatCompletion);
router.put("/delete/:id",deleteChat);

export default router;