import express from 'express'
import userModel from '../model/userModel.js';


export const registerControler = async (req,res,next)=>{

    const {name,email,password } = req.body;

    //Validate
    if(!name){
       next("name is required")
    }
    
    if(!email){
       next("Please provide email")
    }
    
    if(!password){
       next("Password is required more than 6 characters")
    }
    //Check if user exist
     const existingUser = await userModel.findOne({email})
     if(existingUser){
         next("Email Already taken please login")
    }

    //Save the user to the DB
    const user = await userModel.create({name,email,password});
    res.status(201).send({
        success:true,
        message:'User created successfully',
        user
    })


   next(error)



}