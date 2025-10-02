import mongoose from "mongoose"

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL_LOCAL);
        console.log("DB Connected");

    }catch(error){
        console.log("DB Error");

    }
}

export default connectDB;