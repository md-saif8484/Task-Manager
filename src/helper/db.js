import { User } from "@/app/models/user";
import mongoose from "mongoose"

const config ={
    isConnected : 0,
}

export const connectDb = async() => {

    if(config.isConnected){
        return;
    }
    
    try {
        const {connection} = await mongoose.connect(process.env.MONGO_DB_URL,{
            dbName:"work_manager",

        });
        config.isConnected = connection.readyState;
        console.log("db connected");
        // console.log(connection);
        // console.log(connection.host);

        // const uuser = new User({
        //     name:"tst name",
        //     email:"test@gmail.com",
        //     password:"jhb",
        //     about:"khdvyuv"
        // });

        // await uuser.save();
    } catch (error) {
        console.log("failed to connect with database");
        console.log(error);
    }
}