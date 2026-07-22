import mongoose from "mongoose"
let isConnected = false; 

export async function connectDB(){
    if(isConnected){
        console.log("already connected to db");
        return ;
    }
    mongoose.connect(process.env.MONGODB_URL as string)

    .then(()=>{
        isConnected= true;
        console.log("Database Connected");
    })
    .catch((error)=>{
        console.log('Database Error: ', error);
        
    })
}