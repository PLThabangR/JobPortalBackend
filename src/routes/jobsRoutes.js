import express from 'express'
import userAuth from '../middlewares/authMiddleware.js'
import { createJobsController, deleteJobController, getAllJobsController, updateJobController} from '../controller/jobsController.js'


const router = express.Router()

//Routes
//Creates Jobs
router.post('/create-job',userAuth,createJobsController)

//Get all Jobs
router.get('/get-jobs',userAuth,getAllJobsController)

//Update all Jobs
router.patch('/update-job/:id',userAuth,updateJobController)

//Delte jobs
router.delete('/delete-job/:id',userAuth,deleteJobController)

export  {router as jobsRoutes} 