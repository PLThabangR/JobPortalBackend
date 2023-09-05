import userModel from '../model/userModel.js';

//Update user details
export const updateUserController = async(req,res,next) => {

const { name,email,lastName,location}= req.body

if( !name || !email || !lastName || !location){
    next('Please provide all fields')
}
//Communicate to DB to find by _id
const user = await userModel.findOne({_id: req.user.userId});
//Set new values to db
user.name=name;
user.lastName=lastName
user.email =email
user.location= location

// save new infomation to DB
await user.save();

//Create a new token
const token = user.createJWT();
//respond to user
res.status(200).json({
    user,
    token,
})
}