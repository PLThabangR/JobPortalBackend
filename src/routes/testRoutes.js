import express from 'express'
import { testController } from '../controller/testController.js'

const router = express.Router()

//routes
router.post('/testpost',testController)

export  {router as testRoutes} 