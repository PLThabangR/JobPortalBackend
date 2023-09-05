import jobModel from "../model/jobsModel.js";



//========Create Jobs=============
export const createJobsController = async(req,res,next) => {

    const {company,position}= req.body

    if(!company ||!position){
        next("Please provide all fields")
    }
    //
    req.body.createdBy =req.user.userId;
    //
    const job = await jobModel.create(req.body);
    res.status(201).json({job}) 
}

//============Get all Jobs==============
export const getAllJobsController = async(req,res,next) => {


   const jobs = await jobModel.find({createdBy:req.user.userId});
   //Rteurn all jobs to user
   res.status(200).json({
        totalJobs: jobs.length,
        jobs
    })
   
}

//==============Update Jobs
export const updateJobController=async(req,res,next)=>{
    const {id} = req.params
    const {company,position} = req.body

    //cHECK IF data in req.body exists
    if(!company ||!position){
        next("Please provide all fields")
    }
    //find job
    const job= await jobModel.findOne({_id:id})

    //validation
    if(!job){
        next(`no jobs found with this ID ${id}`)
    }

    if(req.user.userId===job.createdBy){
   returen; 
   next('You are Not Authorized to update Job')
    }


    const updateJob  = await jobModel.findOneAndUpdate({_id:id},req.body,{
        new:true,
        runValidators:true
    });

    //Respond
    res.status(200).json({updateJob})

}
//Delete Job
export const deleteJobController=async(req,res,next)=>{
    //Get value from controller
    const {id} = req.params;

    //find Job
    const job = await jobModel.findOne({_id:id})

    //validation 
    if(!job){
        next(`No job found with this ID ${id}`);     
    }

    //Check if user valid
    if(!req.user.userdId === job.createdBy.toString()){
        next('You are not authorized to delete this job')
    }

    await job.deleteOne()
    res.status(200).json({
        message:"Success ,job deleted"
    })

}
