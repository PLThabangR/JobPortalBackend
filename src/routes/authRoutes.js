import express from 'express'
import {  registerControler } from '../controller/authController.js'

//router Object
const router = express.Router()

//routes
router.post('/register',registerControler)

export  {router as authRoutes} 