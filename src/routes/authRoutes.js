import express from 'express'
import {  loginController, registerControler } from '../controller/authController.js'
import userAuth from '../middlewares/authMiddleware.js'

//router Object
const router = express.Router()

//routes
//REGISTER POST
router.post('/register',registerControler)
//LOGIN POST
router.post('/login',loginController)
export  {router as authRoutes} 