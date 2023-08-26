import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
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
        minlength:[6,"Password length should be greater than 6 characters"],
        select:true
    },
    location:{
        type:String,
        default:"South Africa"
    },
   
},
{timestamps:true}
);
 //Middleware to encrypt the password
 userSchema.pre("save", async function(){
    //do not run this logic if is modified
    if(!this.isModified) return
    const salt = await bcrypt.genSalt(10);
     this.password =await bcrypt.hash(this.password,salt)
     console.log("hashed Password",this.password)
  })
  //Compare password
  userSchema.methods.comparePassword = async function(userPassword){
    const isMatch =await bcrypt.compare(userPassword,this.password);
    return isMatch;
  }
  //Json web Token
  userSchema.methods.createJWT = function(){
    return JWT.sign({userId:this._id}, process.env.JWT_SECRET,{expiresIn:'1d'})
  }

const userModel=mongoose.model('User',userSchema);

 
 export default userModel;