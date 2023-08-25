import mongoose from 'mongoose';

const connectDB =() =>{

    mongoose.set('strictQuery',true);

    mongoose.connect(process.env.MONGO_URL).then(()=> console.log('MongoDb connected'),
  
    ).catch((err) => console.log(err));
}

export default connectDB;