import { connectDB } from "@/lib/db"
import User from "@/models/User"
import bcrypt from "bcryptjs"

export async function POST(request:Request){
    try{
            await connectDB()
            const {email,password}=await request.json()

            if(!email || !password){
                return Response.json(
                    {message:"All fields are required"},
                    {status:400}
                )
            }
            const user= await User.findOne({email})
            if(!user){
                return Response.json(
                    {message:"User not found"},
                    {status:404}
                )
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return Response.json(
        { message: "Invalid password" },
        { status: 401 }
      );
    }
    
    return Response.json(
      { message: "User logged in successfully", user },
      { status: 200 }
    );
    }
    catch(error){
        return Response.json(
            {message:"Internal Server Error"},
            {status:500}
        )
    }
}