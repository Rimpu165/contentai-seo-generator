import { connectDB } from "@/lib/db"
import User from "@/models/User"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
    try {
        await connectDB()
        const { name, email, password } = await request.json();

        if (!name || !email || !password) {
            return Response.json(
                { message: "All feilds are required" },
                { status: 400 }
            )
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return Response.json(
                { message: "User already exists with this email" },
                { status: 400 }
            );
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ name, email, password: hashedPassword, });
        await user.save();
        return Response.json(
            { message: "User created successfully", user },
            { status: 201 }
        );
    } catch (error) {
        return Response.json(
            { message: "Internal Server Error",error },
            { status: 500 }
        )
    }
}