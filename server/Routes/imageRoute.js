import express from 'express';
import { imageGeneration } from '../Controllers/imageController.js';

const router=express.Router();

router.post('/new',imageGeneration);

export default router;