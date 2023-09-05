import express from 'express'
import userModel from '../model/userModel.js';

//==============Register a new User
export const registerControler = async (req,res,next)=>{

   try{
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
    //Token
    const token = user.createJWT()
    res.status(201).send({
        success:true,
        message:'User created successfully',
        user:{
         name:user.name,
         lastName:user.lastName,
         email:user.email,
         location:user.location
        },
        token
    })

   }catch(error){
      next(error)
   }
   }//End of register controller function

   export const loginController = async(req,res,next) => {
      const {email,password}= req.body;
      //validation
      if(!email || !password){
         //error message
         next('Please provide all fields')
      }

      //find user by email
      const user = await userModel.findOne({email}).select("+password")
      //chck if user exists
      if(!user){
         next('Invalid Username or password')
      }

      //Compare password
      const isMatch = await user.comparePassword(password)
      //Check if password exists
      if(!isMatch){
         next('Invalid Username or password')
      }
      //Do not show the password back to the user set to undefined
      user.password =undefined;
      const token = user.createJWT();
      res.status(200).json({
         success:true,
         message:'Login successfully',
         user,
         token
      })
 }//End of Login controller