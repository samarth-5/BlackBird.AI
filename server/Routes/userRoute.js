import express from 'express';
import { getAllUsers, signup, signin, signout } from '../Controllers/userController.js';
//import { loginValidator, signupValidator, validate } from '../Utils/validators.js';

const router=express.Router();

router.get("/",getAllUsers);
router.post("/signup",signup);
router.post("/signin",signin);
router.post("/signout",signout);

export default router;  