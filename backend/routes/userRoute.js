import express from 'express';
import { loginUser,registerUser,adminLogin ,getUserProfile, updateUserProfile } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)
userRouter.get('/profile', getUserProfile); 
userRouter.put('/profile', updateUserProfile); 


export default userRouter;