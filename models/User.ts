import mongoose, { models, Schema } from "mongoose";
import { unique } from "next/dist/build/utils";


const UserSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    plan:{
        type:String,
        enum:["free","pro"], 
        default:"free"
    },
    generationsUsed:{
        type:Number,
        default:0
    }
},
 { timestamps: true })

 const User=models.User || mongoose.model("User",UserSchema)
 export default User