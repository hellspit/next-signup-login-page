import mongoose from "mongoose";

export async function connect() {
    try{
        mongoose.connect(process.env.mongo_url!);
        const connection = mongoose.connection;
        connection.on('connnected',()=>{
            console.log("connected to db");
            process.exit();
        })
    }catch(e){
        console.log(e)
    }
}