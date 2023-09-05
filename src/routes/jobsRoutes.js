import express from 'express'
import userAuth from '../middlewares/authMiddleware.js'
import { createJobsController, getAllJobsController, updateJobController} from '../controller/jobsController.js'


const router = express.Router()

//Routes
//Creates Jobs
router.post('/create-job',userAuth,createJobsController)

//Get all Jobs
router.get('/get-jobs',userAuth,getAllJobsController)

//Get all Jobs
router.patch('/update-job/:id',userAuth,updateJobController)

export  {router as jobsRoutes} 