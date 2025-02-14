import { connect } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token } = reqBody;

        console.log("Received Token:", token);

        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpire: { $gt: Date.now() }
        });

        if (!user) {
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
        }

        console.log("User Found:", user);

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpire = undefined;
        await user.save();

        return NextResponse.json({ message: "Email verified successfully" }, { status: 200 });

    } catch (error: unknown) {
        console.error("Error in verifying email:", error);

        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
}
