import express from 'express'
import {  loginController, registerControler } from '../controller/authController.js'


//router Object
const router = express.Router()

//routes
//REGISTER POST
router.post('/register',registerControler)
//LOGIN POST
router.post('/login',loginController)
export  {router as authRoutes} 