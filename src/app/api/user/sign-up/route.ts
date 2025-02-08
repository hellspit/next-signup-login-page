import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connect();

export async function POST(req: NextRequest) { // Use uppercase "POST"
    try {
        const reqBody = await req.json();
        const { username, email, password } = reqBody;

        console.log("Received Data:", reqBody); // Debugging

        if (!username || !email || !password) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        const savedUser = await newUser.save();

        console.log("User created:", savedUser); // Debugging

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            user: savedUser,
        }, { status: 201 });

    } catch (error: any) {
        console.error("Error in sign-up:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
