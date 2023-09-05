import jobModel from "../model/jobsModel.js";
import mongoose from 'mongoose';
import moment from 'moment'


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
    //Query parameter
    const {status,workType,search,sort} = req.query;
    //Conditions for searching and filters
    const queryObject={
        createdBy:req.user.userId
    };

    //logic filters
    if(workType && workType !=="all"){
        //find by work type
        queryObject.workType = workType;
    }

    //Get by work type
    if(status && status !=="all"){
        //Find by status
        queryObject.status = status;
    }

    if(search){
        //Search by value
        queryObject.position={$regex:search,$options:'i'}
    }

    let queryResult = jobModel.find(queryObject);
    //sorting
    if(sort=== "latest"){
        queryResult = queryResult.sort("-createdAt")
    }

    if(sort=== "oldest"){
        queryResult = queryResult.sort("createdAt")
    }

    if(sort=== "a-z"){
        queryResult = queryResult.sort("position")
    }

    if(sort=== "z-a"){
        queryResult = queryResult.sort("-position")
    }
   
    //Pignation
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = Number(page-1) *limit;

    queryResult = queryResult.skip(skip).limit(limit)
    //Job count
    const totalJobs = await jobModel.countDocuments(queryResult)
    const numOfPage = Math.ceil(totalJobs/limit)
    const jobs = await queryResult

   //const jobs = await jobModel.find({createdBy:req.user.userId});
   //Rteurn all jobs to user
   res.status(200).json({
        totalJobs,
        jobs,
        numOfPage
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

//Filter and status Job
export const filterAndSatsJobController=async(req,res,next)=>{  
    const stats = await jobModel.aggregate([
        //search by user jobs
        {
            $match:{
              createdBy: new mongoose.Types.ObjectId(req.user.userId)  
            }
        },
     {
        $group:{
            _id:"status",
            count:{$sum:1}
        },
     }
    ])

    //default stats
    const defaultStats = {
        pending: stats.pending || 0,
        reject : stats.reject || 0,
        interview: stats.interview || 0
    }

    //Monthly year stats
    let monthlyApplications = await jobModel.aggregate([
         {
            $match:{
                createdBy: new mongoose.Types.ObjectId(req.user.userId)
            },
         },
         {
            $group:{
                _id:{
                    year:{$year:'$createdAt'},
                    month:{$month:'$createdAt'}
                },
            count:{
                $sum:1,
            }
            },
         }
    ])

    //Converting date using moment

    monthlyApplications = monthlyApplications.map(item =>{
        const {_id:{year,month},count}=item
        const date = moment().month(month-1).year(year).format('MMM Y')
        return  {date,count}

    }).reverse()

    res.status(200).json({
        totalJobs:stats.length,
        defaultStats,
        monthlyApplications    
    
    })
}
