import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt'
// User Schema
const userSchema =new mongoose.Schema({
    name:{type:String,
    required:[true,"name is required"]
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        require:[true,"Email is required"],
        unique:true,
        validate:validator.isEmail
    },
    password:{
        type:String,
        required:[true,"password is required"],
        minlength:[6,"Password length should be greater than 6 characters"]
    },
    location:{
        type:String,
        default:"South Africa"
    },
   
},
{timestamps:true}

)
 const userModel=mongoose.model('User',userSchema);

 //Middleware to encrypt the password
 userSchema.pre("save", async function(){

   const salt = await bcrypt.genSalt(10);
    this.password =await bcrypt.hash(this.password,salt)
 })
 export default userModel;