import { connectDB } from "@/lib/db"
import User from "@/models/User"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function POST(request: Request) {
    try {
        await connectDB()
        const { email, password } = await request.json()

        if (!email || !password) {
            return Response.json(
                { message: "All fields are required" },
                { status: 400 }
            )
        }
        const user = await User.findOne({ email })
        if (!user) {
            return Response.json(
                { message: "User not found" },
                { status: 404 }
            )
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return Response.json(
                { message: "Invalid password" },
                { status: 401 }
            );
        }

        // JWT token banao
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET as string,
            { expiresIn: "7d" }
        );

        const response = Response.json(
            {
                message: "User logged in successfully", user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    plan: user.plan,
                }
            },
            { status: 200 }
        );

        response.headers.set(
            "Set-Cookie",
            `token=${token}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}`
        );

        return response;
    }
    catch (error) {
        return Response.json(
            { message: "Internal Server Error" },
            { status: 500 }
        )
    }
}