import express  from "express";
import 'express-async-errors'
import dotenv from 'dotenv'
import color from 'colors'
import mongoose from 'mongoose';
import connectDB from "../config/connect.js";
import { testRoutes } from "./routes/testRoutes.js";
import cors from 'cors';
import morgan from 'morgan'
import { authRoutes } from "./routes/authRoutes.js";
import errorMidddleware from "./middlewares/errorMiddlewares.js";
import { userRoutes } from "./routes/userRoutes.js";
import { jobsRoutes } from "./routes/jobsRoutes.js";
//rest object
const app =express();

//Dot env 
dotenv.config();
//Middleware
app.use(express.json())
app.use(cors());
app.use(morgan( 'dev '))


//routes
app.use('/api',testRoutes)
app.use('/auth',authRoutes)
app.use('/auth/user',userRoutes)
app.use("/job",jobsRoutes)

//port
const PORT = process.env.PORT || 5000;
//validation middleware
app.use(errorMidddleware)

//listen
const startServer= ()=>{

    try{
        connectDB();
     console.log(`Connected to mongDB ${mongoose.connection.host}`.bgMagenta)
        app.listen(PORT,()=> console.log(`Serve running ${process.env.DEV_MODE} started on port http://localhost:${PORT}`.bgCyan))

    }catch(error){
        console.log(error)
    }
   
}

startServer()