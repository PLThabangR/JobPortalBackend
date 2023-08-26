import express from 'express'
import userAuth from '../middlewares/authMiddleware.js'
import { updateUserController } from '../controller/userController.js';

//router object
const router =express.Router()

//routes
//Get userr

//update user
router.put('/update-user',userAuth,updateUserController);

export  {router as userRoutes} 